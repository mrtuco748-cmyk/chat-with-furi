const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Database = require('better-sqlite3');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// --- SQLite Setup ---
const db = new Database(path.join(__dirname, 'data.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    sender TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    fileName TEXT,
    fileSize INTEGER,
    mimeType TEXT,
    duration REAL,
    replyTo TEXT,
    deleted INTEGER DEFAULT 0,
    createdAt INTEGER DEFAULT (strftime('%s','now') * 1000)
  );
  CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId TEXT NOT NULL,
    emoji TEXT NOT NULL,
    user TEXT NOT NULL,
    UNIQUE(messageId, emoji, user)
  );
  CREATE TABLE IF NOT EXISTS read_receipts (
    messageId TEXT NOT NULL,
    user TEXT NOT NULL,
    readAt INTEGER NOT NULL,
    PRIMARY KEY (messageId, user)
  );
  CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);
`);

// --- Multer for file uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public', 'uploads')),
  filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|webm|mp3|ogg|pdf|doc|docx|xls|xlsx|txt|zip/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype.split('/')[1]);
    cb(null, ext || mime);
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Ensure uploads dir
if (!fs.existsSync(path.join(__dirname, 'public', 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'public', 'uploads'), { recursive: true });
}

// Track online users
const onlineUsers = new Map(); // socketId -> { username, lastSeen }

// --- API Routes ---

// Get messages (with pagination)
app.get('/api/messages', (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const messages = db.prepare(`
      SELECT id, sender, type, content, timestamp, fileName, fileSize, mimeType, duration, replyTo, deleted
      FROM messages
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    // Get reactions for these messages
    const ids = messages.map(m => m.id);
    let reactions = [];
    if (ids.length > 0) {
      reactions = db.prepare(
        `SELECT messageId, emoji, user FROM reactions WHERE messageId IN (${ids.map(() => '?').join(',')})`
      ).all(...ids);
    }

    // Get read receipts
    let reads = [];
    if (ids.length > 0) {
      reads = db.prepare(
        `SELECT messageId, user, readAt FROM read_receipts WHERE messageId IN (${ids.map(() => '?').join(',')})`
      ).all(...ids);
    }

    const enriched = messages.reverse().map(msg => ({
      ...msg,
      replyTo: msg.replyTo ? JSON.parse(msg.replyTo) : null,
      deleted: !!msg.deleted,
      reactions: reactions.filter(r => r.messageId === msg.id).map(r => ({ emoji: r.emoji, user: r.user })),
      readBy: reads.filter(r => r.messageId === msg.id).map(r => ({ user: r.user, at: r.readAt }))
    }));

    res.json(enriched);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    url: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    mimeType: req.file.mimetype
  });
});

// Get unread count
app.get('/api/unread/:user', (req, res) => {
  try {
    const { user } = req.params;
    const other = user === 'Facu' ? 'Rocío' : 'Facu';
    const count = db.prepare(`
      SELECT COUNT(*) as count FROM messages m
      WHERE m.sender = ? AND NOT EXISTS (
        SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?
      ) AND m.deleted = 0
    `).get(other, user);
    res.json({ unread: count.count });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

// Clear all messages
app.post('/api/clear', (req, res) => {
  try {
    db.exec('DELETE FROM messages; DELETE FROM reactions; DELETE FROM read_receipts');
    io.emit('clear');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

// --- Socket.io ---
io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('register', (username) => {
    currentUser = username;
    onlineUsers.set(socket.id, { username, lastSeen: Date.now() });
    io.emit('presence', { user: username, online: true });
    // Broadcast unread counts to this user
    const other = username === 'Facu' ? 'Rocío' : 'Facu';
    const unread = db.prepare(`
      SELECT COUNT(*) as count FROM messages m
      WHERE m.sender = ? AND NOT EXISTS (
        SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?
      ) AND m.deleted = 0
    `).get(other, username);
    socket.emit('unread_count', { count: unread.count });
  });

  // Send message
  socket.on('send_message', (data) => {
    try {
      const msgId = data.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const replyToStr = data.replyTo ? JSON.stringify(data.replyTo) : null;

      db.prepare(`
        INSERT INTO messages (id, sender, type, content, timestamp, fileName, fileSize, mimeType, duration, replyTo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(msgId, data.sender, data.type || 'text', data.content, data.timestamp || Date.now(),
            data.fileName || null, data.fileSize || null, data.mimeType || null, data.duration || null, replyToStr);

      const msg = db.prepare('SELECT * FROM messages WHERE id = ?').get(msgId);
      const message = {
        id: msg.id,
        sender: msg.sender,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        fileName: msg.fileName,
        fileSize: msg.fileSize,
        mimeType: msg.mimeType,
        duration: msg.duration,
        replyTo: msg.replyTo ? JSON.parse(msg.replyTo) : null,
        deleted: false,
        reactions: [],
        readBy: []
      };

      // Emit back to sender as confirmation
      socket.emit('message_sent', message);

      // Broadcast to other user
      socket.broadcast.emit('new_message', message);

      // Mark as delivered if other user is online
      const otherOnline = Array.from(onlineUsers.values()).some(
        u => u.username !== currentUser && u.username
      );
      if (otherOnline) {
        socket.emit('message_delivered', { id: msgId });
      }
    } catch (err) {
      console.error('Error saving message:', err);
      socket.emit('error', 'Error al guardar el mensaje');
    }
  });

  // Typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { user: data.user, typing: data.typing });
  });

  // Read receipt
  socket.on('mark_read', (data) => {
    try {
      const { messageId, user } = data;
      db.prepare('INSERT OR IGNORE INTO read_receipts (messageId, user, readAt) VALUES (?, ?, ?)')
        .run(messageId, user, Date.now());
      socket.broadcast.emit('message_read', { id: messageId, user });
    } catch (err) {
      console.error('Error marking read:', err);
    }
  });

  // React to message
  socket.on('add_reaction', (data) => {
    try {
      db.prepare('INSERT OR IGNORE INTO reactions (messageId, emoji, user) VALUES (?, ?, ?)')
        .run(data.messageId, data.emoji, data.user);
      const reactions = db.prepare('SELECT emoji, user FROM reactions WHERE messageId = ?')
        .all(data.messageId);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) {
      console.error('Error adding reaction:', err);
    }
  });

  socket.on('remove_reaction', (data) => {
    try {
      db.prepare('DELETE FROM reactions WHERE messageId = ? AND emoji = ? AND user = ?')
        .run(data.messageId, data.emoji, data.user);
      const reactions = db.prepare('SELECT emoji, user FROM reactions WHERE messageId = ?')
        .all(data.messageId);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) {
      console.error('Error removing reaction:', err);
    }
  });

  // Delete message
  socket.on('delete_message', (data) => {
    try {
      const { messageId, forEveryone } = data;
      const msg = db.prepare('SELECT * FROM messages WHERE id = ?').get(messageId);
      if (!msg) return;

      if (forEveryone) {
        db.prepare('UPDATE messages SET deleted = 1, content = ? WHERE id = ?')
          .run('🚫 Este mensaje fue eliminado', messageId);
      } else {
        // For "delete for me" - we just filter on client, keep in DB
      }
      io.emit('message_deleted', { id: messageId, forEveryone: !!forEveryone });
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  });

  // Presence
  socket.on('presence_update', (data) => {
    if (currentUser) {
      io.emit('presence', { user: currentUser, online: data.online });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (currentUser) {
      onlineUsers.delete(socket.id);
      const stillOnline = Array.from(onlineUsers.values()).some(u => u.username === currentUser);
      if (!stillOnline) {
        io.emit('presence', { user: currentUser, online: false, lastSeen: Date.now() });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}`);
});
