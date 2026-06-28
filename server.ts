import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/amor-chat';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Mongoose connection ---
mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// --- Schemas ---
const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sender: { type: String, required: true, enum: ['Facu', 'Rocío'] },
  type: { type: String, required: true, enum: ['text', 'sticker', 'drawing', 'image', 'video', 'audio'] },
  content: { type: String, required: true },
  timestamp: { type: Number, required: true },
  fileName: String,
  duration: Number,
  seen: { type: Boolean, default: false },
  isChunked: { type: Boolean, default: false },
  totalChunks: Number,
  replyTo: { type: mongoose.Schema.Types.Mixed },
  reactions: [{
    emoji: String,
    user: { type: String, enum: ['Facu', 'Rocío'] },
  }],
}, { timestamps: false });

const Message = mongoose.model('Message', messageSchema);

const chunkSchema = new mongoose.Schema({
  messageId: { type: String, required: true, index: true },
  index: { type: Number, required: true },
  data: { type: String, required: true },
});
const Chunk = mongoose.model('Chunk', chunkSchema);

const presenceSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  online: { type: Boolean, default: false },
  lastActive: { type: Number, default: 0 },
});
const Presence = mongoose.model('Presence', presenceSchema);

// --- SSE Client Registry ---
let sseClients: express.Response[] = [];

function broadcast(data: any) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => {
    try { client.write(payload); } catch (e) { /* client disconnected */ }
  });
}

// --- SSE Endpoint ---
app.get('/api/messages/live', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.write('data: {"type":"connected"}\n\n');
  sseClients.push(res);

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients = sseClients.filter(client => client !== res);
  });
});

// --- API Endpoints ---

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).lean();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Post a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { id, sender, type, content, timestamp, fileName, duration, replyTo } = req.body;

    if (!sender || !type || !content) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const messageId = id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const CHUNK_SIZE = 800000;

    if (content.length <= CHUNK_SIZE) {
      const msg = await Message.create({
        id: messageId,
        sender,
        type,
        content,
        timestamp: timestamp || Date.now(),
        fileName,
        duration,
        replyTo,
        isChunked: false,
      });
      broadcast({ type: 'message_new', message: msg.toObject() });
      res.status(201).json(msg);
    } else {
      const numChunks = Math.ceil(content.length / CHUNK_SIZE);
      const msg = await Message.create({
        id: messageId,
        sender,
        type,
        content: '__chunked__',
        timestamp: timestamp || Date.now(),
        fileName,
        duration,
        replyTo,
        isChunked: true,
        totalChunks: numChunks,
      });
      const chunkDocs = [];
      for (let i = 0; i < numChunks; i++) {
        chunkDocs.push({
          messageId,
          index: i,
          data: content.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
        });
      }
      await Chunk.insertMany(chunkDocs);
      broadcast({ type: 'message_new', message: { ...msg.toObject(), content: '__chunked__', totalChunks: numChunks } });
      res.status(201).json(msg);
    }
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Error al guardar mensaje' });
  }
});

// Mark message as seen
app.put('/api/messages/:id/seen', async (req, res) => {
  try {
    const msg = await Message.findOneAndUpdate(
      { id: req.params.id },
      { seen: true },
      { new: true }
    );
    if (msg) {
      broadcast({ type: 'message_seen', messageId: msg.id });
      res.json(msg);
    } else {
      res.status(404).json({ error: 'Mensaje no encontrado' });
    }
  } catch (err) {
    console.error('Error marking message as seen:', err);
    res.status(500).json({ error: 'Error al marcar como visto' });
  }
});

// Delete a single message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    await Message.deleteOne({ id: req.params.id });
    await Chunk.deleteMany({ messageId: req.params.id });
    broadcast({ type: 'message_delete', messageId: req.params.id });
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Error al borrar mensaje' });
  }
});

// Clear all messages
app.post('/api/messages/clear', async (req, res) => {
  try {
    await Message.deleteMany({});
    await Chunk.deleteMany({});
    broadcast({ type: 'clear_event' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error clearing messages:', err);
    res.status(500).json({ error: 'Error al borrar historial' });
  }
});

// Get chunks for a chunked message
app.get('/api/messages/:id/chunks', async (req, res) => {
  try {
    const chunks = await Chunk.find({ messageId: req.params.id }).sort({ index: 1 }).lean();
    res.json(chunks.map(c => ({ index: c.index, data: c.data })));
  } catch (err) {
    console.error('Error fetching chunks:', err);
    res.status(500).json({ error: 'Error al obtener chunks' });
  }
});

// Presence endpoints
app.get('/api/presence/:user', async (req, res) => {
  try {
    const p = await Presence.findOne({ user: req.params.user }).lean();
    res.json(p || { user: req.params.user, online: false, lastActive: 0 });
  } catch (err) {
    console.error('Error fetching presence:', err);
    res.status(500).json({ error: 'Error al obtener presencia' });
  }
});

app.put('/api/presence/:user', async (req, res) => {
  try {
    const { online } = req.body;
    await Presence.findOneAndUpdate(
      { user: req.params.user },
      { user: req.params.user, online, lastActive: Date.now() },
      { upsert: true }
    );
    broadcast({ type: 'presence', user: req.params.user, online });
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating presence:', err);
    res.status(500).json({ error: 'Error al actualizar presencia' });
  }
});

// --- Typing Indicator ---
app.post('/api/typing', (req, res) => {
  const { user, typing } = req.body;
  broadcast({ type: 'typing', user, typing });
  res.json({ success: true });
});

// --- Reactions ---
app.post('/api/messages/:id/react', async (req, res) => {
  try {
    const { emoji, user } = req.body;
    const msg = await Message.findOneAndUpdate(
      { id: req.params.id },
      { $push: { reactions: { emoji, user } } },
      { new: true }
    ).lean();
    if (msg) {
      broadcast({ type: 'message_update', message: msg });
      res.json(msg);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error adding reaction' });
  }
});

app.delete('/api/messages/:id/react', async (req, res) => {
  try {
    const { emoji, user } = req.body;
    const msg = await Message.findOneAndUpdate(
      { id: req.params.id },
      { $pull: { reactions: { emoji, user } } },
      { new: true }
    ).lean();
    if (msg) {
      broadcast({ type: 'message_update', message: msg });
      res.json(msg);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error removing reaction' });
  }
});

// --- Vite Middleware and Static File Serving ---
async function setupVite() {
  const isDev = !process.env.MONGODB_URI && !process.env.MONGO_URL;

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev middleware loaded in DEV mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/sw.js', (req, res) => res.sendFile(path.join(distPath, 'sw.js')));
    app.get('/manifest.json', (req, res) => res.sendFile(path.join(distPath, 'manifest.json')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static files middleware loaded in PROD mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
