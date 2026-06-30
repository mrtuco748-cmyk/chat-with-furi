const socket = io();
let usuario = '';
let sala = '';
let escribiendoTimeout = null;

const login = document.getElementById('login');
const chat = document.getElementById('chat');
const codigoInput = document.getElementById('codigoInput');
const nombreInput = document.getElementById('nombreInput');
const entrarBtn = document.getElementById('entrarBtn');
const usuarioActual = document.getElementById('usuarioActual');
const mensajesDiv = document.getElementById('mensajes');
const mensajeInput = document.getElementById('mensajeInput');
const enviarBtn = document.getElementById('enviarBtn');
const escribiendoDiv = document.getElementById('escribiendo');

entrarBtn.addEventListener('click', entrar);
codigoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') nombreInput.focus(); });
nombreInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') entrar(); });

function entrar() {
  const codigo = codigoInput.value.trim();
  const nombre = nombreInput.value.trim();
  if (!codigo || !nombre) return;
  sala = codigo;
  usuario = nombre;
  usuarioActual.textContent = 'Conectado como: ' + usuario;
  login.classList.add('oculto');
  chat.classList.remove('oculto');
  socket.emit('unirse', { sala, usuario });
  mensajeInput.focus();
}

function enviarMensaje() {
  const texto = mensajeInput.value.trim();
  if (!texto) return;
  socket.emit('mensaje', { usuario, texto });
  mensajeInput.value = '';
  mensajeInput.focus();
}

enviarBtn.addEventListener('click', enviarMensaje);
mensajeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') enviarMensaje();
});

mensajeInput.addEventListener('input', () => {
  socket.emit('escribiendo', { usuario });
  clearTimeout(escribiendoTimeout);
  escribiendoTimeout = setTimeout(() => {
    socket.emit('escribiendo', { usuario: '' });
  }, 1000);
});

socket.on('mensaje', (data) => {
  const div = document.createElement('div');
  div.classList.add('mensaje');
  div.classList.add(data.usuario === usuario ? 'propio' : 'otro');
  const esSistema = data.usuario === '📢 Sistema';
  if (esSistema) div.classList.add('sistema');
  div.innerHTML = `
    ${esSistema ? '' : `<div class="usuario">${data.usuario}</div>`}
    <div class="texto">${data.texto}</div>
    <div class="hora">${data.hora}</div>
  `;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

socket.on('escribiendo', (data) => {
  if (data.usuario && data.usuario !== usuario) {
    escribiendoDiv.textContent = data.usuario + ' está escribiendo...';
  } else {
    escribiendoDiv.textContent = '';
  }
});
