const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('unirse', (data) => {
    socket.join(data.sala);
    socket.sala = data.sala;
    socket.usuario = data.usuario;
    socket.to(data.sala).emit('mensaje', {
      usuario: '📢 Sistema',
      texto: `${data.usuario} se conectó`,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('mensaje', (data) => {
    if (socket.sala) {
      io.to(socket.sala).emit('mensaje', {
        usuario: data.usuario,
        texto: data.texto || '',
        audio: data.audio || null,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  });

  socket.on('escribiendo', (data) => {
    if (socket.sala) {
      socket.to(socket.sala).emit('escribiendo', data);
    }
  });

  socket.on('disconnect', () => {
    if (socket.sala && socket.usuario) {
      io.to(socket.sala).emit('mensaje', {
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
