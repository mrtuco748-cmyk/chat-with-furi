const ICONS = {
  'heart': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'heart-filled': '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'paperclip': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>',
  'camera': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  'smile': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  'mic': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  'x': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  'image': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  'reply': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  'copy': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2 2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  'trash': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  'search': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  'arrow-left': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>'
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
let quickReactionMsgId = null;

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
const msgMenu = $('msgMenu'), msgmenuOverlay = $('msgmenuOverlay');
const menuResponder = $('menuResponder'), menuCopiar = $('menuCopiar'), menuEliminar = $('menuEliminar');
const scrollBtn = $('scrollBtn'), camaraBtn = $('camaraBtn');
const wallpaperBtn = $('wallpaperBtn'), wallpaperMenu = $('wallpaperMenu'), wallpaperOverlay = $('wallpaperOverlay');
const searchBtn = $('searchBtn'), searchBar = $('searchBar'), searchInput = $('searchInput'), searchBack = $('searchBack'), searchCount = $('searchCount');
const statsBtn = $('statsBtn'), statsModal = $('statsModal'), statsOverlay = $('statsOverlay'), statsSetDate = $('statsSetDate');
const statDias = $('statDias'), statMsgs = $('statMsgs'), statFotos = $('statFotos'), statAudios = $('statAudios');
const quickReactions = $('quickReactions'), romanticBtn = $('romanticBtn'), romanticPanel = $('romanticPanel');

injectIcons();

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
  conectarAlSala(); mensajeInput.focus();
  registrarServiceWorker(); pedirPermisoNotificacion();
  construirEmojiPicker(); actualizarStats();
}
function conectarAlSala() { if (socket.connected) { socket.emit('unirse', { sala, usuario }); marcarPresente(); } }
async function registrarServiceWorker() { if ('serviceWorker' in navigator) { try { await navigator.serviceWorker.register('/sw.js'); } catch (e) {} } }
function pedirPermisoNotificacion() { if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission(); }
function marcarPresente() { presente = true; socket.emit('presente', { usuario }); headerEstado.textContent = 'en l\u00ednea'; }
function marcarAusente() { presente = false; socket.emit('ausente', { usuario }); }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') marcarPresente(); else { marcarAusente(); headerEstado.textContent = 'ausente'; } });
window.addEventListener('focus', () => marcarPresente());
window.addEventListener('blur', () => { marcarAusente(); headerEstado.textContent = 'ausente'; });
socket.on('connect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; if (sala && usuario) conectarAlSala(); });
socket.on('disconnect', () => { estadoConexion.className = 'desconectado'; headerEstado.textContent = 'desconectado'; });
socket.io.on('reconnect_attempt', () => { estadoConexion.className = 'reconectando'; headerEstado.textContent = 'reconectando...'; });
socket.io.on('reconnect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; });
mensajeInput.addEventListener('input', () => {
  actualizarBotonEnvio(); socket.emit('escribiendo', { usuario });
  clearTimeout(escribiendoTimeout); escribiendoTimeout = setTimeout(() => socket.emit('escribiendo', { usuario: '' }), 1000);
});
function actualizarBotonEnvio() {
  if (mensajeInput.value.trim().length > 0) { microfonoBtn2.classList.add('oculto'); enviarBtn.classList.remove('oculto'); }
  else { microfonoBtn2.classList.remove('oculto'); enviarBtn.classList.add('oculto'); }
}
enviarBtn.addEventListener('click', enviarMensaje);
mensajeInput.addEventListener('keypress', e => { if (e.key === 'Enter') enviarMensaje(); });
function enviarMensaje() {
  const texto = mensajeInput.value.trim(); if (!texto) return;
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const d = { msgId, usuario, texto }; if (respondiendoA) d.respondiendoA = respondiendoA;
  socket.emit('mensaje', d);
  agregarMensajePropio(msgId, { usuario, texto, audio: null, imagen: null, respondiendoA });
  mensajeInput.value = ''; actualizarBotonEnvio(); mensajeInput.focus();
  emojiPicker.classList.add('oculto'); romanticPanel.classList.add('oculto'); cancelarReply();
  msgCount++; actualizarStats();
}
cancelarGrabacion.addEventListener('click', cancelarGrabacionFn);
function cancelarGrabacionFn() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') { mediaRecorder.stop(); grabando = false; }
  microfonoBtn2.innerHTML = ICONS.mic; grabandoDiv.classList.add('oculto');
  tiempoGrabacion = 0; clearInterval(intervaloTiempo); grabacionBloqueada = false;
}
microfonoBtn2.addEventListener('click', toggleGrabacion);
microfonoBtn2.addEventListener('pointerdown', () => { if (grabando) { grabacionBloqueada = true; } });
document.addEventListener('pointerup', () => { if (grabando && !grabacionBloqueada) detenerGrabacion(); });
async function toggleGrabacion() { if (grabando) detenerGrabacion(); else await iniciarGrabacion(); }
async function iniciarGrabacion() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4' });
    audioChunks = []; grabando = true; grabacionBloqueada = false; tiempoGrabacion = 0;
    grabandoDiv.classList.remove('oculto'); scrollBtnBottom(); tiempoGrabacionSpan.textContent = '0s';
    intervaloTiempo = setInterval(() => { tiempoGrabacion++; tiempoGrabacionSpan.textContent = tiempoGrabacion + 's'; }, 1000);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
      clearInterval(intervaloTiempo); const b = new Blob(audioChunks, { type: mediaRecorder.mimeType });
      stream.getTracks().forEach(t => t.stop());
      if (tiempoGrabacion >= 1 && grabando) enviarAudio(b);
      grabandoDiv.classList.add('oculto'); scrollBtnBottom(); grabando = false; grabacionBloqueada = false;
    };
    mediaRecorder.start();
  } catch (err) { alert('No se pudo acceder al micr\u00f3fono'); }
}
function detenerGrabacion() { if (mediaRecorder && mediaRecorder.state !== 'inactive') { grabando = false; mediaRecorder.stop(); } }
function enviarAudio(blob) {
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => {
    const b = r.result.split(',')[1];
    socket.emit('mensaje', { msgId, usuario, texto: '', audio: { data: b, type: blob.type, duracion: tiempoGrabacion }, respondiendoA });
    agregarMensajePropio(msgId, { usuario, texto: '', audio: { duracion: tiempoGrabacion }, imagen: null, respondiendoA });
    if (respondiendoA) cancelarReply(); audioCount++; actualizarStats();
  }; r.readAsDataURL(blob);
}

const EMOJIS = ['\uD83D\uDE00','\uD83D\uDE03','\uD83D\uDE04','\uD83D\uDE01','\uD83D\uDE06','\uD83D\uDE05','\uD83E\uDD23','\uD83D\uDE02','\uD83D\uDE42','\uD83D\uDE09','\uD83D\uDE0A','\uD83D\uDE07','\uD83E\uDD70','\uD83D\uDE0D','\uD83E\uDD29','\uD83D\uDE18','\uD83D\uDE17','\uD83D\uDE1A','\uD83D\uDE0B','\uD83D\uDE1B','\uD83D\uDE1C','\uD83E\uDD2A','\uD83D\uDE1D','\uD83E\uDD11','\uD83E\uDD17','\uD83E\uDD2D','\uD83E\uDD2B','\uD83E\uDD14','\uD83E\uDD10','\uD83D\uDE10','\uD83D\uDE11','\uD83D\uDE36','\uD83D\uDE0F','\uD83D\uDE12','\uD83D\uDE44','\uD83D\uDE2C','\uD83E\uDD25','\uD83E\uDD2C','\uD83D\uDE0C','\uD83D\uDE14','\uD83D\uDE2A','\uD83E\uDD24','\uD83D\uDE34','\uD83D\uDE37','\uD83E\uDD12','\uD83E\uDD15','\uD83E\uDD22','\uD83E\uDD2E','\uD83E\uDD34','\uD83D\uDE35','\uD83E\uDD2F','\uD83E\uDD33','\uD83E\uDDD0','\uD83D\uDE0E','\uD83E\uDDD0','\uD83D\uDE22','\uD83D\uDE2D','\uD83D\uDE24','\uD83D\uDE20','\uD83D\uDE21','\uD83E\uDD2C','\uD83D\uDC95','\u2764\uFE0F','\uD83E\uDDE1','\uD83E\uDDB5','\uD83D\uDC9A','\uD83D\uDC99','\uD83D\uDC9C','\uD83D\uDDA4','\uD83E\uDD0D','\uD83E\uDD0E','\uD83D\uDC94','\u2763\uFE0F','\uD83D\uDC96','\uD83D\uDC97','\uD83D\uDC93','\uD83D\uDC9E','\uD83D\uDC9D','\uD83D\uDC98','\uD83D\uDC8B','\uD83D\uDC4B','\uD83E\uDD1A','\uD83D\uDD90','\u270B','\uD83D\uDD96','\uD83D\uDC4C','\uD83E\uDD0F','\u270C\uFE0F','\uD83E\uDD1E','\uD83E\uDD1F','\uD83E\uDD18','\uD83E\uDD19','\uD83D\uDC48','\uD83D\uDC49','\uD83D\uDC46','\uD83D\uDD95','\uD83D\uDC47','\uD83D\uDC4D','\uD83D\uDC4E','\u270A','\uD83D\uDC4A','\uD83E\uDD1B','\uD83E\uDD1C','\uD83D\uDC4F','\uD83D\uDE4C','\uD83D\uDC50','\uD83E\uDD32','\uD83E\uDD1D','\uD83D\uDE4F','\u270D','\uD83D\uDC85','\uD83E\uDD33','\uD83D\uDCAA','\uD83E\uDDB5','\uD83E\uDDB6','\uD83D\uDC42','\uD83E\uDD5B','\uD83D\uDC43','\uD83E\uDD35','\uD83E\uDDB7','\uD83D\uDC40','\uD83D\uDC45','\uD83E\uDDD2'];
function construirEmojiPicker() {
  emojiPicker.innerHTML = '';
  for (const e of EMOJIS) {
    const btn = document.createElement('button');
    btn.textContent = e;
    btn.addEventListener('click', () => { mensajeInput.value += e; mensajeInput.focus(); actualizarBotonEnvio(); });
    emojiPicker.appendChild(btn);
  }
}
emojiBtn.addEventListener('click', () => { $('attachMenu').classList.add('oculto'); $('msgMenu').classList.add('oculto'); $('wallpaperMenu').classList.add('oculto'); romanticPanel.classList.add('oculto'); emojiPicker.classList.toggle('oculto'); });
romanticBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); $('attachMenu').classList.add('oculto'); romanticPanel.classList.toggle('oculto'); });
document.querySelectorAll('.rp-option').forEach(btn => { btn.addEventListener('click', () => { mensajeInput.value = btn.dataset.msg; mensajeInput.focus(); actualizarBotonEnvio(); romanticPanel.classList.add('oculto'); }); });
attachBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); romanticPanel.classList.add('oculto'); $('msgMenu').classList.add('oculto'); $('wallpaperMenu').classList.add('oculto'); attachMenu.classList.remove('oculto'); });
attachOverlay.addEventListener('click', () => attachMenu.classList.add('oculto'));
msgmenuOverlay.addEventListener('click', () => msgMenu.classList.add('oculto'));
wallpaperBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); msgMenu.classList.add('oculto'); wallpaperMenu.classList.remove('oculto'); });
wallpaperOverlay.addEventListener('click', () => wallpaperMenu.classList.add('oculto'));
document.querySelectorAll('.wp-opt').forEach(btn => { btn.addEventListener('click', () => { document.body.className = 'wallpaper-' + btn.dataset.wp; wallpaperMenu.classList.add('oculto'); localStorage.setItem('chat-wallpaper', btn.dataset.wp); }); });
const wpGuardado = localStorage.getItem('chat-wallpaper'); if (wpGuardado) document.body.className = 'wallpaper-' + wpGuardado;
document.querySelectorAll('.attach-option').forEach(btn => { btn.addEventListener('click', () => { attachMenu.classList.add('oculto'); if (btn.dataset.tipo === 'camara') abrirCamara(); else abrirGaleria(); }); });
function abrirCamara() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.capture = 'environment'; i.addEventListener('change', e => { if (e.target.files?.[0]) enviarImagen(e.target.files[0]); }); i.click(); }
function abrirGaleria() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.addEventListener('change', e => { if (e.target.files?.[0]) enviarImagen(e.target.files[0]); }); i.click(); }
function enviarImagen(file) {
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => { const b = r.result.split(',')[1]; socket.emit('mensaje', { msgId, usuario, texto: '', imagen: { data: b, type: file.type }, respondiendoA }); agregarMensajePropio(msgId, { usuario, texto: '', audio: null, imagen: { type: file.type }, respondiendoA }); if (respondiendoA) cancelarReply(); fotoCount++; actualizarStats(); };
  r.readAsDataURL(file);
}
replyClose.addEventListener('click', cancelarReply);
function scrollBtnBottom() {
  let b = 64;
  if (!replyBar.classList.contains('oculto')) b += 40;
  if (!grabandoDiv.classList.contains('oculto')) b += 40;
  scrollBtn.style.bottom = b + 'px';
}
function iniciarReply(data) { respondiendoA = { msgId: data.msgId, usuario: data.usuarioUsuario || data.usuario, texto: data.texto }; replyUser.textContent = respondiendoA.usuario; replyText.textContent = respondiendoA.texto || (data.audio ? 'Audio' : 'Foto'); replyBar.classList.remove('oculto'); scrollBtnBottom(); mensajeInput.focus(); }
function cancelarReply() { respondiendoA = null; replyBar.classList.add('oculto'); scrollBtnBottom(); }
menuResponder.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el) iniciarReply({ msgId: msgMenuMsgId, usuario: el.dataset.usuario, texto: el.dataset.texto }); });
menuCopiar.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el?.dataset.texto) navigator.clipboard.writeText(el.dataset.texto).catch(() => {}); });
menuEliminar.addEventListener('click', () => { msgMenu.classList.add('oculto'); const el = document.getElementById('msg-' + msgMenuMsgId); if (el) el.remove(); });

searchBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); msgMenu.classList.add('oculto'); searchBar.classList.remove('oculto'); searchInput.focus(); busquedaActiva = true; });
searchBack.addEventListener('click', cerrarBusqueda);
searchInput.addEventListener('input', buscarMensajes);
function cerrarBusqueda() { searchBar.classList.add('oculto'); searchInput.value = ''; busquedaActiva = false; document.querySelectorAll('.msg-resaltado').forEach(el => el.classList.remove('msg-resaltado')); searchCount.textContent = ''; }
function buscarMensajes() {
  document.querySelectorAll('.msg-resaltado').forEach(el => el.classList.remove('msg-resaltado'));
  const q = searchInput.value.toLowerCase().trim();
  if (!q) { searchCount.textContent = ''; return; }
  const msgs = mensajesDiv.querySelectorAll('.mensaje:not(.sistema)');
  let count = 0, first = null;
  msgs.forEach(m => {
    const txt = (m.dataset.texto || '').toLowerCase();
    if (txt.includes(q)) { m.classList.add('msg-resaltado'); count++; if (!first) first = m; }
  });
  searchCount.textContent = count + ' resultado' + (count !== 1 ? 's' : '');
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

scrollBtn.addEventListener('click', () => mensajesDiv.scrollTo({ top: mensajesDiv.scrollHeight, behavior: 'smooth' }));
mensajesDiv.addEventListener('scroll', () => { scrollBtn.classList.toggle('oculto', mensajesDiv.scrollHeight - mensajesDiv.scrollTop - mensajesDiv.clientHeight < 100); });
camaraBtn.addEventListener('click', abrirCamara);

statsBtn.addEventListener('click', () => { emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto'); wallpaperMenu.classList.add('oculto'); statsModal.classList.remove('oculto'); });
statsOverlay.addEventListener('click', () => statsModal.classList.add('oculto'));
statsSetDate.addEventListener('click', () => { const d = prompt('Ingres\u00E1 la fecha que empezaron (DD/MM/AAAA):'); if (d) { localStorage.setItem('chat-fecha-inicio', d); actualizarStats(); } });
function actualizarStats() {
  const fi = localStorage.getItem('chat-fecha-inicio');
  if (fi) { const p = fi.split('/'); const f = new Date(p[2], p[1]-1, p[0]); const h = new Date(); const d = Math.floor((h - f) / 86400000); statDias.textContent = d >= 0 ? d : 0; }
  statMsgs.textContent = msgCount; statFotos.textContent = fotoCount; statAudios.textContent = audioCount;
}

document.querySelectorAll('.qr-emoji').forEach(el => { el.addEventListener('click', () => { if (quickReactionMsgId) { socket.emit('reaccion', { sala, msgId: quickReactionMsgId, usuario, reaccion: el.dataset.reaccion }); const d = document.getElementById('msg-' + quickReactionMsgId); if (d) mostrarReaccion(d, el.dataset.reaccion); } quickReactions.classList.add('oculto'); }); });

function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
function formatearTexto(text) {
  const urlRegex = /(https?:\/\/[^\s<]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s<]*)?)/g;
  const escaped = escapeHtml(text);
  return escaped.replace(/\*(.*?)\*/g, '<b>$1</b>').replace(/_(.*?)_/g, '<i>$1</i>').replace(/~(.*?)~/g, '<s>$1</s>').replace(urlRegex, m => { const u = m.startsWith('http') ? m : 'https://' + m; return '<a href="' + u + '" target="_blank" rel="noopener">' + m + '</a>'; });
}
function debeInsertarSeparador() { const a = new Date(); const c = a.getFullYear()+'-'+a.getMonth()+'-'+a.getDate(); if (c !== ultimaFecha) { ultimaFecha = c; return true; } return false; }
function textoSeparador() { const a = new Date(); const h = new Date(a.getFullYear(),a.getMonth(),a.getDate()); if (a >= h) return 'Hoy'; if (a >= new Date(h.getTime()-86400000) && a < h) return 'Ayer'; return a.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' }); }
function insertarSeparadorFecha() { if (debeInsertarSeparador()) { const d = document.createElement('div'); d.classList.add('separador-fecha'); d.textContent = textoSeparador(); mensajesDiv.appendChild(d); } }

function agregarMensajePropio(msgId, data) {
  insertarSeparadorFecha();
  const div = document.createElement('div'); div.id = 'msg-'+msgId; div.classList.add('mensaje','propio');
  div.dataset.usuario = usuario; div.dataset.texto = data.texto||'';
  const ahora = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  let rh='', c='';
  if (data.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(data.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(data.respondiendoA.texto)+'</div></div>';
  if (data.imagen) c += '<div class="duracion-audio">\uD83D\uDDBC Foto</div>';
  else if (data.audio) c += '<div class="duracion-audio">\uD83C\uDFA4 Audio '+(data.audio.duracion||0)+'s</div>';
  else c += '<div class="texto">'+formatearTexto(data.texto)+'</div>';
  div.innerHTML = rh+c+'<div class="hora-estado"><span class="hora">'+ahora+'</span><span class="estado-msg" id="estado-'+msgId+'"><span class="tick-enviando">\u23F3</span></span></div>';
  mensajesDiv.appendChild(div); mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  mensajesEnviados.set(msgId, div); agregarEventosMensaje(div, msgId, data);
}

function agregarEventosMensaje(div, msgId, data) {
  let toques = 0, td = null;
  div.addEventListener('click', () => { toques++; if (toques===1) td = setTimeout(()=>{toques=0;},300); else if (toques===2) { clearTimeout(td); toques=0; socket.emit('reaccion',{sala,msgId,usuario,reaccion:'\u2764\uFE0F'}); mostrarReaccion(div,'\u2764\uFE0F'); } });
  let lp = null;
  div.addEventListener('pointerdown', e => { lp = setTimeout(() => { const r = div.getBoundingClientRect(); quickReactions.style.top = (r.top - 50) + 'px'; quickReactions.style.left = Math.min(r.left + r.width/2 - 100, window.innerWidth - 220) + 'px'; quickReactionMsgId = msgId; quickReactions.classList.remove('oculto'); }, 600); });
  div.addEventListener('pointerup', () => { clearTimeout(lp); });
  div.addEventListener('pointerleave', () => { clearTimeout(lp); });
  div.addEventListener('pointercancel', () => { clearTimeout(lp); });
}

function abrirMenuMensaje(msgId, div) {
  msgMenuMsgId = msgId; menuEliminar.classList.toggle('oculto', div.dataset.usuario !== usuario);
  msgMenu.classList.remove('oculto'); emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto');
}
function mostrarReaccion(div, emoji) {
  let r = div.querySelector('.reaccion');
  if (!r) { r = document.createElement('div'); r.classList.add('reaccion'); div.appendChild(r); }
  r.textContent = emoji; r.style.animation = 'none'; void r.offsetWidth; r.style.animation = 'reaccionAparicion 0.35s ease';
  clearTimeout(r._t); r._t = setTimeout(()=>r?.remove(), 3000);
}

socket.on('mensaje', (data) => {
  if (data.usuario === usuario) return;
  insertarSeparadorFecha();
  const div = document.createElement('div'); div.id = 'msg-'+data.msgId; div.classList.add('mensaje','otro');
  div.dataset.usuario = data.usuario; div.dataset.texto = data.texto||'';
  const esSistema = data.usuario === '\uD83D\uDCE2 Sistema';
  if (esSistema) div.classList.add('sistema');
  let rh='', c='';
  if (data.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(data.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(data.respondiendoA.texto)+'</div></div>';
  if (data.imagen) { const s='data:'+data.imagen.type+';base64,'+data.imagen.data; c+='<img src="'+s+'" class="imagen-msg" loading="lazy">'; }
  if (data.audio) { const s='data:'+data.audio.type+';base64,'+data.audio.data; c+='<audio controls src="'+s+'" class="audio-msg"></audio><div class="duracion-audio">\uD83C\uDFA4 Audio '+(data.audio.duracion||0)+'s</div>'; }
  if (data.texto) c+='<div class="texto">'+formatearTexto(data.texto)+'</div>';
  div.innerHTML = (esSistema?'':'<div class="usuario">'+data.usuario+'</div>')+rh+c+'<div class="hora">'+data.hora+'</div>';
  mensajesDiv.appendChild(div); mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  mensajesEnviados.set(data.msgId, div); agregarEventosMensaje(div, data.msgId, data);
  if (!esSistema && document.hidden && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
    let cuerpo = data.texto; if (data.audio) cuerpo = 'Audio ('+(data.audio.duracion||0)+'s)'; else if (data.imagen) cuerpo = 'Foto';
    navigator.serviceWorker.controller.postMessage({ tipo:'notificacion', titulo:'\u2764\uFE0F '+data.usuario, cuerpo, tag:'chat-'+data.msgId });
  }
});
socket.on('estado-msg', (data) => { const el = document.getElementById('estado-'+data.msgId); if (!el) return; if (data.estado==='enviado') el.innerHTML = '<span class="tick">\u2713</span>'; else if (data.estado==='entregado') el.innerHTML = '<span class="tick doble">\u2713\u2713</span>'; else if (data.estado==='visto') el.innerHTML = ICONS['heart']; });
socket.on('reaccion', (data) => { const d = document.getElementById('msg-'+data.msgId); if (d) mostrarReaccion(d, data.reaccion); });
socket.on('escribiendo', (data) => {
  const dots = escribiendoDiv.querySelector('.typing-dots');
  if (dots) dots.style.display = (data.usuario && data.usuario !== usuario) ? 'inline-flex' : 'none';
});

const sg = localStorage.getItem('chat-sala'), su = localStorage.getItem('chat-usuario');
if (sg && su) { sala = sg; usuario = su; iniciarSesion(); }
