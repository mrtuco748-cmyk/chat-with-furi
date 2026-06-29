const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/chat';
const PORT = process.env.PORT || 3000;

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  type: { type: String, default: 'text' },
  content: { type: String, default: '' },
  timestamp: { type: Number, default: () => Date.now() },
  fileName: String, fileSize: Number, mimeType: String, duration: Number,
  fileData: Buffer,
  replyTo: mongoose.Schema.Types.Mixed,
  deleted: { type: Boolean, default: false },
  deletedFor: [String],
  starred: { type: Boolean, default: false },
  edited: { type: Boolean, default: false }
}, { collection: 'messages' });
messageSchema.index({ timestamp: -1 });

const reactionSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  emoji: { type: String, required: true },
  user: { type: String, required: true }
}, { collection: 'reactions' });
reactionSchema.index({ messageId: 1, user: 1, emoji: 1 }, { unique: true });

const readReceiptSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  user: { type: String, required: true },
  readAt: { type: Number, default: () => Date.now() }
}, { collection: 'read_receipts' });
readReceiptSchema.index({ messageId: 1, user: 1 }, { unique: true });

const Message = mongoose.model('Message', messageSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);
const ReadReceipt = mongoose.model('ReadReceipt', readReceiptSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }, maxHttpBufferSize: 50e6 });

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

async function enrichMessages(messages) {
  const ids = messages.map(m => m._id);
  const reactions = await Reaction.find({ messageId: { $in: ids } }).lean();
  const reads = await ReadReceipt.find({ messageId: { $in: ids } }).lean();
  return messages.map(msg => {
    const obj = msg.toObject ? msg.toObject() : msg;
    const r = reactions.filter(r => r.messageId.toString() === obj._id.toString());
    const rd = reads.filter(r => r.messageId.toString() === obj._id.toString());
    return {
      id: obj._id.toString(),
      sender: obj.sender, type: obj.type, content: obj.content,
      timestamp: obj.timestamp,
      fileName: obj.fileName, fileSize: obj.fileSize, mimeType: obj.mimeType, duration: obj.duration,
      replyTo: obj.replyTo || null,
      deleted: !!obj.deleted, starred: !!obj.starred, edited: !!obj.edited,
      reactions: r.map(x => ({ emoji: x.emoji, user: x.user })),
      readBy: rd.map(x => ({ user: x.user, at: x.readAt }))
    };
  });
}

app.get('/api/messages', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const user = req.query.user || '';
    let filter = { deleted: { $ne: true } };
    if (user) filter.deletedFor = { $not: { $in: [user] } };
    const messages = await Message.find(filter).sort({ timestamp: -1 }).skip(offset).limit(limit).lean();
    messages.reverse();
    const enriched = await enrichMessages(messages.map(m => ({ ...m, toObject: () => m })));
    res.json(enriched);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const msg = await Message.create({
    sender: '_upload_', type: 'file',
    content: '', timestamp: Date.now(),
    fileName: req.file.originalname, fileSize: req.file.size,
    mimeType: req.file.mimetype, fileData: req.file.buffer
  });
  res.json({
    url: '/api/file/' + msg._id,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    mimeType: req.file.mimetype
  });
});

app.get('/api/file/:id', async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg || !msg.fileData) return res.status(404).end();
    res.set('Content-Type', msg.mimeType || 'application/octet-stream');
    res.set('Content-Disposition', 'inline; filename="' + (msg.fileName || 'file') + '"');
    res.send(msg.fileData);
  } catch (e) { res.status(404).end(); }
});

app.get('/api/unread/:user', async (req, res) => {
  try {
    const other = req.params.user === 'Facu' ? 'Rocío' : 'Facu';
    const count = await Message.countDocuments({
      sender: other, deleted: { $ne: true },
      deletedFor: { $not: { $in: [req.params.user] } },
      _id: { $not: { $in: (await ReadReceipt.distinct('messageId', { user: req.params.user })) } }
    });
    res.json({ unread: count });
  } catch (err) { res.status(500).json({ error: 'Error' }); }
});

app.post('/api/clear', async (req, res) => {
  try {
    await Message.deleteMany({});
    await Reaction.deleteMany({});
    await ReadReceipt.deleteMany({});
    io.emit('clear');
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Error' }); }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('register', async (username) => {
    currentUser = username;
    onlineUsers.set(socket.id, { username, lastSeen: Date.now() });
    io.emit('presence', { user: username, online: true });
    const other = username === 'Facu' ? 'Rocío' : 'Facu';
    try {
      const count = await Message.countDocuments({
        sender: other, deleted: { $ne: true },
        deletedFor: { $not: { $in: [username] } },
        _id: { $not: { $in: (await ReadReceipt.distinct('messageId', { user: username })) } }
      });
      socket.emit('unread_count', { count });
    } catch (e) {}
  });

  socket.on('send_message', async (data) => {
    try {
      const msgId = data.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const msg = await Message.create({
        _id: msgId, sender: data.sender, type: data.type || 'text',
        content: data.content, timestamp: data.timestamp || Date.now(),
        fileName: data.fileName, fileSize: data.fileSize,
        mimeType: data.mimeType, duration: data.duration,
        replyTo: data.replyTo || null
      });
      const enriched = await enrichMessages([msg]);
      socket.emit('message_sent', enriched[0]);
      socket.broadcast.emit('new_message', enriched[0]);
      const otherOnline = Array.from(onlineUsers.values()).some(u => u.username !== currentUser);
      if (otherOnline) socket.emit('message_delivered', { id: enriched[0].id });
    } catch (err) {
      console.error('Error saving message:', err);
      socket.emit('msg_error', { id: data.id || '', error: 'Error al guardar el mensaje' });
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { user: data.user, typing: data.typing });
  });

  socket.on('mark_read', async (data) => {
    try {
      await ReadReceipt.updateOne(
        { messageId: data.messageId, user: data.user },
        { $setOnInsert: { messageId: data.messageId, user: data.user, readAt: Date.now() } },
        { upsert: true }
      );
      socket.broadcast.emit('message_read', { id: data.messageId, user: data.user });
    } catch (err) { console.error('Error marking read:', err); }
  });

  socket.on('mark_read_bulk', async (data) => {
    try {
      const ops = data.messageIds.map(id => ({
        updateOne: {
          filter: { messageId: id, user: data.user },
          update: { $setOnInsert: { messageId: id, user: data.user, readAt: Date.now() } },
          upsert: true
        }
      }));
      await ReadReceipt.bulkWrite(ops);
      socket.broadcast.emit('messages_read', { ids: data.messageIds, user: data.user });
    } catch (err) { console.error('Error bulk mark read:', err); }
  });

  socket.on('add_reaction', async (data) => {
    try {
      const msg = await Message.findOne({ _id: data.messageId });
      if (!msg) return;
      await Reaction.deleteOne({ messageId: data.messageId, user: data.user });
      await Reaction.create({ messageId: data.messageId, emoji: data.emoji, user: data.user });
      const reactions = await Reaction.find({ messageId: data.messageId }).lean();
      io.emit('reaction_updated', { messageId: data.messageId, reactions: reactions.map(r => ({ emoji: r.emoji, user: r.user })) });
    } catch (err) { console.error('Error adding reaction:', err); }
  });

  socket.on('remove_reaction', async (data) => {
    try {
      await Reaction.deleteOne({ messageId: data.messageId, emoji: data.emoji, user: data.user });
      const reactions = await Reaction.find({ messageId: data.messageId }).lean();
      io.emit('reaction_updated', { messageId: data.messageId, reactions: reactions.map(r => ({ emoji: r.emoji, user: r.user })) });
    } catch (err) { console.error('Error removing reaction:', err); }
  });

  socket.on('delete_message', async (data) => {
    try {
      const msg = await Message.findById(data.messageId);
      if (!msg) return;
      if (data.forEveryone) {
        msg.deleted = true;
        msg.content = 'Mensaje eliminado';
        msg.edited = true;
        await msg.save();
        io.emit('message_deleted', { id: data.messageId, forEveryone: true });
      } else {
        if (!msg.deletedFor.includes(data.user)) msg.deletedFor.push(data.user);
        await msg.save();
        socket.emit('message_deleted', { id: data.messageId, forEveryone: false });
      }
    } catch (err) { console.error('Error deleting message:', err); }
  });

  socket.on('star_message', async (data) => {
    try {
      const msg = await Message.findById(data.messageId);
      if (!msg) return;
      msg.starred = !msg.starred;
      await msg.save();
      io.emit('message_starred', { id: data.messageId, starred: msg.starred });
    } catch (err) { console.error('Error starring message:', err); }
  });

  socket.on('forward_message', async (data) => {
    try {
      const fwdPrefix = '📩 Reenviado\n';
      const content = data.type === 'text' ? fwdPrefix + data.content : data.content;
      const msgId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const msg = await Message.create({
        _id: msgId, sender: data.sender, type: data.type, content,
        timestamp: Date.now(),
        fileName: data.fileName, fileSize: data.fileSize,
        mimeType: data.mimeType, duration: data.duration
      });
      const enriched = await enrichMessages([msg]);
      socket.emit('message_sent', enriched[0]);
      socket.broadcast.emit('new_message', enriched[0]);
    } catch (err) { console.error('Error forwarding message:', err); }
  });

  socket.on('message_info', async (data) => {
    try {
      const msg = await Message.findById(data.messageId);
      if (!msg) return;
      const reads = await ReadReceipt.find({ messageId: data.messageId }).lean();
      socket.emit('message_info', {
        id: data.messageId,
        timestamp: msg.timestamp,
        readBy: reads.map(r => ({ user: r.user, at: r.readAt }))
      });
    } catch (err) { console.error('Error getting message info:', err); }
  });

  socket.on('edit_message', async (data) => {
    try {
      await Message.updateOne({ _id: data.messageId }, { content: data.content, edited: true });
      io.emit('message_edited', { id: data.messageId, content: data.content });
    } catch (err) { console.error('Error editing message:', err); }
  });

  socket.on('disconnect', () => {
    if (currentUser) {
      onlineUsers.delete(socket.id);
      const stillOnline = Array.from(onlineUsers.values()).some(u => u.username === currentUser);
      if (!stillOnline) io.emit('presence', { user: currentUser, online: false, lastSeen: Date.now() });
    }
  });
});

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000, connectTimeoutMS: 10000 }).then(() => {
  console.log('MongoDB connected');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
