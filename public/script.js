const socket = io();
let usuario = '';
let sala = '';
let escribiendoTimeout = null;
let mediaRecorder = null;
let audioChunks = [];
let grabando = false;
let tiempoGrabacion = 0;
let intervaloTiempo = null;

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
  reader.onloadend = () => {
    const base64 = reader.result.split(',')[1];
    socket.emit('mensaje', {
      usuario,
      texto: '',
      audio: { data: base64, type: blob.type, duracion: tiempoGrabacion }
    });
  };
  reader.readAsDataURL(blob);
}

socket.on('mensaje', (data) => {
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

socket.on('escribiendo', (data) => {
  if (data.usuario && data.usuario !== usuario) {
    escribiendoDiv.textContent = data.usuario + ' está escribiendo...';
  } else {
    escribiendoDiv.textContent = '';
  }
});
