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

let db;
const DB_PATH = path.join(__dirname, 'data.db');

function saveDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function initDb() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }
  db.run('PRAGMA foreign_keys = ON');
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY, sender TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'text',
    content TEXT NOT NULL, timestamp INTEGER NOT NULL, fileName TEXT, fileSize INTEGER,
    mimeType TEXT, duration REAL, replyTo TEXT, deleted INTEGER DEFAULT 0,
    deletedFor TEXT, starred INTEGER DEFAULT 0, edited INTEGER DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, messageId TEXT NOT NULL,
    emoji TEXT NOT NULL, user TEXT NOT NULL, UNIQUE(messageId, emoji, user)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS read_receipts (
    messageId TEXT NOT NULL, user TEXT NOT NULL, readAt INTEGER NOT NULL, PRIMARY KEY (messageId, user)
  )`);
  db.run('CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC)');
  saveDb();
  console.log('Database initialized');
}

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length ? rows[0] : null;
}

function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

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
    const mime = allowed.test((file.mimetype || '').split('/')[1] || '');
    cb(null, ext || mime);
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

function enrichMessages(messages) {
  const ids = messages.map(m => m.id);
  let reactions = [], reads = [];
  if (ids.length > 0) {
    const ph = ids.map(() => '?').join(',');
    reactions = queryAll(`SELECT messageId, emoji, user FROM reactions WHERE messageId IN (${ph})`, ids);
    reads = queryAll(`SELECT messageId, user, readAt FROM read_receipts WHERE messageId IN (${ph})`, ids);
  }
  return messages.map(msg => ({
    ...msg,
    replyTo: msg.replyTo ? JSON.parse(msg.replyTo) : null,
    deleted: !!msg.deleted,
    starred: !!msg.starred,
    edited: !!msg.edited,
    reactions: reactions.filter(r => r.messageId === msg.id).map(r => ({ emoji: r.emoji, user: r.user })),
    readBy: reads.filter(r => r.messageId === msg.id).map(r => ({ user: r.user, at: r.readAt }))
  }));
}

app.get('/api/messages', (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const user = req.query.user || '';
    let messages;
    if (user) {
      messages = queryAll(
        'SELECT * FROM messages WHERE (deleted = 0 OR deleted IS NULL) AND (deletedFor IS NULL OR deletedFor NOT LIKE ?) ORDER BY timestamp DESC LIMIT ? OFFSET ?',
        [`%${user}%`, limit, offset]
      ).reverse();
    } else {
      messages = queryAll(
        'SELECT * FROM messages WHERE (deleted = 0 OR deleted IS NULL) ORDER BY timestamp DESC LIMIT ? OFFSET ?',
        [limit, offset]
      ).reverse();
    }
    res.json(enrichMessages(messages));
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}`, fileName: req.file.originalname, fileSize: req.file.size, mimeType: req.file.mimetype });
});

app.get('/api/unread/:user', (req, res) => {
  try {
    const { user } = req.params;
    const other = user === 'Facu' ? 'Rocío' : 'Facu';
    const row = queryOne(
      'SELECT COUNT(*) as count FROM messages m WHERE m.sender = ? AND (m.deleted = 0 OR m.deleted IS NULL) AND (m.deletedFor IS NULL OR m.deletedFor NOT LIKE ?) AND NOT EXISTS (SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?)',
      [other, `%${user}%`, user]
    );
    res.json({ unread: row ? row.count : 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/clear', (req, res) => {
  try {
    db.run('DELETE FROM messages'); db.run('DELETE FROM reactions');
    db.run('DELETE FROM read_receipts'); saveDb();
    io.emit('clear');
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Error' }); }
});

const onlineUsers = new Map();

function getOtherUser(username) {
  return username === 'Facu' ? 'Rocío' : 'Facu';
}

io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('register', (username) => {
    currentUser = username;
    onlineUsers.set(socket.id, { username, lastSeen: Date.now() });
    io.emit('presence', { user: username, online: true });
    const other = getOtherUser(username);
    const row = queryOne(
      'SELECT COUNT(*) as count FROM messages m WHERE m.sender = ? AND (m.deleted = 0 OR m.deleted IS NULL) AND (m.deletedFor IS NULL OR m.deletedFor NOT LIKE ?) AND NOT EXISTS (SELECT 1 FROM read_receipts r WHERE r.messageId = m.id AND r.user = ?)',
      [other, `%${username}%`, username]
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
      const message = enrichMessages([msg])[0];
      socket.emit('message_sent', message);
      socket.broadcast.emit('new_message', message);
      const otherOnline = Array.from(onlineUsers.values()).some(u => u.username !== currentUser);
      if (otherOnline) socket.emit('message_delivered', { id: msgId });
    } catch (err) {
      console.error('Error saving message:', err);
      socket.emit('msg_error', { id: data.id || '', error: 'Error al guardar el mensaje' });
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
    } catch (err) { console.error('Error marking read:', err); }
  });

  socket.on('mark_read_bulk', (data) => {
    try {
      const { messageIds, user } = data;
      const stmt = db.prepare('INSERT OR IGNORE INTO read_receipts (messageId, user, readAt) VALUES (?, ?, ?)');
      messageIds.forEach(id => { stmt.bind([id, user, Date.now()]); stmt.step(); stmt.reset(); });
      stmt.free();
      saveDb();
      socket.broadcast.emit('messages_read', { ids: messageIds, user });
    } catch (err) { console.error('Error bulk mark read:', err); }
  });

  socket.on('add_reaction', (data) => {
    try {
      dbRun('DELETE FROM reactions WHERE messageId = ? AND user = ?', [data.messageId, data.user]);
      dbRun('INSERT OR IGNORE INTO reactions (messageId, emoji, user) VALUES (?, ?, ?)', [data.messageId, data.emoji, data.user]);
      const reactions = queryAll('SELECT emoji, user FROM reactions WHERE messageId = ?', [data.messageId]);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) { console.error('Error adding reaction:', err); }
  });

  socket.on('remove_reaction', (data) => {
    try {
      dbRun('DELETE FROM reactions WHERE messageId = ? AND emoji = ? AND user = ?', [data.messageId, data.emoji, data.user]);
      const reactions = queryAll('SELECT emoji, user FROM reactions WHERE messageId = ?', [data.messageId]);
      io.emit('reaction_updated', { messageId: data.messageId, reactions });
    } catch (err) { console.error('Error removing reaction:', err); }
  });

  socket.on('delete_message', (data) => {
    try {
      const { messageId, forEveryone, user } = data;
      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [messageId]);
      if (!msg) return;
      if (forEveryone) {
        dbRun('UPDATE messages SET deleted = 1, content = ?, edited = 1 WHERE id = ?', ['Mensaje eliminado', messageId]);
        io.emit('message_deleted', { id: messageId, forEveryone: true });
      } else {
        if (msg.deletedFor) {
          const users = msg.deletedFor.split(',');
          if (!users.includes(user)) users.push(user);
          dbRun('UPDATE messages SET deletedFor = ? WHERE id = ?', [users.join(','), messageId]);
        } else {
          dbRun('UPDATE messages SET deletedFor = ? WHERE id = ?', [user, messageId]);
        }
        socket.emit('message_deleted', { id: messageId, forEveryone: false });
      }
    } catch (err) { console.error('Error deleting message:', err); }
  });

  socket.on('star_message', (data) => {
    try {
      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [data.messageId]);
      if (!msg) return;
      const newVal = msg.starred ? 0 : 1;
      dbRun('UPDATE messages SET starred = ? WHERE id = ?', [newVal, data.messageId]);
      io.emit('message_starred', { id: data.messageId, starred: !!newVal });
    } catch (err) { console.error('Error starring message:', err); }
  });

  socket.on('forward_message', (data) => {
    try {
      const newId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fwdPrefix = '📩 Reenviado\n';
      dbRun(
        'INSERT INTO messages (id, sender, type, content, timestamp, fileName, fileSize, mimeType, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newId, data.sender, data.type, data.type === 'text' ? fwdPrefix + data.content : data.content,
         Date.now(), data.fileName || null, data.fileSize || null, data.mimeType || null, data.duration || null]
      );
      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [newId]);
      const message = enrichMessages([msg])[0];
      socket.emit('message_sent', message);
      socket.broadcast.emit('new_message', message);
    } catch (err) { console.error('Error forwarding message:', err); }
  });

  socket.on('message_info', (data) => {
    try {
      const msg = queryOne('SELECT * FROM messages WHERE id = ?', [data.messageId]);
      if (!msg) return;
      const reads = queryAll('SELECT user, readAt FROM read_receipts WHERE messageId = ?', [data.messageId]);
      socket.emit('message_info', { id: data.messageId, timestamp: msg.timestamp, readBy: reads });
    } catch (err) { console.error('Error getting message info:', err); }
  });

  socket.on('edit_message', (data) => {
    try {
      dbRun('UPDATE messages SET content = ?, edited = 1 WHERE id = ?', [data.content, data.messageId]);
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
