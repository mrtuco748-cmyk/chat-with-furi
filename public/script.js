const ICONS = {
  'heart': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'heart-filled': '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'paperclip': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>',
  'camera': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="12" r="4"/></svg>',
  'smile': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  'mic': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  'x': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  'image': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  'reply': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  'copy': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2 2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  'trash': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  'search': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  'arrow-left': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  'edit': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  'play': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  'pause': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  'more': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
  'log-out': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  'download': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  'moon': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
};

function injectIcons() { document.querySelectorAll('[data-icon]').forEach(el => { const n = el.dataset.icon; if (ICONS[n]) el.innerHTML = ICONS[n]; }); }

const socket = io({ reconnection: true, reconnectionAttempts: Infinity, reconnectionDelay: 1000, reconnectionDelayMax: 5000 });
let usuario = '', sala = '', escribiendoTimeout = null;
let mediaRecorder = null, audioChunks = [], grabando = false;
let tiempoGrabacion = 0, intervaloTiempo = null;
const mensajesEnviados = new Map();
let presente = false, respondiendoA = null, msgMenuMsgId = null;
let grabacionBloqueada = false, ultimaFecha = '';
let busquedaActiva = false, msgCount = 0, fotoCount = 0, audioCount = 0;
let quickReactionMsgId = null, editandoMsgId = null;
let selectMode = false, selectedMsgs = new Set();
let settings = { darkMode: false, sound: true, vibrate: true, notify: true };
let forwardQueue = [], linkPreviewCache = {};
let searchResults = [], searchIdx = -1;

const $ = id => document.getElementById(id);
const login = $('login'), chat = $('chat'), codigoInput = $('codigoInput'), nombreInput = $('nombreInput');
const entrarBtn = $('entrarBtn'), estadoConexion = $('estadoConexion'), headerEstado = $('headerEstado');
const mensajesDiv = $('mensajes'), mensajeInput = $('mensajeInput'), enviarBtn = $('enviarBtn');
const escribiendoDiv = $('escribiendo'), microfonoBtn2 = $('microfonoBtn2');
const grabandoDiv = $('grabando'), tiempoGrabacionSpan = $('tiempoGrabacion');
const cancelarGrabacion = $('cancelarGrabacion'), lockHint = $('lockHint');
const emojiBtn = $('emojiBtn'), emojiPicker = $('emojiPicker');
const attachBtn = $('attachBtn'), attachMenu = $('attachMenu'), attachOverlay = $('attachOverlay');
const replyBar = $('replyBar'), replyUser = $('replyUser'), replyText = $('replyText'), replyClose = $('replyClose');
const editBar = $('editBar'), editClose = $('editClose');
const msgMenu = $('msgMenu'), msgmenuOverlay = $('msgmenuOverlay');
const menuResponder = $('menuResponder'), menuCopiar = $('menuCopiar'), menuEliminar = $('menuEliminarPropio'), menuEliminarTodos = $('menuEliminarTodos'), menuEditar = $('menuEditar');
const menuInfo = $('menuInfo'), menuForward = $('menuForward');
const scrollBtn = $('scrollBtn'), camaraBtn = $('camaraBtn');
const wallpaperBtn = $('wallpaperBtn'), wallpaperMenu = $('wallpaperMenu'), wallpaperOverlay = $('wallpaperOverlay');
const searchBtn = $('searchBtn'), searchBar = $('searchBar'), searchInput = $('searchInput'), searchBack = $('searchBack'), searchCount = $('searchCount');
const searchUp = $('searchUp'), searchDown = $('searchDown');
const moreBtn = $('moreBtn'), moreMenu = $('moreMenu'), moreOverlay = $('moreOverlay');
const moreTheme = $('moreTheme'), moreSettings = $('moreSettings'), moreClearChat = $('moreClearChat'), moreExport = $('moreExport'), moreLogout = $('moreLogout');
const statsBtn = $('statsBtn'), statsModal = $('statsModal'), statsOverlay = $('statsOverlay'), statsSetDate = $('statsSetDate');
const statDias = $('statDias'), statMsgs = $('statMsgs'), statFotos = $('statFotos'), statAudios = $('statAudios');
const quickReactions = $('quickReactions');
const imgPreview = $('imagePreview'), imgPrevImage = $('imgPrevImage'), imgPrevOverlay = $('imgPrevOverlay'), imgPrevSend = $('imgPrevSend'), imgPrevCaption = $('imgPrevCaption');
const iv = $('imageViewer'), ivImg = $('ivImage'), ivInfo = $('ivInfo'), ivShareBtn = $('ivShareBtn'), ivCloseBtn = $('ivCloseBtn');
const stickerPicker = $('stickerPicker');
const msgInfoModal = $('msgInfoModal'), msgInfoOverlay = $('msgInfoOverlay'), msgInfoContent = $('msgInfoContent'), msgInfoClose = $('msgInfoClose');
const settingsModal = $('settingsModal'), settingsOverlay = $('settingsOverlay'), settingsClose = $('settingsClose');
const settingDarkMode = $('settingDarkMode'), settingSound = $('settingSound'), settingVibrate = $('settingVibrate'), settingNotify = $('settingNotify');
const settingsExport = $('settingsExport'), settingsClear = $('settingsClear');
const selectBar = $('selectBar'), selectClose = $('selectClose'), selectCount = $('selectCount'), selectDelete = $('selectDelete'), selectForward = $('selectForward');
const toggleSwitchTheme = $('themeIcon'), themeLabel = $('themeLabel');
let imgPreviewFile = null;

injectIcons();

const savedSettings = localStorage.getItem('chat-settings');
if (savedSettings) { try { settings = JSON.parse(savedSettings); } catch(e) {} }
if (settings.darkMode) { document.body.classList.add('dark'); }

entrarBtn.addEventListener('click', entrar);
codigoInput.addEventListener('keypress', e => { if (e.key === 'Enter') nombreInput.focus(); });
nombreInput.addEventListener('keypress', e => { if (e.key === 'Enter') entrar(); });
function entrar() {
  const codigo = codigoInput.value.trim(), nombre = nombreInput.value.trim();
  if (!codigo || !nombre) return;
  sala = codigo; usuario = nombre;
  localStorage.setItem('chat-sala', sala); localStorage.setItem('chat-usuario', usuario);
  iniciarSesion();
}
function iniciarSesion() {
  login.classList.add('oculto'); chat.classList.remove('oculto');
  mensajesDiv.innerHTML = ''; ultimaFecha = '';
  cargarMsgsLocal(); conectarAlSala(); mensajeInput.focus();
  registrarServiceWorker(); pedirPermisoNotificacion();
  construirEmojiPicker(); construirStickerPicker(); actualizarStats();
}
function conectarAlSala() {
  if (socket.connected) { socket.emit('unirse', { sala, usuario }); marcarPresente(); }
  else socket.once('connect', () => { socket.emit('unirse', { sala, usuario }); marcarPresente(); });
}
async function registrarServiceWorker() { if ('serviceWorker' in navigator) { try { await navigator.serviceWorker.register('/sw.js'); } catch (e) {} } }
function pedirPermisoNotificacion() { if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission(); }
function marcarPresente() { 
  presente = true; 
  socket.emit('presente', { usuario }); 
  headerEstado.textContent = 'en l\u00ednea'; 
  emitirLeidosPendientes();
}
function marcarAusente() { 
  presente = false; 
  socket.emit('ausente', { usuario }); 
}

let leidosTimer = null;
function emitirLeidosPendientes() {
  if (leidosTimer) clearTimeout(leidosTimer);
  leidosTimer = setTimeout(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
      const noLeidos = arr.filter(m => m.tipo === 'otro' && !m.leido);
      for (const m of noLeidos) {
        socket.emit('mensaje-leido', { msgId: m.msgId });
        m.leido = true;
      }
      if (noLeidos.length) localStorage.setItem(keyMsgs(), JSON.stringify(arr));
    } catch(e) {}
  }, 500);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { marcarPresente(); } else { marcarAusente(); headerEstado.textContent = 'ausente'; } });
window.addEventListener('focus', () => { marcarPresente(); emitirLeidosPendientes(); });
window.addEventListener('blur', () => { marcarAusente(); headerEstado.textContent = 'ausente'; });
socket.on('connect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; if (sala && usuario) conectarAlSala(); const d = escribiendoDiv.querySelector('.typing-dots'); if (d) d.style.display = 'none'; });
socket.on('disconnect', () => { estadoConexion.className = 'desconectado'; headerEstado.textContent = 'desconectado'; });
socket.io.on('reconnect_attempt', () => { estadoConexion.className = 'reconectando'; headerEstado.textContent = 'reconectando...'; });
socket.io.on('reconnect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; });
mensajeInput.addEventListener('input', () => {
  actualizarBotonEnvio(); socket.emit('escribiendo', { usuario });
  clearTimeout(escribiendoTimeout); escribiendoTimeout = setTimeout(() => socket.emit('escribiendo', { usuario: '' }), 1000);
});
function actualizarBotonEnvio() {
  if (grabacionBloqueada) return;
  if (mensajeInput.value.trim().length > 0) { microfonoBtn2.classList.add('oculto'); enviarBtn.classList.remove('oculto'); }
  else { microfonoBtn2.classList.remove('oculto'); enviarBtn.classList.add('oculto'); }
}
enviarBtn.addEventListener('click', enviarMensaje);
mensajeInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensaje(); } });
function enviarMensaje() {
  const texto = mensajeInput.value.trim(); if (!texto) return;
  try { if (settings.vibrate) vibrar(15); } catch(e) {}
  if (editandoMsgId) {
    const el = document.getElementById('msg-' + editandoMsgId);
    if (el && el.dataset.texto !== texto) {
      socket.emit('editar-msg', { msgId: editandoMsgId, sala, texto });
    }
    cancelarEditar();
    mensajeInput.value = ''; actualizarBotonEnvio(); mensajeInput.focus();
    return;
  }
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const d = { msgId, usuario, texto }; if (respondiendoA) d.respondiendoA = respondiendoA;
  socket.emit('mensaje', d);
  try { agregarMensajePropio(msgId, { usuario, texto, audio: null, imagen: null, respondiendoA }); } catch(e) {}
  mensajeInput.value = ''; actualizarBotonEnvio(); mensajeInput.focus();
  emojiPicker.classList.add('oculto'); cancelarReply();
  msgCount++; actualizarStats();
  if (settings.sound) { try { new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=').play().catch(()=>{}); } catch(e){} }
}
let grabacionCancelada = false, audioStartX = 0, audioStartY = 0;
let audioStream = null, audioTapTime = 0;

cancelarGrabacion.addEventListener('click', cancelarGrabacionFn);
function cancelarGrabacionFn(e) {
  if (e) e.stopPropagation();
  grabacionCancelada = true;
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  else limpiarGrabacionUI();
}
microfonoBtn2.addEventListener('pointerdown', async (e) => {
  if (grabando) {
    if (grabacionBloqueada) {
      e.preventDefault();
      grabacionCancelada = false;
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    }
    return;
  }
  e.preventDefault();
  grabacionCancelada = false;
  grabacionBloqueada = false;
  audioStartX = e.clientX;
  audioStartY = e.clientY;
  audioTapTime = Date.now();
  await iniciarGrabacion();
});
document.addEventListener('pointermove', (e) => {
  if (!grabando || grabacionBloqueada) return;
  const dy = audioStartY - e.clientY;
  const dx = e.clientX - audioStartX;
  if (dy > 60) {
    entrarModoBloqueado();
  } else if (dx < -80) {
    cancelarGrabacionFn();
    mostrarToast('Grabaci\u00F3n cancelada');
  }
});
document.addEventListener('pointerup', (e) => {
  if (!grabando || grabacionBloqueada) return;
  if (Date.now() - audioTapTime < 300) {
    entrarModoBloqueado();
  } else if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
});
function entrarModoBloqueado() {
  grabacionBloqueada = true;
  microfonoBtn2.innerHTML = ICONS['heart'];
  lockHint.innerHTML = '🔒 bloqueado';
  vibrar(20);
}
async function iniciarGrabacion() {
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
    mediaRecorder = new MediaRecorder(audioStream, { mimeType: mime });
    audioChunks = []; grabando = true; grabacionBloqueada = false; tiempoGrabacion = 0;
    vibrar(30); lockHint.innerHTML = '&uarr; bloquear';
    grabandoDiv.classList.remove('oculto'); scrollBtnBottom(); tiempoGrabacionSpan.textContent = '0s';
    intervaloTiempo = setInterval(() => { tiempoGrabacion++; tiempoGrabacionSpan.textContent = tiempoGrabacion + 's'; }, 1000);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
      clearInterval(intervaloTiempo);
      if (audioStream) { audioStream.getTracks().forEach(t => t.stop()); audioStream = null; }
      if (tiempoGrabacion >= 1 && !grabacionCancelada) {
        const b = new Blob(audioChunks, { type: mediaRecorder.mimeType });
        enviarAudio(b);
      }
      limpiarGrabacionUI();
    };
    mediaRecorder.start();
  } catch (err) { alert('No se pudo acceder al micr\u00f3fono'); }
}
function limpiarGrabacionUI() {
  grabando = false; grabacionBloqueada = false; grabacionCancelada = false;
  tiempoGrabacion = 0; clearInterval(intervaloTiempo);
  grabandoDiv.classList.add('oculto'); scrollBtnBottom();
  microfonoBtn2.innerHTML = ICONS['mic'];
  actualizarBotonEnvio();
}
function enviarAudio(blob) {
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => {
    const b64 = r.result; const b = b64.split(',')[1];
    socket.emit('mensaje', { msgId, usuario, texto: '', audio: { data: b, type: blob.type, duracion: tiempoGrabacion }, respondiendoA });
    agregarMensajePropio(msgId, { usuario, texto: '', audio: { data: b64, type: blob.type, duracion: tiempoGrabacion }, imagen: null, respondiendoA });
    if (respondiendoA) cancelarReply(); audioCount++; actualizarStats();
  }; r.readAsDataURL(blob);
}

const EMOJI_CATS = [
  { name:'Caritas', i:'😊', e:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😉','😊','😇','🥰','😍','🤩','😘','😗','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','😮','😯','😲','😳','🥺','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'] },
  { name:'Corazones', i:'❤️', e:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','💌','💋','💑','💏','👩‍❤️‍👨'] },
  { name:'Manos', i:'👋', e:['👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪'] },
  { name:'Celebracion', i:'🎉', e:['🎉','🎊','🎈','🎁','🎀','🎃','🎄','🎆','🎇','✨','🎓','🏆','🥇','🥈','🥉','🏅','🎯','🎲','🎮','🎸','🎺','🎻','🎤','🎧','🎼'] },
  { name:'Comida', i:'🍕', e:['🍕','🍔','🌭','🥪','🌮','🌯','🥙','🥟','🍿','🥗','🥘','🍜','🍝','🍣','🍤','🍱','🥡','🍦','🍩','🍪','🎂','🍰','🧁','🍫','🍬','🍭','🍼','☕','🍵','🧃','🥤','🍺','🍻','🥂','🥃','🍷'] },
  { name:'Actividades', i:'⚽', e:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🥊','🎽','🛹','🛼','🚴','🤼','🤸','🤺','⛸️','🎣','🎿','⛷️','🏄','🏊','🤿','🥌'] }
];
function construirEmojiPicker() {
  emojiPicker.innerHTML = '';
  const tabs = document.createElement('div'); tabs.className = 'emoji-tabs';
  const panels = document.createElement('div'); panels.className = 'emoji-panels';
  EMOJI_CATS.forEach((cat, idx) => {
    const tab = document.createElement('button'); tab.className = 'emoji-tab'; tab.textContent = cat.i;
    tab.dataset.idx = idx; tab.addEventListener('click', () => mostrarCat(idx));
    tabs.appendChild(tab);
    const panel = document.createElement('div'); panel.className = 'emoji-panel';
    cat.e.forEach(em => {
      const btn = document.createElement('button'); btn.textContent = em;
      btn.addEventListener('click', () => { mensajeInput.value += em; mensajeInput.focus(); actualizarBotonEnvio(); });
      panel.appendChild(btn);
    });
    panels.appendChild(panel);
  });
  emojiPicker.appendChild(tabs); emojiPicker.appendChild(panels);
  function mostrarCat(idx) {
    tabs.querySelectorAll('.emoji-tab').forEach(t => t.classList.toggle('activo', +t.dataset.idx === idx));
    panels.querySelectorAll('.emoji-panel').forEach((p, i) => p.classList.toggle('oculto', i !== idx));
  }
  mostrarCat(0);
}
emojiBtn.addEventListener('click', () => { $('attachMenu').classList.add('oculto'); $('msgMenu').classList.add('oculto'); $('wallpaperMenu').classList.add('oculto'); emojiPicker.classList.toggle('oculto'); });
attachBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); $('msgMenu').classList.add('oculto'); $('wallpaperMenu').classList.add('oculto'); attachMenu.classList.remove('oculto'); });
attachOverlay.addEventListener('click', () => attachMenu.classList.add('oculto'));
msgmenuOverlay.addEventListener('click', () => msgMenu.classList.add('oculto'));
wallpaperBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); msgMenu.classList.add('oculto'); wallpaperMenu.classList.remove('oculto'); });
wallpaperOverlay.addEventListener('click', () => wallpaperMenu.classList.add('oculto'));
document.querySelectorAll('.wp-opt').forEach(btn => { btn.addEventListener('click', () => { document.body.className = 'wallpaper-' + btn.dataset.wp; wallpaperMenu.classList.add('oculto'); localStorage.setItem('chat-wallpaper', btn.dataset.wp); }); });
moreBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); msgMenu.classList.add('oculto'); moreMenu.classList.toggle('oculto'); });
moreOverlay.addEventListener('click', () => moreMenu.classList.add('oculto'));
moreLogout.addEventListener('click', () => { localStorage.removeItem('chat-sala'); localStorage.removeItem('chat-usuario'); localStorage.removeItem('chat-msgs-'+sala); location.reload(); });
moreTheme.addEventListener('click', () => { toggleDarkMode(); moreMenu.classList.add('oculto'); });
moreSettings.addEventListener('click', () => { moreMenu.classList.add('oculto'); settingsModal.classList.remove('oculto'); });
moreClearChat.addEventListener('click', () => { moreMenu.classList.add('oculto'); if (confirm('\u00BFVaciar chat?')) limpiarChat(); });
moreExport.addEventListener('click', () => { moreMenu.classList.add('oculto'); exportarChat(); });
const wpGuardado = localStorage.getItem('chat-wallpaper'); if (wpGuardado) document.body.className = 'wallpaper-' + wpGuardado;
document.querySelectorAll('.attach-option').forEach(btn => { btn.addEventListener('click', () => { attachMenu.classList.add('oculto'); if (btn.dataset.tipo === 'camara') abrirCamara(); else if (btn.dataset.tipo === 'galeria') abrirGaleria(); else if (btn.dataset.tipo === 'sticker') stickerPicker.classList.remove('oculto'); }); });
function abrirCamara() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.capture = 'environment'; i.addEventListener('change', e => { if (e.target.files?.[0]) mostrarPreviewImagen(e.target.files[0]); }); i.click(); }
function abrirGaleria() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.addEventListener('change', e => { if (e.target.files?.[0]) mostrarPreviewImagen(e.target.files[0]); }); i.click(); }
function mostrarPreviewImagen(file) {
  imgPreviewFile = file; imgPrevCaption.value = '';
  const r = new FileReader();
  r.onloadend = () => { imgPrevImage.src = r.result; imgPreview.classList.remove('oculto'); };
  r.readAsDataURL(file);
}
function cerrarPreviewImagen() { imgPreview.classList.add('oculto'); imgPrevImage.src = ''; imgPreviewFile = null; }
imgPrevOverlay.addEventListener('click', cerrarPreviewImagen);
imgPrevSend.addEventListener('click', () => { if (imgPreviewFile) enviarImagen(imgPreviewFile); cerrarPreviewImagen(); });
function enviarImagen(file) {
  const caption = imgPrevCaption.value.trim();
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => { const b64 = r.result; const b = b64.split(',')[1]; socket.emit('mensaje', { msgId, usuario, texto: caption, imagen: { data: b, type: file.type }, respondiendoA }); agregarMensajePropio(msgId, { usuario, texto: caption, audio: null, imagen: { data: b64, type: file.type }, respondiendoA }); if (respondiendoA) cancelarReply(); fotoCount++; actualizarStats(); };
  r.readAsDataURL(file);
}
replyClose.addEventListener('click', cancelarReply);
function scrollBtnBottom() {
  let b = 64;
  if (!replyBar.classList.contains('oculto')) b += 40;
  if (!editBar.classList.contains('oculto')) b += 40;
  if (!grabandoDiv.classList.contains('oculto')) b += 40;
  scrollBtn.style.bottom = b + 'px';
}
function iniciarReply(data) { respondiendoA = { msgId: data.msgId, usuario: data.usuarioUsuario || data.usuario, texto: data.texto }; replyUser.textContent = respondiendoA.usuario; replyText.textContent = respondiendoA.texto || (data.audio ? 'Audio' : (data.imagen ? 'Foto' : '')) || 'Mensaje'; replyBar.classList.remove('oculto'); scrollBtnBottom(); mensajeInput.focus(); }
function cancelarReply() { respondiendoA = null; replyBar.classList.add('oculto'); scrollBtnBottom(); }
menuResponder.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el) iniciarReply({ msgId: msgMenuMsgId, usuario: el.dataset.usuario, texto: el.dataset.texto }); });
menuCopiar.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el?.dataset.texto) navigator.clipboard.writeText(el.dataset.texto).catch(() => {}); });
menuEliminar.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el) el.remove(); });
menuEliminarTodos.addEventListener('click', () => { msgMenu.classList.add('oculto'); socket.emit('eliminar-msg', { msgId: msgMenuMsgId, sala }); const el = document.getElementById('msg-' + msgMenuMsgId); if (el) el.remove(); });
menuEditar.addEventListener('click', () => {
  msgMenu.classList.add('oculto');
  const el = document.getElementById('msg-' + msgMenuMsgId);
  if (!el?.dataset?.texto) return;
  editandoMsgId = msgMenuMsgId;
  mensajeInput.value = el.dataset.texto;
  mensajeInput.focus(); actualizarBotonEnvio();
  editBar.classList.remove('oculto'); scrollBtnBottom();
});
function cancelarEditar() {
  editandoMsgId = null; editBar.classList.add('oculto');
  mensajeInput.value = ''; actualizarBotonEnvio(); scrollBtnBottom();
}
editClose.addEventListener('click', cancelarEditar);
menuInfo.addEventListener('click', () => { msgMenu.classList.add('oculto'); mostrarInfoMensaje(msgMenuMsgId); });
menuForward.addEventListener('click', () => { msgMenu.classList.add('oculto'); forwardQueue = [msgMenuMsgId]; mostrarForwardPicker(); });

const STICKERS = ['😀','😂','🥰','😍','❤️','🔥','💕','✨','😢','😮','🙏','🎉','😈','🤗','💀','👋','👍','👎','✌️','🤞','💪','🌹','🌸','💖','🌟','⭐','🦋','🐱','🐶','🦊','🐼','🐸','🌈','🍀','🎀','🎁','🎂','🍰','☕','🍕','🍔','🌮','🍣','🍩','🍪','🧁','🍫','🍭','🍬','🍷','🥂','🍺','🍻','☕','🧃'];
function construirStickerPicker() {
  const panel = stickerPicker.querySelector('.sticker-panel');
  if (!panel) return;
  panel.innerHTML = '';
  STICKERS.forEach(s => {
    const btn = document.createElement('button'); btn.className = 'sticker-btn'; btn.textContent = s; btn.dataset.sticker = s;
    btn.addEventListener('click', () => {
      stickerPicker.classList.add('oculto');
      const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      socket.emit('mensaje', { msgId, usuario, texto: s, respondiendoA });
      agregarMensajePropio(msgId, { usuario, texto: s, audio: null, imagen: null, respondiendoA });
      if (respondiendoA) cancelarReply();
      msgCount++; actualizarStats();
    });
    panel.appendChild(btn);
  });
}

searchBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); msgMenu.classList.add('oculto'); searchBar.classList.remove('oculto'); searchInput.focus(); busquedaActiva = true; });
searchBack.addEventListener('click', cerrarBusqueda);
searchInput.addEventListener('input', buscarMensajes);
searchUp.addEventListener('click', () => navegarBusqueda(-1));
searchDown.addEventListener('click', () => navegarBusqueda(1));
function cerrarBusqueda() { searchBar.classList.add('oculto'); searchInput.value = ''; busquedaActiva = false; document.querySelectorAll('.msg-resaltado').forEach(el => el.classList.remove('msg-resaltado')); searchCount.textContent = ''; searchResults = []; searchIdx = -1; }
function buscarMensajes() {
  document.querySelectorAll('.msg-resaltado').forEach(el => el.classList.remove('msg-resaltado'));
  const q = searchInput.value.toLowerCase().trim();
  if (!q) { searchCount.textContent = ''; searchResults = []; searchIdx = -1; return; }
  searchResults = [...mensajesDiv.querySelectorAll('.mensaje:not(.sistema)')].filter(m => (m.dataset.texto || '').toLowerCase().includes(q));
  searchIdx = searchResults.length > 0 ? 0 : -1;
  searchResults.forEach(m => m.classList.add('msg-resaltado'));
  searchCount.textContent = searchResults.length + ' resulta' + (searchResults.length !== 1 ? 'dos' : 'do');
  if (searchResults.length > 0) searchResults[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  actualizarNavBusqueda();
}
function navegarBusqueda(dir) {
  if (searchResults.length === 0) return;
  searchIdx = (searchIdx + dir + searchResults.length) % searchResults.length;
  searchResults.forEach(m => m.classList.remove('msg-resaltado'));
  searchResults[searchIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
  searchResults[searchIdx].classList.add('msg-resaltado');
  actualizarNavBusqueda();
}
function actualizarNavBusqueda() {
  searchUp.disabled = searchResults.length <= 1;
  searchDown.disabled = searchResults.length <= 1;
}

scrollBtn.addEventListener('click', () => mensajesDiv.scrollTo({ top: mensajesDiv.scrollHeight, behavior: 'smooth' }));
mensajesDiv.addEventListener('scroll', () => { scrollBtn.classList.toggle('oculto', mensajesDiv.scrollHeight - mensajesDiv.scrollTop - mensajesDiv.clientHeight < 100); });
camaraBtn.addEventListener('click', abrirCamara);

mensajesDiv.addEventListener('click', e => {
  const img = e.target.closest('.imagen-msg');
  if (img) abrirVisorImagen(img.currentSrc || img.src, img.closest('.mensaje')?.dataset?.usuario || '');
});
$('ivOverlay').addEventListener('click', cerrarVisorImagen);
ivCloseBtn.addEventListener('click', cerrarVisorImagen);
ivShareBtn.addEventListener('click', () => {
  if (ivImg.src && navigator.share) {
    navigator.share({ title: 'Furi Chat', text: 'Compartir imagen', url: ivImg.src }).catch(() => {});
  }
});
let ivZoom = 1, ivPinchDist = 0;
ivImg.addEventListener('touchstart', e => {
  if (e.touches.length === 2) { ivPinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); }
});
ivImg.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    ivZoom = Math.max(1, Math.min(5, ivZoom * (d / ivPinchDist)));
    ivPinchDist = d;
    ivImg.style.transform = 'scale(' + ivZoom + ')';
    ivImg.classList.toggle('zoomed', ivZoom > 1);
  }
}, { passive: false });
ivImg.addEventListener('click', () => { if (ivZoom > 1) { ivZoom = 1; ivImg.style.transform = ''; ivImg.classList.remove('zoomed'); } else cerrarVisorImagen(); });
function abrirVisorImagen(src, usuario) {
  ivImg.src = src; ivZoom = 1; ivImg.style.transform = ''; ivImg.classList.remove('zoomed');
  ivInfo.textContent = usuario ? 'Enviado por ' + usuario : '';
  iv.classList.remove('oculto');
}
function cerrarVisorImagen() { iv.classList.add('oculto'); ivImg.src = ''; ivZoom = 1; ivImg.style.transform = ''; }

statsBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); wallpaperMenu.classList.add('oculto'); statsModal.classList.remove('oculto'); });
statsOverlay.addEventListener('click', () => statsModal.classList.add('oculto'));
statsSetDate.addEventListener('click', () => { const d = prompt('Ingres\u00E1 la fecha que empezaron (DD/MM/AAAA):'); if (d) { localStorage.setItem('chat-fecha-inicio', d); actualizarStats(); } });
function actualizarStats() {
  const fi = localStorage.getItem('chat-fecha-inicio');
  if (fi) { const p = fi.split('/'); const f = new Date(p[2], p[1]-1, p[0]); const h = new Date(); const d = Math.floor((h - f) / 86400000); statDias.textContent = d >= 0 ? d : 0; }
  statMsgs.textContent = msgCount; statFotos.textContent = fotoCount; statAudios.textContent = audioCount;
}

document.querySelectorAll('.qr-emoji').forEach(el => { el.addEventListener('click', () => { vibrar(10); if (quickReactionMsgId) { socket.emit('reaccion', { sala, msgId: quickReactionMsgId, usuario, reaccion: el.dataset.reaccion }); const d = document.getElementById('msg-' + quickReactionMsgId); if (d) mostrarReaccion(d, el.dataset.reaccion); } quickReactions.classList.add('oculto'); }); });

function mostrarToast(texto, duracion) {
  duracion = duracion || 2500;
  const c = $('toastContainer');
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = texto;
  c.appendChild(t);
  setTimeout(() => { t.style.animation = 'toastOut 0.25s ease forwards'; setTimeout(() => t.remove(), 250); }, duracion);
}

function vibrar(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e) {} }

function keyMsgs() { return 'chat-msgs-' + sala; }
function guardarMsgLocal(m) {
  try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); arr.push(m); localStorage.setItem(keyMsgs(), JSON.stringify(arr)); } catch(e) {}
}
function cargarMsgsLocal() {
  mensajesDiv.innerHTML = ''; ultimaFecha = ''; msgCount = 0; fotoCount = 0; audioCount = 0;
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    for (const m of arr) {
      if (m.tipo === 'propio') {
        renderMsgPropio(m);
        const div = document.getElementById('msg-'+m.msgId);
        if (div) {
          const estadoSpan = document.createElement('span'); estadoSpan.className = 'estado-msg'; estadoSpan.id = 'estado-'+m.msgId;
          estadoSpan.innerHTML = '<span class="tick doble visto">\u2713\u2713</span>';
          div.querySelector('.hora-estado')?.appendChild(estadoSpan);
          mensajesEnviados.set(m.msgId, div);
          agregarEventosMensaje(div, m.msgId, m);
        }
      }
      else if (m.tipo === 'otro') renderMsgOtro(m);
      else if (m.tipo === 'sistema') { const d = document.createElement('div'); d.classList.add('mensaje','sistema'); d.textContent = m.texto; mensajesDiv.appendChild(d); }
      if (m.tipo !== 'sistema') { msgCount++; if (m.imagen) fotoCount++; if (m.audio) audioCount++; }
    }
  } catch(e) {}
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}
function htmlPlayerAudio(src, dur) {
  const d = dur || 0; const m = Math.floor(d/60); const s = Math.floor(d%60);
  return '<div class="audio-player" data-src="'+src+'" data-dur="'+d+'">'+
    '<button class="ap-play" data-icon="play"></button>'+
    '<div class="ap-wave"><div class="ap-progress"></div></div>'+
    '<span class="ap-time">'+m+':'+(s<10?'0':'')+s+'</span>'+
    '<button class="ap-speed">1x</button>'+
  '</div>';
}
function initAudioPlayers(container) {
  injectIconsIn(container);
  container.querySelectorAll('.audio-player').forEach(el => {
    if (el.dataset.inited) return; el.dataset.inited = '1';
    const audio = new Audio(el.dataset.src); audio.preload = 'metadata';
    const playBtn = el.querySelector('.ap-play'), progress = el.querySelector('.ap-progress');
    const timeEl = el.querySelector('.ap-time'), speedBtn = el.querySelector('.ap-speed');
    audio.addEventListener('loadedmetadata', () => {
      const dur = audio.duration || el.dataset.dur;
      const m = Math.floor(dur/60), s = Math.floor(dur%60);
      timeEl.textContent = m+':'+(s<10?'0':'')+s;
    });
    playBtn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); playBtn.dataset.icon = 'pause'; }
      else { audio.pause(); playBtn.dataset.icon = 'play'; }
      injectIconsIn(playBtn);
    });
    audio.addEventListener('timeupdate', () => {
      const pct = (audio.currentTime / (audio.duration || el.dataset.dur)) * 100;
      progress.style.width = Math.min(pct, 100) + '%';
      const m = Math.floor(audio.currentTime/60), s = Math.floor(audio.currentTime%60);
      timeEl.textContent = m+':'+(s<10?'0':'')+s;
    });
    audio.addEventListener('ended', () => { playBtn.dataset.icon = 'play'; injectIconsIn(playBtn); progress.style.width = '0'; });
    el.querySelector('.ap-wave').addEventListener('click', e => {
      const r = el.querySelector('.ap-wave').getBoundingClientRect();
      const pct = (e.clientX - r.left) / r.width;
      audio.currentTime = pct * (audio.duration || el.dataset.dur);
    });
    speedBtn.addEventListener('click', () => {
      const speeds = [1, 1.5, 2]; const i = speeds.indexOf(audio.playbackRate);
      audio.playbackRate = speeds[(i+1) % speeds.length];
      speedBtn.textContent = audio.playbackRate + 'x';
    });
  });
}
function injectIconsIn(el) { el.querySelectorAll('[data-icon]').forEach(e => { const n = e.dataset.icon; if (ICONS[n]) e.innerHTML = ICONS[n]; }); }

function renderMsgPropio(m) {
  insertarSeparadorFecha(m.fecha);
  const div = document.createElement('div'); div.id = 'msg-'+m.msgId; div.classList.add('mensaje','propio');
  div.dataset.usuario = m.usuario; div.dataset.texto = m.texto||'';
  let rh='', c='';
  if (m.reenviado) div.dataset.reenviado = '1';
  if (m.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(m.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(m.respondiendoA.texto)+'</div></div>';
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c += '<img src="'+s+'" class="imagen-msg" loading="lazy">'; if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  else if (m.audio) {
    const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : '');
    c += htmlPlayerAudio(src, m.audio.duracion||0);
    if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>';
  }
  else c += '<div class="texto">'+formatearTexto(m.texto)+'</div>';
  if (m.reenviado) c = '<span class="msg-forward-tag">Reenviado</span>' + c;
  div.innerHTML = rh+c+'<div class="hora-estado"><span class="hora">'+(m.hora||'')+'</span></div>';
  mensajesDiv.appendChild(div);
  initAudioPlayers(div);
  if (m.linkPreview) mostrarLinkPreviewEnBurbuja(div, m.linkPreview);
}
function renderMsgOtro(m) {
  insertarSeparadorFecha(m.fecha);
  const div = document.createElement('div'); div.id = 'msg-'+m.msgId; div.classList.add('mensaje','otro');
  div.dataset.usuario = m.usuario; div.dataset.texto = m.texto||'';
  const esSistema = m.usuario === '\uD83D\uDCE2 Sistema';
  if (esSistema) div.classList.add('sistema');
  let rh='', c='';
  if (m.reenviado) div.dataset.reenviado = '1';
  if (m.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(m.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(m.respondiendoA.texto)+'</div></div>';
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c+='<img src="'+s+'" class="imagen-msg" loading="lazy">'; if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  if (m.audio) { const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : ''); c += htmlPlayerAudio(src, m.audio.duracion||0); if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  if (m.texto) c+='<div class="texto">'+formatearTexto(m.texto)+'</div>';
  if (m.reenviado) c = '<span class="msg-forward-tag">Reenviado</span>' + c;
  div.innerHTML = (esSistema?'':'<div class="usuario">'+m.usuario+'</div>')+rh+c+'<div class="hora">'+(m.hora||'')+'</div>';
  mensajesDiv.appendChild(div);
  initAudioPlayers(div);
  if (m.linkPreview) mostrarLinkPreviewEnBurbuja(div, m.linkPreview);
}

function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
function formatearTexto(text) {
  const urlRegex = /(https?:\/\/[^\s<]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s<]*)?)/g;
  const escaped = escapeHtml(text);
  return escaped.replace(/\*(.*?)\*/g, '<b>$1</b>').replace(/_(.*?)_/g, '<i>$1</i>').replace(/~(.*?)~/g, '<s>$1</s>').replace(urlRegex, m => { const u = m.startsWith('http') ? m : 'https://' + m; return '<a href="' + u + '" target="_blank" rel="noopener">' + m + '</a>'; });
}
function insertarSeparadorFecha(fechaMsg) {
  if (!fechaMsg) return;
  const d = new Date(fechaMsg);
  const c = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
  if (c !== ultimaFecha) { ultimaFecha = c;
    const sep = document.createElement('div'); sep.classList.add('separador-fecha');
    const h = new Date(d.getFullYear(),d.getMonth(),d.getDate());
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    if (d.getTime() === hoy.getTime()) sep.textContent = 'Hoy';
    else if (d.getTime() === new Date(hoy.getTime()-86400000).getTime()) sep.textContent = 'Ayer';
    else sep.textContent = d.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
    mensajesDiv.appendChild(sep);
  }
}

function agregarMensajePropio(msgId, data) {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  const fechaISO = ahora.toISOString();
  const m = { msgId, usuario, texto: data.texto||'', audio: data.audio||null, imagen: data.imagen||null, respondiendoA: data.respondiendoA||null, hora, fecha: fechaISO, tipo: 'propio' };
  guardarMsgLocal(m);
  renderMsgPropio(m);
  const div = document.getElementById('msg-'+msgId);
  if (div) {
    const estadoSpan = document.createElement('span'); estadoSpan.className = 'estado-msg'; estadoSpan.id = 'estado-'+msgId;
    estadoSpan.innerHTML = '<span class="tick-enviando">\u23F3</span>';
    div.querySelector('.hora-estado')?.appendChild(estadoSpan);
    mensajesEnviados.set(msgId, div); agregarEventosMensaje(div, msgId, data);
  }
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

function agregarEventosMensaje(div, msgId, data) {
  let toques = 0, td = null;
  div.addEventListener('click', (e) => {
    if (selectMode) {
      e.stopPropagation();
      div.classList.toggle('seleccionado');
      if (div.classList.contains('seleccionado')) selectedMsgs.add(msgId);
      else selectedMsgs.delete(msgId);
      actualizarSelectCount();
      if (selectedMsgs.size === 0) salirSelectMode();
      return;
    }
    toques++; if (toques===1) td = setTimeout(()=>{toques=0;},300); else if (toques===2) { clearTimeout(td); toques=0; socket.emit('reaccion',{sala,msgId,usuario,reaccion:'\u2764\uFE0F'}); mostrarReaccion(div,'\u2764\uFE0F'); }
  });
  let lp = null;
  div.addEventListener('pointerdown', e => {
    if (selectMode) return;
    lp = setTimeout(() => {
      if (selectMode) return;
      vibrar(20);
      const r = div.getBoundingClientRect();
      quickReactions.style.top = (r.top - 50) + 'px';
      quickReactions.style.left = Math.min(r.left + r.width/2 - 100, window.innerWidth - 220) + 'px';
      quickReactionMsgId = msgId;
      quickReactions.classList.remove('oculto');
    }, 600);
  });
  div.addEventListener('pointerup', () => { clearTimeout(lp); if (!selectMode) limpiarSwipe(); });
  div.addEventListener('pointerleave', () => { clearTimeout(lp); });
  div.addEventListener('pointercancel', () => { clearTimeout(lp); });
  div.addEventListener('pointermove', e => { if (lp && e.movementX && Math.abs(e.movementX) > 8) clearTimeout(lp); });

  let sx = 0, swiping = false, animFrame = null;
  div.addEventListener('touchstart', e => { sx = e.touches[0].clientX; swiping = false; });
  div.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - sx;
    if (dx > 10 && !swiping) { swiping = true; clearTimeout(lp); e.preventDefault(); div.classList.add('swiping'); }
    if (swiping) {
      e.preventDefault(); cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => { div.style.boxShadow = 'inset ' + Math.min(dx, 60) + 'px 0 0 rgba(255,20,147,0.15)'; });
    }
  }, { passive: false });
  div.addEventListener('touchend', e => {
    cancelAnimationFrame(animFrame);
    const dx = e.changedTouches[0].clientX - sx;
    if (dx > 50 && !selectMode) { iniciarReply({ msgId, usuario: data.usuario, texto: data.texto }); mostrarToast('Respondiendo...'); }
    div.classList.remove('swiping'); div.style.boxShadow = ''; swiping = false;
  });
  div.addEventListener('touchcancel', () => { cancelAnimationFrame(animFrame); div.classList.remove('swiping'); div.style.boxShadow = ''; swiping = false; });
}

function abrirMenuMensaje(msgId, div) {
  if (selectMode) return;
  msgMenuMsgId = msgId;
  const propio = div.dataset.usuario === usuario;
  const txt = !!div.dataset.texto;
  menuEditar.classList.toggle('oculto', !(propio && txt));
  menuEliminar.classList.toggle('oculto', !propio);
  menuEliminarTodos.classList.toggle('oculto', !propio);
  msgMenu.classList.remove('oculto'); emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto');
}
function mostrarReaccion(div, emoji) {
  let r = div.querySelector('.reaccion');
  if (!r) { r = document.createElement('div'); r.classList.add('reaccion'); div.appendChild(r); }
  r.textContent = emoji; r.style.animation = 'none'; void r.offsetWidth; r.style.animation = 'reaccionAparicion 0.35s ease';
  clearTimeout(r._t); r._t = setTimeout(()=>r?.remove(), 3000);
}

socket.on('mensaje', (data) => {
  try {
    if (data.usuario === usuario) return;
    const esSistema = data.usuario === '\uD83D\uDCE2 Sistema';
    const chatVisible = !document.hidden;
    const mData = { msgId: data.msgId, usuario: data.usuario, texto: data.texto||'', hora: data.hora, fecha: new Date().toISOString(), tipo: esSistema ? 'sistema' : 'otro', leido: chatVisible };
    if (data.respondiendoA) mData.respondiendoA = data.respondiendoA;
    if (data.imagen) mData.imagen = { data: 'data:'+data.imagen.type+';base64,'+data.imagen.data, type: data.imagen.type };
    if (data.audio) mData.audio = { data: 'data:'+data.audio.type+';base64,'+data.audio.data, type: data.audio.type, duracion: data.audio.duracion };
    if (data.reenviado) mData.reenviado = true;
    guardarMsgLocal(mData);
    if (esSistema) { const d = document.createElement('div'); d.classList.add('mensaje','sistema'); d.textContent = data.texto; mensajesDiv.appendChild(d); mensajesDiv.scrollTop = mensajesDiv.scrollHeight; return; }
    renderMsgOtro(mData);
    const div = document.getElementById('msg-'+data.msgId);
    if (div) { agregarEventosMensaje(div, data.msgId, data); mensajesEnviados.set(data.msgId, div); }
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
    if (!esSistema && data.texto && /https?:\/\/[^\s]+/.test(data.texto)) {
      obtenerLinkPreview(data.texto).then(p => { if (p) { mData.linkPreview = p; const d2 = document.getElementById('msg-'+data.msgId); if (d2) mostrarLinkPreviewEnBurbuja(d2, p); } });
    }
    if (chatVisible) {
      socket.emit('mensaje-leido', { msgId: data.msgId });
    } else if ('serviceWorker' in navigator && navigator.serviceWorker.controller && settings.notify) {
      let cuerpo = data.texto; if (data.audio) cuerpo = 'Audio ('+(data.audio.duracion||0)+'s)'; else if (data.imagen) cuerpo = 'Foto';
      navigator.serviceWorker.controller.postMessage({ tipo:'notificacion', titulo:'\u2764\uFE0F '+data.usuario, cuerpo, tag:'chat-'+data.msgId });
    }
  } catch(e) {}
});
socket.on('estado-msg', (data) => { const el = document.getElementById('estado-'+data.msgId); if (!el) return; if (data.estado==='enviado') el.innerHTML = '<span class="tick">\u2713</span>'; else if (data.estado==='entregado') el.innerHTML = '<span class="tick doble">\u2713\u2713</span>'; else if (data.estado==='visto') el.innerHTML = '<span class="tick doble visto">\u2713\u2713</span>'; });
socket.on('reaccion', (data) => { const d = document.getElementById('msg-'+data.msgId); if (d) mostrarReaccion(d, data.reaccion); });
socket.on('presencia', (data) => {
  if (data.presente) { headerEstado.textContent = 'en línea'; }
  else if (data.ultimaVez) {
    const d = new Date(data.ultimaVez);
    const hoy = new Date(); const ayer = new Date(hoy); ayer.setDate(ayer.getDate()-1);
    const hh = d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    if (d.toDateString() === hoy.toDateString()) headerEstado.textContent = 'últ. vez hoy a las ' + hh;
    else if (d.toDateString() === ayer.toDateString()) headerEstado.textContent = 'últ. vez ayer a las ' + hh;
    else headerEstado.textContent = 'últ. vez ' + d.toLocaleDateString('es-ES', { day:'numeric', month:'short' }) + ' a las ' + hh;
  } else {
    headerEstado.textContent = 'ausente';
  }
});
socket.on('editado-msg', (data) => {
  const el = document.getElementById('msg-' + data.msgId);
  if (!el) return;
  el.dataset.texto = data.texto;
  const txt = el.querySelector('.texto');
  if (txt) { txt.innerHTML = formatearTexto(data.texto); txt.classList.add('editado'); }
  if (!el.querySelector('.editado-tag')) {
    const tag = document.createElement('span'); tag.className = 'editado-tag'; tag.textContent = 'editado';
    el.querySelector('.hora')?.before(tag);
  }
  try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); const idx = arr.findIndex(m => m.msgId === data.msgId); if (idx>=0) { arr[idx].texto = data.texto; localStorage.setItem(keyMsgs(), JSON.stringify(arr)); } } catch(e) {}
});
socket.on('eliminado-msg', (data) => {
  const el = document.getElementById('msg-' + data.msgId);
  if (el) el.remove();
  try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); const nw = arr.filter(m => m.msgId !== data.msgId); localStorage.setItem(keyMsgs(), JSON.stringify(nw)); } catch(e) {}
});
socket.on('reenviado-msg', (data) => {
  if (data.usuario === usuario) return;
  const mData = { msgId: data.msgId, usuario: data.usuario, texto: data.texto||'', hora: data.hora, fecha: new Date().toISOString(), tipo: 'otro', reenviado: true };
  if (data.imagen) mData.imagen = { data: 'data:'+data.imagen.type+';base64,'+data.imagen.data, type: data.imagen.type };
  if (data.audio) mData.audio = { data: 'data:'+data.audio.type+';base64,'+data.audio.data, type: data.audio.type, duracion: data.audio.duracion };
  guardarMsgLocal(mData);
  renderMsgOtro(mData);
  const div = document.getElementById('msg-'+data.msgId);
  if (div) { agregarEventosMensaje(div, data.msgId, data); mensajesEnviados.set(data.msgId, div); }
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

socket.on('escribiendo', (data) => {
  const dots = escribiendoDiv.querySelector('.typing-dots');
  const texto = document.getElementById('escribiendoTexto');
  if (data.usuario && data.usuario !== usuario) {
    if (dots) dots.style.display = 'inline-flex';
    if (texto) texto.textContent = data.usuario + ' est\u00e1 escribiendo';
  } else {
    if (dots) dots.style.display = 'none';
    if (texto) texto.textContent = '';
  }
});

function toggleDarkMode() {
  settings.darkMode = !settings.darkMode;
  document.body.classList.toggle('dark', settings.darkMode);
  saveSettings();
  const icon = $('themeIcon'), label = $('themeLabel');
  if (icon) icon.dataset.icon = settings.darkMode ? 'moon' : 'heart';
  if (label) label.textContent = settings.darkMode ? 'Modo claro' : 'Modo oscuro';
  settingDarkMode.classList.toggle('activo', settings.darkMode);
  injectIcons();
}

function saveSettings() {
  localStorage.setItem('chat-settings', JSON.stringify(settings));
}

function limpiarChat() {
  mensajesDiv.innerHTML = ''; ultimaFecha = '';
  msgCount = 0; fotoCount = 0; audioCount = 0;
  localStorage.removeItem(keyMsgs());
  mensajesEnviados.clear();
  mostrarToast('Chat vaciado');
  actualizarStats();
  salirSelectMode();
}

function exportarChat() {
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    if (!arr.length) { mostrarToast('No hay mensajes para exportar'); return; }
    let txt = 'Furi Chat - Exportación\n';
    txt += 'Fecha: ' + new Date().toLocaleString('es-ES') + '\n';
    txt += 'Sala: ' + sala + '\n' + Array(30).join('=') + '\n\n';
    for (const m of arr) {
      if (m.tipo === 'sistema') txt += '[' + (m.fecha ? new Date(m.fecha).toLocaleString('es-ES') : '') + '] ' + m.texto + '\n';
      else {
        txt += '[' + (m.fecha ? new Date(m.fecha).toLocaleString('es-ES') : '') + '] ' + m.usuario + ': ';
        if (m.texto) txt += m.texto;
        else if (m.imagen) txt += '[Foto]' + (m.texto ? ': ' + m.texto : '');
        else if (m.audio) txt += '[Audio ' + (m.audio.duracion||0) + 's]';
        txt += '\n';
      }
    }
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'furi-chat-' + sala + '-' + Date.now() + '.txt';
    a.click(); URL.revokeObjectURL(url);
    mostrarToast('Chat exportado');
  } catch(e) { mostrarToast('Error al exportar'); }
}

function mostrarInfoMensaje(msgId) {
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    const m = arr.find(x => x.msgId === msgId);
    if (!m) return;
    const el = document.getElementById('msg-' + msgId);
    const estado = el?.querySelector('.estado-msg')?.textContent || '';
    let html = '';
    html += '<div class="msg-info-row"><span class="msg-info-label">Enviado</span><span class="msg-info-value">' + (m.fecha ? new Date(m.fecha).toLocaleString('es-ES') : '') + '</span></div>';
    if (m.tipo === 'propio') {
      let est = 'Enviando...';
      if (estado.includes('\u2713') && !estado.includes('\u2713\u2713')) est = 'Enviado';
      else if (estado.includes('\u2713\u2713') && !estado.includes('visto')) est = 'Entregado';
      else if (estado.includes('visto')) est = 'Visto';
      html += '<div class="msg-info-row"><span class="msg-info-label">Estado</span><span class="msg-info-value">' + est + '</span></div>';
    }
    if (m.imagen) html += '<div class="msg-info-row"><span class="msg-info-label">Tipo</span><span class="msg-info-value">Foto</span></div>';
    if (m.audio) html += '<div class="msg-info-row"><span class="msg-info-label">Tipo</span><span class="msg-info-value">Audio (' + (m.audio.duracion||0) + 's)</span></div>';
    if (m.texto) html += '<div class="msg-info-row"><span class="msg-info-label">Texto</span><span class="msg-info-value" style="max-width:200px;overflow:hidden;text-overflow:ellipsis">' + escapeHtml(m.texto) + '</span></div>';
    if (m.reenviado) html += '<div class="msg-info-row"><span class="msg-info-label">Reenviado</span><span class="msg-info-value">S\u00ED</span></div>';
    msgInfoContent.innerHTML = html;
    msgInfoModal.classList.remove('oculto');
  } catch(e) {}
}
msgInfoOverlay.addEventListener('click', () => msgInfoModal.classList.add('oculto'));
msgInfoClose.addEventListener('click', () => msgInfoModal.classList.add('oculto'));

function entrSelectMode(msgId) {
  selectMode = true;
  selectBar.classList.remove('oculto');
  selectedMsgs.clear();
  if (msgId) { selectedMsgs.add(msgId); document.getElementById('msg-'+msgId)?.classList.add('seleccionado'); }
  actualizarSelectCount();
  quickReactions.classList.add('oculto');
}
function salirSelectMode() {
  selectMode = false;
  selectBar.classList.add('oculto');
  document.querySelectorAll('.mensaje.seleccionado').forEach(el => el.classList.remove('seleccionado'));
  selectedMsgs.clear();
}
function actualizarSelectCount() {
  const n = selectedMsgs.size;
  selectCount.textContent = n + ' seleccionado' + (n !== 1 ? 's' : '');
}
selectClose.addEventListener('click', salirSelectMode);
selectDelete.addEventListener('click', eliminarSeleccionados);
selectForward.addEventListener('click', () => {
  forwardQueue = [...selectedMsgs];
  salirSelectMode();
  mostrarForwardPicker();
});
function eliminarSeleccionados() {
  if (selectedMsgs.size === 0) return;
  if (!confirm('\u00BFEliminar ' + selectedMsgs.size + ' mensaje' + (selectedMsgs.size !== 1 ? 's' : '') + ' seleccionado' + (selectedMsgs.size !== 1 ? 's' : '') + '?')) return;
  const ids = [...selectedMsgs];
  for (const id of ids) {
    socket.emit('eliminar-msg', { msgId: id, sala });
    const el = document.getElementById('msg-' + id);
    if (el) el.remove();
  }
  try {
    let arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    arr = arr.filter(m => !ids.includes(m.msgId));
    localStorage.setItem(keyMsgs(), JSON.stringify(arr));
  } catch(e) {}
  salirSelectMode();
  mostrarToast(ids.length + ' mensaje' + (ids.length !== 1 ? 's' : '') + ' eliminado' + (ids.length !== 1 ? 's' : ''));
}

function mostrarForwardPicker() {
  if (forwardQueue.length === 0) return;
  const texto = prompt('Reenviar ' + forwardQueue.length + ' mensaje' + (forwardQueue.length !== 1 ? 's' : '') + '. Agreg\u00E1 un comentario (opcional):');
  if (texto === null) { forwardQueue = []; return; }
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    for (const id of forwardQueue) {
      const m = arr.find(x => x.msgId === id);
      if (!m) continue;
      const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      const d = { msgId, usuario, texto: texto || m.texto || '', reenviado: true };
      if (m.imagen) d.imagen = { data: m.imagen.data, type: m.imagen.type };
      if (m.audio) d.audio = { data: m.audio.data, type: m.audio.type, duracion: m.audio.duracion };
      if (respondiendoA) d.respondiendoA = respondiendoA;
      socket.emit('mensaje', d);
      agregarMensajePropio(msgId, d);
      if (respondiendoA) cancelarReply();
      msgCount++; actualizarStats();
    }
    mostrarToast('Reenviado');
  } catch(e) {}
  forwardQueue = [];
}

async function obtenerLinkPreview(texto) {
  const match = texto.match(/https?:\/\/[^\s]+/);
  if (!match) return null;
  const url = match[0];
  if (linkPreviewCache[url]) return linkPreviewCache[url];
  try {
    const resp = await fetch('/api/link-preview?url=' + encodeURIComponent(url));
    if (!resp.ok) return null;
    const data = await resp.json();
    linkPreviewCache[url] = data;
    return data;
  } catch(e) { return null; }
}
function mostrarLinkPreviewEnBurbuja(div, preview) {
  if (!preview || !preview.title) return;
  const existing = div.querySelector('.link-preview');
  if (existing) return;
  const lp = document.createElement('div'); lp.className = 'link-preview';
  let h = '<a href="' + escapeHtml(preview.url) + '" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">';
  if (preview.image) h += '<div class="lp-img-container"><img src="' + escapeHtml(preview.image) + '" class="lp-img" alt="" loading="lazy" onerror="this.style.display=\'none\'"></div>';
  h += '<div class="lp-body">';
  if (preview.title) h += '<div class="lp-title">' + escapeHtml(preview.title) + '</div>';
  if (preview.description) h += '<div class="lp-desc">' + escapeHtml(preview.description.slice(0, 120)) + '</div>';
  h += '<div class="lp-url">' + escapeHtml(new URL(preview.url).hostname) + '</div>';
  h += '</div></a>';
  lp.innerHTML = h;
  const txt = div.querySelector('.texto');
  if (txt) txt.after(lp);
  else div.appendChild(lp);
}

settingsOverlay.addEventListener('click', () => settingsModal.classList.add('oculto'));
settingsClose.addEventListener('click', () => settingsModal.classList.add('oculto'));
settingDarkMode.addEventListener('click', toggleDarkMode);
settingSound.addEventListener('click', () => { settings.sound = !settings.sound; saveSettings(); settingSound.classList.toggle('activo', settings.sound); });
settingVibrate.addEventListener('click', () => { settings.vibrate = !settings.vibrate; saveSettings(); settingVibrate.classList.toggle('activo', settings.vibrate); });
settingNotify.addEventListener('click', () => { settings.notify = !settings.notify; saveSettings(); settingNotify.classList.toggle('activo', settings.notify); });
settingsExport.addEventListener('click', exportarChat);
settingsClear.addEventListener('click', () => { if (confirm('\u00BFVaciar chat?')) { limpiarChat(); settingsModal.classList.add('oculto'); } });
$('wpDarkToggle').addEventListener('click', () => { toggleDarkMode(); wallpaperMenu.classList.add('oculto'); });

document.querySelectorAll('.mensaje').forEach(el => { const m = el.querySelector('.texto'); if (m && /https?:\/\/[^\s]+/.test(m.textContent)) { } });

function limpiarRecursos() {
  if (escribiendoTimeout) clearTimeout(escribiendoTimeout);
  if (leidosTimer) clearTimeout(leidosTimer);
  if (intervaloTiempo) clearInterval(intervaloTiempo);
  mensajesEnviados.clear();
}

window.addEventListener('beforeunload', limpiarRecursos);
window.addEventListener('pagehide', limpiarRecursos);

(function() { const d = escribiendoDiv.querySelector('.typing-dots'); if (d) d.style.display = 'none'; })();

const sg = localStorage.getItem('chat-sala'), su = localStorage.getItem('chat-usuario');
if (sg && su) { sala = sg; usuario = su; iniciarSesion(); }
