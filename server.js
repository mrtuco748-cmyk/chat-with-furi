const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 5e7 });

app.use(express.static(path.join(__dirname, 'public')));

const salas = {};

function limpiarSalaVacia(salaNombre) {
  const sala = salas[salaNombre];
  if (!sala) return;
  const usuariosActivos = Object.values(sala.usuarios).filter(u => u.presente).length;
  if (usuariosActivos === 0) {
    delete salas[salaNombre];
  }
}

io.on('connection', (socket) => {
  socket.on('unirse', (data) => {
    const salaNombre = data.sala?.toString().trim().slice(0, 50);
    const usuarioNombre = data.usuario?.toString().trim().slice(0, 30);
    if (!salaNombre || !usuarioNombre) return;

    socket.join(salaNombre);
    socket.sala = salaNombre;
    socket.usuario = usuarioNombre;

    if (!salas[salaNombre]) {
      salas[salaNombre] = { usuarios: {}, pendientes: {} };
    }
    const sala = salas[salaNombre];
    const existingUser = sala.usuarios[usuarioNombre];
    const oldSocketId = existingUser?.socketId;
    sala.usuarios[usuarioNombre] = { socketId: socket.id, presente: true, ultimaVez: null };
    if (!sala.pendientes[usuarioNombre]) sala.pendientes[usuarioNombre] = [];

    if (oldSocketId && oldSocketId !== socket.id) {
      io.to(oldSocketId).disconnectSockets(true);
    }

    const otros = Object.keys(sala.usuarios).filter(n => n !== usuarioNombre);
    for (const otro of otros) {
      const u = sala.usuarios[otro];
      socket.emit('presencia', { usuario: otro, presente: u.presente, ultimaVez: u.ultimaVez });
    }

    socket.to(salaNombre).emit('escribiendo', { usuario: '' });

    socket.to(salaNombre).emit('mensaje', {
      msgId: 'sys-' + Date.now(),
      usuario: '📢 Sistema',
      texto: `${usuarioNombre} se conectó`,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('mensaje', (data) => {
    if (!socket.sala || !socket.usuario) return;
    const sala = salas[socket.sala];
    if (!sala) return;

    const msgId = data.msgId?.toString().slice(0, 64);
    const texto = data.texto?.toString().slice(0, 2000) || '';
    const audio = data.audio ? { data: String(data.audio.data).slice(0, 1e7), type: String(data.audio.type).slice(0, 50), duracion: Math.min(Number(data.audio.duracion) || 0, 300) } : null;
    const imagen = data.imagen ? { data: String(data.imagen.data).slice(0, 1e7), type: String(data.imagen.type).slice(0, 50) } : null;
    const respondiendoA = data.respondiendoA ? { msgId: String(data.respondiendoA.msgId).slice(0, 64), usuario: String(data.respondiendoA.usuario).slice(0, 30), texto: String(data.respondiendoA.texto).slice(0, 500) } : null;

    socket.emit('estado-msg', { msgId, estado: 'enviado' });

    const mensajeCompleto = {
      msgId,
      usuario: socket.usuario,
      texto,
      audio,
      imagen,
      respondiendoA,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    io.to(socket.sala).emit('mensaje', mensajeCompleto);

    const otros = Object.keys(sala.usuarios).filter(n => n !== socket.usuario);
    for (const otro of otros) {
      const u = sala.usuarios[otro];
      if (!u.presente) {
        const pendientes = sala.pendientes[otro] || [];
        pendientes.push({ msgId, emisor: socket.usuario, timestamp: Date.now() });
        if (pendientes.length > 100) pendientes.shift();
        sala.pendientes[otro] = pendientes;
      }
    }

    socket.emit('estado-msg', { msgId, estado: 'entregado' });
  });

  socket.on('mensaje-leido', (data) => {
    if (!socket.sala || !data.msgId) return;
    const sala = salas[socket.sala];
    if (!sala) return;
    const otros = Object.keys(sala.usuarios).filter(n => n !== socket.usuario);
    for (const otro of otros) {
      const u = sala.usuarios[otro];
      if (u.socketId) {
        io.to(u.socketId).emit('estado-msg', { msgId: data.msgId, estado: 'visto' });
      }
    }
  });

  socket.on('presente', (data) => {
    if (!socket.sala || !salas[socket.sala]) return;
    const sala = salas[socket.sala];
    const usuario = data.usuario?.toString().slice(0, 30);
    if (!usuario || !sala.usuarios[usuario]) return;

    sala.usuarios[usuario].presente = true;
    sala.usuarios[usuario].socketId = socket.id;
    sala.usuarios[usuario].ultimaVez = null;

    const pendientes = sala.pendientes[usuario] || [];
    for (const p of pendientes) {
      const emisor = sala.usuarios[p.emisor];
      if (emisor && emisor.socketId) {
        io.to(emisor.socketId).emit('estado-msg', { msgId: p.msgId, estado: 'entregado' });
      }
    }
    sala.pendientes[usuario] = [];

    socket.to(socket.sala).emit('presencia', { usuario, presente: true, ultimaVez: null });
  });

  socket.on('ausente', (data) => {
    if (!socket.sala || !salas[socket.sala]) return;
    const usuario = data.usuario?.toString().slice(0, 30);
    if (!usuario || !salas[socket.sala].usuarios[usuario]) return;

    salas[socket.sala].usuarios[usuario].presente = false;
    socket.to(socket.sala).emit('presencia', { usuario, presente: false, ultimaVez: null });
  });

  socket.on('reaccion', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('reaccion', { msgId: String(data.msgId).slice(0, 64), reaccion: String(data.reaccion).slice(0, 10) });
    }
  });

  socket.on('editar-msg', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('editado-msg', { msgId: String(data.msgId).slice(0, 64), texto: String(data.texto).slice(0, 2000) });
    }
  });

  socket.on('eliminar-msg', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('eliminado-msg', { msgId: String(data.msgId).slice(0, 64) });
    }
  });

  socket.on('escribiendo', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('escribiendo', { usuario: data.usuario ? String(data.usuario).slice(0, 30) : '' });
    }
  });

  socket.on('disconnect', () => {
    if (socket.sala && socket.usuario && salas[socket.sala]) {
      const sala = salas[socket.sala];
      if (sala.usuarios[socket.usuario]) {
        sala.usuarios[socket.usuario].presente = false;
        sala.usuarios[socket.usuario].ultimaVez = Date.now();
        socket.to(socket.sala).emit('presencia', { usuario: socket.usuario, presente: false, ultimaVez: Date.now() });
      }
      io.to(socket.sala).emit('mensaje', {
        msgId: 'sys-' + Date.now(),
        usuario: '📢 Sistema',
        texto: `${socket.usuario} se desconectó`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      limpiarSalaVacia(socket.sala);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

setInterval(() => {
  const ahora = Date.now();
  for (const [salaNombre, sala] of Object.entries(salas)) {
    for (const [usuario, datos] of Object.entries(sala.usuarios)) {
      if (!datos.presente && datos.ultimaVez && ahora - datos.ultimaVez > 7 * 24 * 60 * 60 * 1000) {
        delete sala.usuarios[usuario];
        delete sala.pendientes[usuario];
      }
    }
    limpiarSalaVacia(salaNombre);
  }
}, 60 * 60 * 1000);
