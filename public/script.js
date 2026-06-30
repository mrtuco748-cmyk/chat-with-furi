const socket = io();
let usuario = '';
let sala = '';
let escribiendoTimeout = null;
let mediaRecorder = null;
let audioChunks = [];
let grabando = false;
let tiempoGrabacion = 0;
let intervaloTiempo = null;
const mensajesEnviados = new Map();

let presente = false;

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
const microfonoBtn = document.getElementById('microfonoBtn');
const grabandoDiv = document.getElementById('grabando');
const tiempoGrabacionSpan = document.getElementById('tiempoGrabacion');

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
  marcarPresente();
  mensajeInput.focus();
}

function marcarPresente() {
  presente = true;
  socket.emit('presente', { usuario });
}

function marcarAusente() {
  presente = false;
  socket.emit('ausente', { usuario });
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    marcarPresente();
  } else {
    marcarAusente();
  }
});

window.addEventListener('focus', () => marcarPresente());
window.addEventListener('blur', () => marcarAusente());

function enviarMensaje() {
  const texto = mensajeInput.value.trim();
  if (!texto) return;
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  socket.emit('mensaje', { msgId, usuario, texto });
  agregarMensajePropio(msgId, { usuario, texto, hora: '', audio: null });
  mensajeInput.value = '';
  mensajeInput.focus();
}

function agregarMensajePropio(msgId, data) {
  const div = document.createElement('div');
  div.id = 'msg-' + msgId;
  div.classList.add('mensaje', 'propio');
  const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let contenido = '';
  if (data.audio) {
    contenido += `<div class="duracion-audio">🎤 ${data.audio.duracion || 0}s</div>`;
  } else {
    contenido += `<div class="texto">${data.texto}</div>`;
  }

  div.innerHTML = `
    <div class="usuario">${data.usuario}</div>
    ${contenido}
    <div class="hora-estado">
      <span class="hora">${ahora}</span>
      <span class="estado-msg" id="estado-${msgId}"><span class="tick-enviando">⏳</span></span>
    </div>
  `;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  mensajesEnviados.set(msgId, div);
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

microfonoBtn.addEventListener('click', toggleGrabacion);

async function toggleGrabacion() {
  if (grabando) {
    detenerGrabacion();
  } else {
    await iniciarGrabacion();
  }
}

async function iniciarGrabacion() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4' });
    audioChunks = [];
    grabando = true;
    tiempoGrabacion = 0;
    microfonoBtn.textContent = '⏹️';
    microfonoBtn.classList.add('grabando');
    grabandoDiv.classList.remove('oculto');
    tiempoGrabacionSpan.textContent = '0s';
    intervaloTiempo = setInterval(() => {
      tiempoGrabacion++;
      tiempoGrabacionSpan.textContent = tiempoGrabacion + 's';
    }, 1000);

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      clearInterval(intervaloTiempo);
      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
      stream.getTracks().forEach(t => t.stop());
      if (tiempoGrabacion >= 1) {
        enviarAudio(audioBlob);
      }
      microfonoBtn.textContent = '🎤';
      microfonoBtn.classList.remove('grabando');
      grabandoDiv.classList.add('oculto');
      grabando = false;
    };

    mediaRecorder.start();
  } catch (err) {
    alert('No se pudo acceder al micrófono');
  }
}

function detenerGrabacion() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}

function enviarAudio(blob) {
  const reader = new FileReader();
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  reader.onloadend = () => {
    const base64 = reader.result.split(',')[1];
    socket.emit('mensaje', {
      msgId,
      usuario,
      texto: '',
      audio: { data: base64, type: blob.type, duracion: tiempoGrabacion }
    });
    agregarMensajePropio(msgId, { usuario, texto: '', hora: '', audio: { duracion: tiempoGrabacion } });
  };
  reader.readAsDataURL(blob);
}

socket.on('mensaje', (data) => {
  if (data.usuario === usuario) return;

  const div = document.createElement('div');
  div.classList.add('mensaje');
  div.classList.add(data.usuario === usuario ? 'propio' : 'otro');
  const esSistema = data.usuario === '📢 Sistema';
  if (esSistema) div.classList.add('sistema');

  let contenido = '';
  if (data.audio) {
    const src = 'data:' + data.audio.type + ';base64,' + data.audio.data;
    contenido += `
      <audio controls src="${src}" class="audio-msg"></audio>
      <div class="duracion-audio">🎤 ${data.audio.duracion || 0}s</div>
    `;
  }
  if (data.texto) {
    contenido += `<div class="texto">${data.texto}</div>`;
  }

  div.innerHTML = `
    ${esSistema ? '' : `<div class="usuario">${data.usuario}</div>`}
    ${contenido}
    <div class="hora">${data.hora}</div>
  `;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

socket.on('estado-msg', (data) => {
  const estadoEl = document.getElementById('estado-' + data.msgId);
  if (!estadoEl) return;

  if (data.estado === 'entregado') {
    estadoEl.innerHTML = '<span class="tick doble">✓✓</span>';
  } else if (data.estado === 'visto') {
    estadoEl.innerHTML = '<span class="tick doble visto">✓✓</span>';
  }
});

socket.on('escribiendo', (data) => {
  if (data.usuario && data.usuario !== usuario) {
    escribiendoDiv.textContent = data.usuario + ' está escribiendo...';
  } else {
    escribiendoDiv.textContent = '';
  }
});
