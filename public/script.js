const socket = io({
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});

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
let respondiendoA = null;
let msgMenuMsgId = null;

const login = document.getElementById('login');
const chat = document.getElementById('chat');
const codigoInput = document.getElementById('codigoInput');
const nombreInput = document.getElementById('nombreInput');
const entrarBtn = document.getElementById('entrarBtn');
const estadoConexion = document.getElementById('estadoConexion');
const headerEstado = document.getElementById('headerEstado');
const mensajesDiv = document.getElementById('mensajes');
const mensajeInput = document.getElementById('mensajeInput');
const enviarBtn = document.getElementById('enviarBtn');
const escribiendoDiv = document.getElementById('escribiendo');
const microfonoBtn2 = document.getElementById('microfonoBtn2');
const grabandoDiv = document.getElementById('grabando');
const tiempoGrabacionSpan = document.getElementById('tiempoGrabacion');
const cancelarGrabacion = document.getElementById('cancelarGrabacion');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const attachBtn = document.getElementById('attachBtn');
const attachMenu = document.getElementById('attachMenu');
const attachOverlay = document.getElementById('attachOverlay');
const replyBar = document.getElementById('replyBar');
const replyUser = document.getElementById('replyUser');
const replyText = document.getElementById('replyText');
const replyClose = document.getElementById('replyClose');
const msgMenu = document.getElementById('msgMenu');
const msgmenuOverlay = document.getElementById('msgmenuOverlay');
const menuResponder = document.getElementById('menuResponder');
const menuCopiar = document.getElementById('menuCopiar');
const menuEliminar = document.getElementById('menuEliminar');

entrarBtn.addEventListener('click', entrar);
codigoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') nombreInput.focus(); });
nombreInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') entrar(); });

function entrar() {
  const codigo = codigoInput.value.trim();
  const nombre = nombreInput.value.trim();
  if (!codigo || !nombre) return;
  sala = codigo;
  usuario = nombre;
  localStorage.setItem('chat-sala', sala);
  localStorage.setItem('chat-usuario', usuario);
  iniciarSesion();
}

function iniciarSesion() {
  login.classList.add('oculto');
  chat.classList.remove('oculto');
  conectarAlSala();
  mensajeInput.focus();
  registrarServiceWorker();
  pedirPermisoNotificacion();
  construirEmojiPicker();
}

function conectarAlSala() {
  if (socket.connected) {
    socket.emit('unirse', { sala, usuario });
    marcarPresente();
  }
}

async function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (e) {}
  }
}

function pedirPermisoNotificacion() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function marcarPresente() {
  presente = true;
  socket.emit('presente', { usuario });
  headerEstado.textContent = 'en línea ❤️';
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
    headerEstado.textContent = 'ausente';
  }
});

window.addEventListener('focus', () => marcarPresente());
window.addEventListener('blur', () => { marcarAusente(); headerEstado.textContent = 'ausente'; });

socket.on('connect', () => {
  estadoConexion.className = 'conectado';
  headerEstado.textContent = 'en línea ❤️';
  if (sala && usuario) conectarAlSala();
});

socket.on('disconnect', () => {
  estadoConexion.className = 'desconectado';
  headerEstado.textContent = 'desconectado';
});

socket.io.on('reconnect_attempt', () => {
  estadoConexion.className = 'reconectando';
  headerEstado.textContent = 'reconectando...';
});

socket.io.on('reconnect', () => {
  estadoConexion.className = 'conectado';
  headerEstado.textContent = 'en línea ❤️';
});

mensajeInput.addEventListener('input', () => {
  actualizarBotonEnvio();
  socket.emit('escribiendo', { usuario });
  clearTimeout(escribiendoTimeout);
  escribiendoTimeout = setTimeout(() => {
    socket.emit('escribiendo', { usuario: '' });
  }, 1000);
});

function actualizarBotonEnvio() {
  if (mensajeInput.value.trim().length > 0) {
    microfonoBtn2.classList.add('oculto');
    enviarBtn.classList.remove('oculto');
  } else {
    microfonoBtn2.classList.remove('oculto');
    enviarBtn.classList.add('oculto');
  }
}

enviarBtn.addEventListener('click', enviarMensaje);
mensajeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') enviarMensaje();
});

function enviarMensaje() {
  const texto = mensajeInput.value.trim();
  if (!texto) return;
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const msgData = { msgId, usuario, texto };
  if (respondiendoA) {
    msgData.respondiendoA = respondiendoA;
  }
  socket.emit('mensaje', msgData);
  agregarMensajePropio(msgId, { usuario, texto, audio: null, imagen: null, respondiendoA });
  mensajeInput.value = '';
  actualizarBotonEnvio();
  mensajeInput.focus();
  emojiPicker.classList.add('oculto');
  cancelarReply();
}

cancelarGrabacion.addEventListener('click', cancelarGrabacionFn);

function cancelarGrabacionFn() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    grabando = false;
  }
  microfonoBtn2.classList.remove('oculto');
  microfonoBtn2.textContent = '🎤';
  grabandoDiv.classList.add('oculto');
  tiempoGrabacion = 0;
  clearInterval(intervaloTiempo);
}

microfonoBtn2.addEventListener('click', toggleGrabacion);

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
    microfonoBtn2.textContent = '🔴';
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
      if (tiempoGrabacion >= 1 && grabando) {
        enviarAudio(audioBlob);
      }
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
    grabando = false;
    mediaRecorder.stop();
  }
}

function enviarAudio(blob) {
  const reader = new FileReader();
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  reader.onloadend = () => {
    const base64 = reader.result.split(',')[1];
    socket.emit('mensaje', {
      msgId, usuario, texto: '',
      audio: { data: base64, type: blob.type, duracion: tiempoGrabacion },
      respondiendoA
    });
    agregarMensajePropio(msgId, { usuario, texto: '', audio: { duracion: tiempoGrabacion }, imagen: null, respondiendoA });
    if (respondiendoA) cancelarReply();
  };
  reader.readAsDataURL(blob);
}

function construirEmojiPicker() {
  const emojis = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥴','😵','🤯','🥳','😎','🧐','😢','😭','😤','😠','😡','🤬','💕','❤️','❤️‍🔥','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💖','💗','💓','💞','💝','💘','💟','♥️','💌','💋','👋','🤚','🖐️','✋','🖖','👌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦵','🦶','👂','🦻','👃','🧠','🦷','👀','👅'];
  emojiPicker.innerHTML = '';
  for (const e of emojis) {
    const btn = document.createElement('button');
    btn.textContent = e;
    btn.addEventListener('click', () => {
      mensajeInput.value += e;
      mensajeInput.focus();
      actualizarBotonEnvio();
    });
    emojiPicker.appendChild(btn);
  }
}

emojiBtn.addEventListener('click', () => {
  attachMenu.classList.add('oculto');
  msgMenu.classList.add('oculto');
  emojiPicker.classList.toggle('oculto');
});

attachBtn.addEventListener('click', () => {
  emojiPicker.classList.add('oculto');
  msgMenu.classList.add('oculto');
  attachMenu.classList.remove('oculto');
});

attachOverlay.addEventListener('click', () => {
  attachMenu.classList.add('oculto');
});

msgmenuOverlay.addEventListener('click', () => {
  msgMenu.classList.add('oculto');
});

document.querySelectorAll('.attach-option').forEach(btn => {
  btn.addEventListener('click', () => {
    attachMenu.classList.add('oculto');
    const tipo = btn.dataset.tipo;
    if (tipo === 'camara') abrirCamara();
    else if (tipo === 'galeria') abrirGaleria();
  });
});

function abrirCamara() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) enviarImagen(e.target.files[0]);
  });
  input.click();
}

function abrirGaleria() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) enviarImagen(e.target.files[0]);
  });
  input.click();
}

function enviarImagen(file) {
  const reader = new FileReader();
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  reader.onloadend = () => {
    const base64 = reader.result.split(',')[1];
    socket.emit('mensaje', { msgId, usuario, texto: '', imagen: { data: base64, type: file.type }, respondiendoA });
    agregarMensajePropio(msgId, { usuario, texto: '', audio: null, imagen: { type: file.type }, respondiendoA });
    if (respondiendoA) cancelarReply();
  };
  reader.readAsDataURL(file);
}

replyClose.addEventListener('click', cancelarReply);

function iniciarReply(data) {
  respondiendoA = { msgId: data.msgId, usuario: data.usuarioUsuario || data.usuario, texto: data.texto };
  replyUser.textContent = respondiendoA.usuario;
  replyText.textContent = respondiendoA.texto || (data.audio ? '🎤 Audio' : '🖼️ Foto');
  replyBar.classList.remove('oculto');
  mensajeInput.focus();
}

function cancelarReply() {
  respondiendoA = null;
  replyBar.classList.add('oculto');
}

menuResponder.addEventListener('click', () => {
  msgMenu.classList.add('oculto');
  const msgEl = document.getElementById('msg-' + msgMenuMsgId);
  if (msgEl) {
    const data = mensajesEnviados.get(msgMenuMsgId) || { msgId: msgMenuMsgId, usuario: '', texto: '' };
    const usuarioMsg = msgEl.dataset.usuario || '';
    const textoMsg = msgEl.dataset.texto || '';
    iniciarReply({ msgId: msgMenuMsgId, usuario: usuarioMsg, texto: textoMsg });
  }
});

menuCopiar.addEventListener('click', () => {
  msgMenu.classList.add('oculto');
  const msgEl = document.getElementById('msg-' + msgMenuMsgId);
  if (msgEl && msgEl.dataset.texto) {
    navigator.clipboard.writeText(msgEl.dataset.texto).catch(() => {});
  }
});

menuEliminar.addEventListener('click', () => {
  msgMenu.classList.add('oculto');
  const msgEl = document.getElementById('msg-' + msgMenuMsgId);
  if (msgEl) msgEl.remove();
});

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function agregarMensajePropio(msgId, data) {
  const div = document.createElement('div');
  div.id = 'msg-' + msgId;
  div.classList.add('mensaje', 'propio');
  div.dataset.usuario = usuario;
  div.dataset.texto = data.texto || '';
  const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let replyHtml = '';
  if (data.respondiendoA) {
    replyHtml = `<div class="reply-quote"><div class="rq-user">${escapeHtml(data.respondiendoA.usuario)}</div><div class="rq-text">${escapeHtml(data.respondiendoA.texto)}</div></div>`;
  }

  let contenido = '';
  if (data.imagen) {
    contenido += `<div class="duracion-audio">🖼️ Foto</div>`;
  } else if (data.audio) {
    contenido += `<div class="duracion-audio">🎤 ${data.audio.duracion || 0}s</div>`;
  } else {
    contenido += `<div class="texto">${escapeHtml(data.texto)}</div>`;
  }

  div.innerHTML = `
    ${replyHtml}
    ${contenido}
    <div class="hora-estado">
      <span class="hora">${ahora}</span>
      <span class="estado-msg" id="estado-${msgId}"><span class="tick-enviando">⏳</span></span>
    </div>
  `;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  mensajesEnviados.set(msgId, div);
  agregarEventosMensaje(div, msgId, data);
}

function agregarEventosMensaje(div, msgId, data) {
  let toques = 0;
  let timeoutDobleTap = null;

  div.addEventListener('click', () => {
    toques++;
    if (toques === 1) {
      timeoutDobleTap = setTimeout(() => { toques = 0; }, 300);
    } else if (toques === 2) {
      clearTimeout(timeoutDobleTap);
      toques = 0;
      socket.emit('reaccion', { sala, msgId, usuario, reaccion: '❤️' });
      mostrarReaccion(div, '❤️');
    }
  });

  let longPressTimer = null;
  div.addEventListener('pointerdown', (e) => {
    longPressTimer = setTimeout(() => {
      abrirMenuMensaje(msgId, div);
    }, 500);
  });
  div.addEventListener('pointerup', () => clearTimeout(longPressTimer));
  div.addEventListener('pointerleave', () => clearTimeout(longPressTimer));
  div.addEventListener('pointercancel', () => clearTimeout(longPressTimer));
}

function abrirMenuMensaje(msgId, div) {
  msgMenuMsgId = msgId;
  menuEliminar.classList.toggle('oculto', div.dataset.usuario !== usuario);
  msgMenu.classList.remove('oculto');
  emojiPicker.classList.add('oculto');
  attachMenu.classList.add('oculto');
}

function mostrarReaccion(div, emoji) {
  let reaccionEl = div.querySelector('.reaccion');
  if (!reaccionEl) {
    reaccionEl = document.createElement('div');
    reaccionEl.classList.add('reaccion');
    div.appendChild(reaccionEl);
  }
  reaccionEl.textContent = emoji;
  reaccionEl.style.animation = 'none';
  void reaccionEl.offsetWidth;
  reaccionEl.style.animation = 'reaccionAparicion 0.3s ease';
  clearTimeout(reaccionEl._timeout);
  reaccionEl._timeout = setTimeout(() => {
    if (reaccionEl) reaccionEl.remove();
  }, 3000);
}

socket.on('mensaje', (data) => {
  if (data.usuario === usuario) return;

  const div = document.createElement('div');
  div.id = 'msg-' + data.msgId;
  div.classList.add('mensaje');
  div.classList.add('otro');
  div.dataset.usuario = data.usuario;
  div.dataset.texto = data.texto || '';
  const esSistema = data.usuario === '📢 Sistema';
  if (esSistema) div.classList.add('sistema');

  let replyHtml = '';
  if (data.respondiendoA) {
    replyHtml = `<div class="reply-quote"><div class="rq-user">${escapeHtml(data.respondiendoA.usuario)}</div><div class="rq-text">${escapeHtml(data.respondiendoA.texto)}</div></div>`;
  }

  let contenido = '';
  if (data.imagen) {
    const src = 'data:' + data.imagen.type + ';base64,' + data.imagen.data;
    contenido += `<img src="${src}" class="imagen-msg" loading="lazy">`;
  }
  if (data.audio) {
    const src = 'data:' + data.audio.type + ';base64,' + data.audio.data;
    contenido += `<audio controls src="${src}" class="audio-msg"></audio><div class="duracion-audio">🎤 ${data.audio.duracion || 0}s</div>`;
  }
  if (data.texto) {
    contenido += `<div class="texto">${escapeHtml(data.texto)}</div>`;
  }

  div.innerHTML = `
    ${esSistema ? '' : `<div class="usuario">${data.usuario}</div>`}
    ${replyHtml}
    ${contenido}
    <div class="hora">${data.hora}</div>
  `;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  mensajesEnviados.set(data.msgId, div);
  agregarEventosMensaje(div, data.msgId, data);

  if (!esSistema && document.hidden && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
    let cuerpo = data.texto;
    if (data.audio) cuerpo = '🎤 Audio (' + (data.audio.duracion || 0) + 's)';
    else if (data.imagen) cuerpo = '🖼️ Foto';
    navigator.serviceWorker.controller.postMessage({
      tipo: 'notificacion', titulo: '❤️ ' + data.usuario, cuerpo, tag: 'chat-' + data.msgId
    });
  }
});

socket.on('estado-msg', (data) => {
  const estadoEl = document.getElementById('estado-' + data.msgId);
  if (!estadoEl) return;
  if (data.estado === 'enviado') {
    estadoEl.innerHTML = '<span class="tick">✓</span>';
  } else if (data.estado === 'entregado') {
    estadoEl.innerHTML = '<span class="tick doble">✓✓</span>';
  } else if (data.estado === 'visto') {
    estadoEl.innerHTML = '<span class="tick doble visto">❤️</span>';
  }
});

socket.on('reaccion', (data) => {
  const div = document.getElementById('msg-' + data.msgId);
  if (div) mostrarReaccion(div, data.reaccion);
});

socket.on('escribiendo', (data) => {
  if (data.usuario && data.usuario !== usuario) {
    escribiendoDiv.textContent = data.usuario + ' está escribiendo... 💕';
  } else {
    escribiendoDiv.textContent = '';
  }
});

const salaGuardada = localStorage.getItem('chat-sala');
const usuarioGuardado = localStorage.getItem('chat-usuario');
if (salaGuardada && usuarioGuardado) {
  sala = salaGuardada;
  usuario = usuarioGuardado;
  iniciarSesion();
}
