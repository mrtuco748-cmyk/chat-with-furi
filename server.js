const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const initSqlJs = require('sql.js');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }, maxHttpBufferSize: 50e6 });

// --- SQLite Setup (sql.js) ---
let db;
const DB_PATH = path.join(__dirname, 'data.db');

function saveDb() {
  const data = db.export();
  const buf = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buf);
}

async function initDb() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const fileBuf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuf);
  } else {
    db = new SQL.Database();
  }
  db.run('PRAGMA foreign_keys = ON');
  db.run(`
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
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS reactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      messageId TEXT NOT NULL,
      emoji TEXT NOT NULL,
      user TEXT NOT NULL,
      UNIQUE(messageId, emoji, user)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS read_receipts (
      messageId TEXT NOT NULL,
      user TEXT NOT NULL,
      readAt INTEGER NOT NULL,
      PRIMARY KEY (messageId, user)
    )
  `);
  db.run('CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC)');
  saveDb();
  console.log('Database initialized');
}

// Helper: query all rows as objects
function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Helper: query single row as object
function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length ? rows[0] : null;
}

// Helper: run INSERT/UPDATE/DELETE and save
function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

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
    const mime = allowed.test((file.mimetype||'').split('/')[1]||'');
    cb(null, ext || mime);
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

if (!fs.existsSync(path.join(__dirname, 'public', 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'public', 'uploads'), { recursive: true });
}

// --- API Routes ---
app.get('/api/messages', (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const messages = queryAll(
      'SELECT id, sender, type, content, timestamp, fileName, fileSize, mimeType, duration, replyTo, deleted FROM messages ORDER BY timestamp DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ).reverse();

    const ids = messages.map(m => m.id);
    let reactions = [];
    let reads = [];
    if (ids.length > 0) {
      const placeholders = ids.map(() => '?').join(',');
      reactions = queryAll(`SELECT messageId, emoji, user FROM reactions WHERE messageId IN (${placeholders})`, ids);
      reads = queryAll(`SELECT messageId, user, readAt FROM read_receipts WHERE messageId IN (${placeholders})`, ids);
    }

    const enriched = messages.map(msg => ({
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

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    url: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    mimeType: req.file.mimetype
  });
});

app.get('/api/unread/:user', (req, res) => {
  try {
    const { user } = req.params;
    const other = user === 'Facu' ? 'Rocío' : 'Facu';
    const row = queryOne(
      'SELECT COUNT(*) as count FROM messages m WHERE m.sender = ? AND NOT EXISTS (SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?) AND m.deleted = 0',
      [other, user]
    );
    res.json({ unread: row ? row.count : 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/clear', (req, res) => {
  try {
    db.run('DELETE FROM messages');
    db.run('DELETE FROM reactions');
    db.run('DELETE FROM read_receipts');
    saveDb();
    io.emit('clear');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

// --- Socket.io ---
const onlineUsers = new Map();

io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('register', (username) => {
    currentUser = username;
    onlineUsers.set(socket.id, { username, lastSeen: Date.now() });
    io.emit('presence', { user: username, online: true });
    const other = username === 'Facu' ? 'Rocío' : 'Facu';
    const row = queryOne(
      'SELECT COUNT(*) as count FROM messages m WHERE m.sender = ? AND NOT EXISTS (SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?) AND m.deleted = 0',
      [other, username]
    );
    socket.emit('unread_count', { count: row ? row.count : 0 });
  });

  socket.on('send_message', (data) => {
    try {
      const msgId = data.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const replyToStr = data.replyTo ? JSON.stringify(data.replyTo) : null;
      dbRun(
        'INSERT INTO messages (id, sender, type, content, timestamp, fileName, fileSize, mimeType, duration, replyTo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [msgId, data.sender, data.type || 'text', data.content, data.timestamp || Date.now(),
         data.fileName || null, data.fileSize || null, data.mimeType || null, data.duration || null, replyToStr]
      );

      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [msgId]);
      const message = {
        id: msg.id, sender: msg.sender, type: msg.type,
        content: msg.content, timestamp: msg.timestamp,
        fileName: msg.fileName, fileSize: msg.fileSize,
        mimeType: msg.mimeType, duration: msg.duration,
        replyTo: msg.replyTo ? JSON.parse(msg.replyTo) : null,
        deleted: false, reactions: [], readBy: []
      };

      socket.emit('message_sent', message);
      socket.broadcast.emit('new_message', message);

      const otherOnline = Array.from(onlineUsers.values()).some(u => u.username !== currentUser && u.username);
      if (otherOnline) socket.emit('message_delivered', { id: msgId });
    } catch (err) {
      console.error('Error saving message:', err);
      socket.emit('error', 'Error al guardar el mensaje');
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { user: data.user, typing: data.typing });
  });

  socket.on('mark_read', (data) => {
    try {
      const { messageId, user } = data;
      dbRun('INSERT OR IGNORE INTO read_receipts (messageId, user, readAt) VALUES (?, ?, ?)', [messageId, user, Date.now()]);
      socket.broadcast.emit('message_read', { id: messageId, user });
    } catch (err) {
      console.error('Error marking read:', err);
    }
  });

  socket.on('add_reaction', (data) => {
    try {
      dbRun('INSERT OR IGNORE INTO reactions (messageId, emoji, user) VALUES (?, ?, ?)', [data.messageId, data.emoji, data.user]);
      const reactions = queryAll('SELECT emoji, user FROM reactions WHERE messageId = ?', [data.messageId]);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) {
      console.error('Error adding reaction:', err);
    }
  });

  socket.on('remove_reaction', (data) => {
    try {
      dbRun('DELETE FROM reactions WHERE messageId = ? AND emoji = ? AND user = ?', [data.messageId, data.emoji, data.user]);
      const reactions = queryAll('SELECT emoji, user FROM reactions WHERE messageId = ?', [data.messageId]);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) {
      console.error('Error removing reaction:', err);
    }
  });

  socket.on('delete_message', (data) => {
    try {
      const { messageId, forEveryone } = data;
      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [messageId]);
      if (!msg) return;
      if (forEveryone) {
        dbRun('UPDATE messages SET deleted = 1, content = ? WHERE id = ?', ['🚫 Este mensaje fue eliminado', messageId]);
      }
      io.emit('message_deleted', { id: messageId, forEveryone: !!forEveryone });
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  });

  socket.on('presence_update', (data) => {
    if (currentUser) io.emit('presence', { user: currentUser, online: data.online });
  });

  socket.on('disconnect', () => {
    if (currentUser) {
      onlineUsers.delete(socket.id);
      const stillOnline = Array.from(onlineUsers.values()).some(u => u.username === currentUser);
      if (!stillOnline) io.emit('presence', { user: currentUser, online: false, lastSeen: Date.now() });
    }
  });
});

const PORT = process.env.PORT || 3000;
initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
