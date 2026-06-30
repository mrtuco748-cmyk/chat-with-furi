const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const salas = {};

io.on('connection', (socket) => {
  socket.on('unirse', (data) => {
    socket.join(data.sala);
    socket.sala = data.sala;
    socket.usuario = data.usuario;

    if (!salas[data.sala]) {
      salas[data.sala] = { usuarios: {}, pendientes: {} };
    }
    salas[data.sala].usuarios[data.usuario] = { socketId: socket.id, presente: false, ultimaVez: null };
    salas[data.sala].pendientes[data.usuario] = [];

    const otros = Object.keys(salas[data.sala].usuarios).filter(n => n !== data.usuario);
    for (const otro of otros) {
      const u = salas[data.sala].usuarios[otro];
      socket.emit('presencia', { usuario: otro, presente: u.presente, ultimaVez: u.ultimaVez });
    }

    socket.to(data.sala).emit('mensaje', {
      msgId: 'sys-' + Date.now(),
      usuario: '📢 Sistema',
      texto: `${data.usuario} se conectó`,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('mensaje', (data) => {
    if (!socket.sala) return;
    const sala = salas[socket.sala];
    if (!sala) return;

    socket.emit('estado-msg', { msgId: data.msgId, estado: 'enviado' });

    io.to(socket.sala).emit('mensaje', {
      msgId: data.msgId,
      usuario: data.usuario,
      texto: data.texto || '',
      audio: data.audio || null,
      imagen: data.imagen || null,
      respondiendoA: data.respondiendoA || null,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const otros = Object.keys(sala.usuarios).filter(n => n !== data.usuario);
    for (const otro of otros) {
      if (sala.usuarios[otro].presente) {
        socket.emit('estado-msg', { msgId: data.msgId, estado: 'visto' });
      } else {
        socket.emit('estado-msg', { msgId: data.msgId, estado: 'entregado' });
        sala.pendientes[otro].push({ msgId: data.msgId, emisor: data.usuario });
      }
    }
  });

  socket.on('presente', (data) => {
    if (!socket.sala || !salas[socket.sala]) return;
    salas[socket.sala].usuarios[data.usuario].presente = true;
    salas[socket.sala].usuarios[data.usuario].ultimaVez = null;

    const pendientes = salas[socket.sala].pendientes[data.usuario] || [];
    for (const p of pendientes) {
      const emisorSocket = salas[socket.sala].usuarios[p.emisor];
      if (emisorSocket) {
        io.to(emisorSocket.socketId).emit('estado-msg', { msgId: p.msgId, estado: 'visto' });
      }
    }
    salas[socket.sala].pendientes[data.usuario] = [];

    socket.to(socket.sala).emit('presencia', { usuario: data.usuario, presente: true, ultimaVez: null });
  });

  socket.on('ausente', (data) => {
    if (!socket.sala || !salas[socket.sala]) return;
    if (salas[socket.sala].usuarios[data.usuario]) {
      salas[socket.sala].usuarios[data.usuario].presente = false;
      salas[socket.sala].usuarios[data.usuario].ultimaVez = Date.now();
      socket.to(socket.sala).emit('presencia', { usuario: data.usuario, presente: false, ultimaVez: Date.now() });
    }
  });

  socket.on('reaccion', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('reaccion', { msgId: data.msgId, reaccion: data.reaccion });
    }
  });

  socket.on('escribiendo', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('escribiendo', data);
    }
  });

  socket.on('disconnect', () => {
    if (socket.sala && socket.usuario && salas[socket.sala]) {
      if (salas[socket.sala].usuarios[socket.usuario]) {
        salas[socket.sala].usuarios[socket.usuario].presente = false;
        salas[socket.sala].usuarios[socket.usuario].ultimaVez = Date.now();
        socket.to(socket.sala).emit('presencia', { usuario: socket.usuario, presente: false, ultimaVez: Date.now() });
      }
      io.to(socket.sala).emit('mensaje', {
        msgId: 'sys-' + Date.now(),
        usuario: '📢 Sistema',
        texto: `${socket.usuario} se desconectó`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
