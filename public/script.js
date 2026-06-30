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
  'moon': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
  'file': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  'map-pin': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  'bar-chart': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  'star': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'message-circle': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
  'check-circle': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  'plus': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
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
const menuResponder = $('menuResponder'), menuCopiar = $('menuCopiar'), menuEliminar = $('menuEliminarPropio'), menuEliminarTodos = $('menuEliminarTodos'), menuEditar = $('menuEditar'), menuSeleccionar = $('menuSeleccionar');
const menuInfo = $('menuInfo'), menuForward = $('menuForward');
const scrollBtn = $('scrollBtn'), camaraBtn = $('camaraBtn');
const wallpaperBtn = $('wallpaperBtn'), wallpaperMenu = $('wallpaperMenu'), wallpaperOverlay = $('wallpaperOverlay');
const searchBtn = $('searchBtn'), searchBar = $('searchBar'), searchInput = $('searchInput'), searchBack = $('searchBack'), searchCount = $('searchCount');
const searchUp = $('searchUp'), searchDown = $('searchDown');
const moreBtn = $('moreBtn'), moreMenu = $('moreMenu'), moreOverlay = $('moreOverlay');
const moreTheme = $('moreTheme'), moreSelect = $('moreSelect'), moreSettings = $('moreSettings'), moreClearChat = $('moreClearChat'), moreExport = $('moreExport'), moreLogout = $('moreLogout');
const statsBtn = $('statsBtn'), statsModal = $('statsModal'), statsOverlay = $('statsOverlay'), statsSetDate = $('statsSetDate');
const statDias = $('statDias'), statMsgs = $('statMsgs'), statFotos = $('statFotos'), statAudios = $('statAudios');
const quickReactions = $('quickReactions'), quickReactionsOverlay = $('quickReactionsOverlay');
quickReactionsOverlay.addEventListener('click', () => { quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto'); });
const imgPreview = $('imagePreview'), imgPrevImage = $('imgPrevImage'), imgPrevOverlay = $('imgPrevOverlay'), imgPrevSend = $('imgPrevSend'), imgPrevCaption = $('imgPrevCaption');
const iv = $('imageViewer'), ivImg = $('ivImage'), ivInfo = $('ivInfo'), ivShareBtn = $('ivShareBtn'), ivCloseBtn = $('ivCloseBtn');
const stickerPicker = $('stickerPicker');
const msgInfoModal = $('msgInfoModal'), msgInfoOverlay = $('msgInfoOverlay'), msgInfoContent = $('msgInfoContent'), msgInfoClose = $('msgInfoClose');
const settingsModal = $('settingsModal'), settingsOverlay = $('settingsOverlay'), settingsClose = $('settingsClose');
const settingDarkMode = $('settingDarkMode'), settingSound = $('settingSound'), settingVibrate = $('settingVibrate'), settingNotify = $('settingNotify');
const settingsExport = $('settingsExport'), settingsClear = $('settingsClear');
const settingsFoto = $('settingsFoto'), settingsFotoPreview = $('settingsFotoPreview'), settingsFotoRemove = $('settingsFotoRemove'), settingsParejaNombre = $('settingsParejaNombre');
const installBanner = $('installBanner'), installBtn = $('installBtn'), installClose = $('installClose');
const wpCustomBg = $('wpCustomBg'), avatarRing = document.querySelector('.avatar-ring'), avatarHeart = document.querySelector('.avatar-heart');
const headerTitle = $('headerTitle');
let deferredPrompt = null, fotoPerfilLocal = null, fotoPerfilRemoto = null;
const headerNormal = $('headerNormal'), headerSelect = $('headerSelect');
const selectClose = $('selectClose'), selectCount = $('selectCount'), selectDelete = $('selectDelete'), selectFav = $('selectFav'), selectQuiet = $('selectQuiet'), selectMoreBtn = $('selectMoreBtn');
const deleteOptions = $('deleteOptions'), deleteOptOverlay = $('deleteOptOverlay'), deleteForMe = $('deleteForMe'), deleteForEveryone = $('deleteForEveryone'), deleteOptCancel = $('deleteOptCancel');
const quietBar = $('quietBar'), quietClose = $('quietClose'), quietText = $('quietText');
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
  restaurarPerfil();
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
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { marcarPresente(); } else { marcarAusente(); } });
window.addEventListener('focus', () => { marcarPresente(); emitirLeidosPendientes(); });
window.addEventListener('blur', () => { marcarAusente(); });
socket.on('connect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; if (sala && usuario) conectarAlSala(); const d = escribiendoDiv.querySelector('.typing-dots'); if (d) d.style.display = 'none'; });
socket.on('disconnect', () => { estadoConexion.className = 'desconectado'; headerEstado.textContent = 'desconectado'; });
socket.io.on('reconnect_attempt', () => { estadoConexion.className = 'reconectando'; headerEstado.textContent = 'reconectando...'; });
socket.io.on('reconnect', () => { estadoConexion.className = 'conectado'; headerEstado.textContent = 'en l\u00ednea'; });

// Install prompt
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; setTimeout(() => installBanner.classList.remove('oculto'), 3000); });
installBtn.addEventListener('click', async () => { if (deferredPrompt) { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; if (r.outcome === 'accepted') installBanner.classList.add('oculto'); deferredPrompt = null; } });
installClose.addEventListener('click', () => installBanner.classList.add('oculto'));
window.addEventListener('appinstalled', () => installBanner.classList.add('oculto'));

// SW update check
async function checkSWUpdate() {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && reg.waiting) { reg.waiting.postMessage({ tipo: 'skipWaiting' }); location.reload(true); return; }
      if (reg) { reg.update().then(() => { if (reg.waiting) { mostrarToast('Nueva versi\u00F3n disponible. Actualizando...', 4000); reg.waiting.postMessage({ tipo: 'skipWaiting' }); setTimeout(() => location.reload(true), 1000); } }); }
    } catch(e) {}
  }
}
setTimeout(checkSWUpdate, 2000);
navigator.serviceWorker?.addEventListener('controllerchange', () => { location.reload(true); });

// Profile photo
settingsFoto.addEventListener('click', () => {
  const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
  i.addEventListener('change', e => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      fotoPerfilLocal = ev.target.result;
      localStorage.setItem('chat-foto-' + sala, fotoPerfilLocal);
      settingsFotoPreview.src = fotoPerfilLocal; settingsFotoPreview.parentElement.style.display = 'flex';
      socket.emit('foto-perfil', { sala, foto: fotoPerfilLocal });
      mostrarToast('Foto de perfil actualizada');
    };
    reader.readAsDataURL(file);
  });
  i.click();
});
settingsFotoRemove.addEventListener('click', () => {
  fotoPerfilLocal = null; localStorage.removeItem('chat-foto-' + sala);
  settingsFotoPreview.src = ''; settingsFotoPreview.parentElement.style.display = 'none';
  if (fotoPerfilRemoto) actualizarAvatar(fotoPerfilRemoto); else actualizarAvatar(null);
  socket.emit('foto-perfil', { sala, foto: null });
  mostrarToast('Foto eliminada');
});
function actualizarAvatar(foto) {
  if (foto) { avatarRing.innerHTML = '<img src="'+foto+'" class="avatar-img" style="width:100%;height:100%;border-radius:50%;object-fit:cover">'; }
  else { avatarRing.innerHTML = '<span class="avatar-heart" data-icon="heart-filled"></span>'; injectIconsIn(avatarRing); }
}
// Partner name
settingsParejaNombre.addEventListener('input', () => {
  const nombre = settingsParejaNombre.value.trim() || 'Mi amor';
  localStorage.setItem('chat-pareja-nombre', nombre);
  headerTitle.textContent = nombre;
});

// Custom background
wpCustomBg.addEventListener('click', () => {
  wallpaperMenu.classList.add('oculto');
  const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
  i.addEventListener('change', e => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const bg = ev.target.result;
      localStorage.setItem('chat-fondo-personalizado', bg);
      aplicarFondoPersonalizado(bg);
      mostrarToast('Fondo personalizado aplicado');
    };
    reader.readAsDataURL(file);
  });
  i.click();
});
function aplicarFondoPersonalizado(bg) {
  document.body.style.setProperty('--bg-chat', 'url('+bg+')');
  document.body.style.background = 'url('+bg+') center/cover no-repeat fixed';
}
const fondoGuardado = localStorage.getItem('chat-fondo-personalizado');
if (fondoGuardado) aplicarFondoPersonalizado(fondoGuardado);

// Restore partner name & profile photo (runs after sala is set in iniciarSesion)
function restaurarPerfil() {
  const pn = localStorage.getItem('chat-pareja-nombre');
  if (pn) headerTitle.textContent = pn;
  settingsParejaNombre.value = pn || '';
  const fg = localStorage.getItem('chat-foto-' + sala);
  if (fg) { fotoPerfilLocal = fg; settingsFotoPreview.src = fg; settingsFotoPreview.parentElement.style.display = 'flex'; }
  const rf = localStorage.getItem('chat-foto-remoto-' + sala);
  if (rf) { fotoPerfilRemoto = rf; actualizarAvatar(rf); }
}
socket.on('foto-perfil', (data) => {
  if (data.foto) {
    fotoPerfilRemoto = data.foto;
    localStorage.setItem('chat-foto-remoto-' + sala, data.foto);
    actualizarAvatar(data.foto);
  } else {
    fotoPerfilRemoto = null;
    localStorage.removeItem('chat-foto-remoto-' + sala);
    actualizarAvatar(null);
  }
});

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
  if (!quietBar.classList.contains('oculto')) {
    const ids = JSON.parse(quietBar.dataset.targetIds || '[]');
    const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const d = { msgId, usuario, texto, silencio: true, silencioDe: ids };
    socket.emit('mensaje', d);
    try {
      const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
      const mData = { msgId, usuario, texto, hora: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), fecha: new Date().toISOString(), tipo: 'propio', silencio: true, silencioDe: ids };
      arr.push(mData); localStorage.setItem(keyMsgs(), JSON.stringify(arr));
      for (const id of ids) {
        const el = document.getElementById('msg-' + id);
        if (el) agregarQuietToggle(el, msgId, texto);
      }
    } catch(e) {}
    mensajeInput.value = ''; actualizarBotonEnvio(); mensajeInput.focus();
    quietBar.classList.add('oculto'); $('mensajeInput').placeholder = 'Mensaje';
    msgCount++; actualizarStats();
    if (settings.sound) { try { new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=').play().catch(()=>{}); } catch(e){} }
    return;
  }
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

function abrirDocumento() {
  const i = document.createElement('input'); i.type = 'file';
  i.addEventListener('change', e => { if (e.target.files?.[0]) enviarDocumento(e.target.files[0]); });
  i.click();
}
function enviarDocumento(file) {
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => {
    const b64 = r.result; const b = b64.split(',')[1];
    const d = { msgId, usuario, texto: file.name, documento: { data: b, type: file.type, nombre: file.name, tamano: file.size }, respondiendoA };
    socket.emit('mensaje', d);
    agregarMensajePropio(msgId, { usuario, texto: file.name, documento: { data: b64, type: file.type, nombre: file.name, tamano: file.size }, respondiendoA });
    if (respondiendoA) cancelarReply();
  }; r.readAsDataURL(file);
}

function solicitarUbicacion() {
  if (!navigator.geolocation) { mostrarToast('Geolocalizaci\u00F3n no disponible'); return; }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      const nombre = prompt('Nombre del lugar (opcional):') || 'Ubicaci\u00F3n';
      enviarUbicacion(latitude, longitude, nombre);
    },
    () => mostrarToast('No se pudo obtener la ubicaci\u00F3n'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
}
function enviarUbicacion(lat, lng, nombre) {
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const mapsUrl = 'https://www.google.com/maps?q=' + lat + ',' + lng;
  const d = { msgId, usuario, texto: nombre, ubicacion: { lat, lng, nombre, url: mapsUrl }, respondiendoA };
  socket.emit('mensaje', d);
  agregarMensajePropio(msgId, { usuario, texto: nombre, ubicacion: { lat, lng, nombre, url: mapsUrl }, respondiendoA });
  if (respondiendoA) cancelarReply();
}

function mostrarCrearEncuesta() {
  const pregunta = prompt('Pregunta de la encuesta:');
  if (!pregunta) return;
  const opcsStr = prompt('Opciones (separadas por coma):');
  if (!opcsStr) return;
  const opciones = opcsStr.split(',').map(s => s.trim()).filter(s => s);
  if (opciones.length < 2) { mostrarToast('M\u00EDnimo 2 opciones'); return; }
  enviarEncuesta(pregunta, opciones);
}
function enviarEncuesta(pregunta, opciones) {
  const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const votos = {};
  opciones.forEach((_, i) => { votos[msgId + '-opc-' + i] = []; });
  const d = { msgId, usuario, texto: pregunta, encuesta: { pregunta, opciones, votos }, respondiendoA };
  socket.emit('mensaje', d);
  agregarMensajePropio(msgId, { usuario, texto: pregunta, encuesta: { pregunta, opciones, votos }, respondiendoA });
  if (respondiendoA) cancelarReply();
}
function votarEncuesta(msgId, opcionIdx) {
  if (!socket.connected) return;
  socket.emit('votar-encuesta', { sala, msgId, opcionIdx, usuario });
  // Optimistic update
  const div = document.getElementById('msg-' + msgId);
  if (div) actualizarVotosEnBurbuja(div, msgId, opcionIdx, usuario);
}
function actualizarVotosEnBurbuja(div, msgId, opcionIdx, votante) {
  const data = div.dataset;
  let votos;
  try { votos = JSON.parse(data.encuestaVotos || '{}'); } catch(e) { votos = {}; }
  const key = msgId + '-opc-' + opcionIdx;
  if (!votos[key]) votos[key] = [];
  if (!votos[key].includes(votante)) votos[key].push(votante);
  data.encuestaVotos = JSON.stringify(votos);
  const bars = div.querySelectorAll('.encuesta-bar');
  if (bars[opcionIdx]) {
    const total = Object.values(votos).reduce((s, v) => s + v.length, 0);
    const count = votos[key].length;
    const pct = total > 0 ? (count / total) * 100 : 0;
    bars[opcionIdx].querySelector('.eb-fill').style.width = pct + '%';
    bars[opcionIdx].querySelector('.eb-pct').textContent = Math.round(pct) + '%';
    bars[opcionIdx].querySelector('.eb-count').textContent = count + ' voto' + (count !== 1 ? 's' : '');
  }
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    const idx = arr.findIndex(m => m.msgId === msgId);
    if (idx >= 0) { arr[idx].encuesta.votos = votos; localStorage.setItem(keyMsgs(), JSON.stringify(arr)); }
  } catch(e) {}
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
      btn.addEventListener('click', () => { if (emojiPicker._modoReaccion) { const mid = emojiPicker._msgId; const d2 = document.getElementById('msg-'+mid); if (mid && d2) { vibrar(10); setReaccionMsg(mid, em); mostrarReaccion(d2, em); registrarReaccionUsada(em); socket.emit('reaccion',{sala,msgId:mid,usuario,reaccion:em}); } emojiPicker._modoReaccion = false; emojiPicker.classList.add('oculto'); } else { mensajeInput.value += em; mensajeInput.focus(); actualizarBotonEnvio(); } });
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
moreSelect.addEventListener('click', () => { moreMenu.classList.add('oculto'); entrSelectMode(); });
moreSettings.addEventListener('click', () => { moreMenu.classList.add('oculto'); settingsModal.classList.remove('oculto'); });
moreClearChat.addEventListener('click', () => { moreMenu.classList.add('oculto'); if (confirm('\u00BFVaciar chat?')) limpiarChat(); });
moreExport.addEventListener('click', () => { moreMenu.classList.add('oculto'); exportarChat(); });
const wpGuardado = localStorage.getItem('chat-wallpaper'); if (wpGuardado) { document.body.classList.remove('wallpaper-default', 'wallpaper-rose', 'wallpaper-sunset', 'wallpaper-ocean', 'wallpaper-lavender'); document.body.classList.add('wallpaper-' + wpGuardado); }
document.querySelectorAll('.attach-option').forEach(btn => { btn.addEventListener('click', () => { attachMenu.classList.add('oculto'); const t = btn.dataset.tipo; if (t === 'camara') abrirCamara(); else if (t === 'galeria') abrirGaleria(); else if (t === 'sticker') stickerPicker.classList.remove('oculto'); else if (t === 'documento') abrirDocumento(); else if (t === 'encuesta') mostrarCrearEncuesta(); else if (t === 'ubicacion') solicitarUbicacion(); }); });
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
menuSeleccionar.addEventListener('click', () => { msgMenu.classList.add('oculto'); entrSelectMode(msgMenuMsgId); });

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



function mostrarToast(texto, duracion) {
  duracion = duracion || 2500;
  const c = $('toastContainer');
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = texto;
  c.appendChild(t);
  setTimeout(() => { t.style.animation = 'toastOut 0.25s ease forwards'; setTimeout(() => t.remove(), 250); }, duracion);
}

function vibrar(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e) {} }

function keyMsgs() { return 'chat-msgs-' + sala; }
function getReaccionMsg(msgId) { try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); const m = arr.find(x => x.msgId === msgId); return m ? m.reaccion : null; } catch(e) { return null; } }
function setReaccionMsg(msgId, emoji) { try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); const m = arr.find(x => x.msgId === msgId); if (m) { if (emoji) m.reaccion = emoji; else delete m.reaccion; localStorage.setItem(keyMsgs(), JSON.stringify(arr)); } } catch(e) {} }
function keyReaccFrec() { return 'chat-reacciones-frecuentes-' + sala; }
function keyReaccConteo() { return 'chat-reacciones-conteo-' + sala; }
function getReaccFrecuentes() { return JSON.parse(localStorage.getItem(keyReaccFrec()) || '[]'); }
function registrarReaccionUsada(emoji) { try { let c = JSON.parse(localStorage.getItem(keyReaccConteo()) || '{}'); c[emoji] = (c[emoji]||0) + 1; const ord = Object.keys(c).sort((a,b) => c[b] - c[a]); localStorage.setItem(keyReaccFrec(), JSON.stringify(ord.slice(0,5))); localStorage.setItem(keyReaccConteo(), JSON.stringify(c)); } catch(e) {} }
function onClickReaccion(e) {
  vibrar(10); const el = e.currentTarget; const emoji = el.dataset.reaccion; const msgId = quickReactionMsgId; const div = document.getElementById('msg-' + msgId);
  if (!msgId || !div) { quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto'); return; }
  const actual = getReaccionMsg(msgId);
  if (actual === emoji) { setReaccionMsg(msgId, null); mostrarReaccion(div, ''); socket.emit('reaccion', { sala, msgId, usuario, reaccion: '' }); }
  else { setReaccionMsg(msgId, emoji); mostrarReaccion(div, emoji); registrarReaccionUsada(emoji); socket.emit('reaccion', { sala, msgId, usuario, reaccion: emoji }); }
  quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto');
}
function construirQuickReactions() {
  quickReactions.innerHTML = '';
  getReaccFrecuentes().forEach(emoji => {
    const s = document.createElement('span'); s.className = 'qr-emoji'; s.dataset.reaccion = emoji; s.textContent = emoji;
    s.addEventListener('click', onClickReaccion); quickReactions.appendChild(s);
  });
  const p = document.createElement('span'); p.className = 'qr-emoji qr-plus'; p.textContent = '+';
  p.addEventListener('click', () => { quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto'); emojiPicker._modoReaccion = true; emojiPicker._msgId = quickReactionMsgId; emojiPicker.classList.remove('oculto'); });
  quickReactions.appendChild(p);
}
function guardarMsgLocal(m) {
  try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); arr.push(m); localStorage.setItem(keyMsgs(), JSON.stringify(arr)); } catch(e) {}
}
function cargarMsgsLocal() {
  mensajesDiv.innerHTML = ''; ultimaFecha = ''; msgCount = 0; fotoCount = 0; audioCount = 0;
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    for (const m of arr) {
      if (m.silencio) {
        if (m.silencioDe) for (const tId of m.silencioDe) {
          const tel = document.getElementById('msg-'+tId);
          if (tel) agregarQuietToggle(tel, m.msgId, m.texto);
        }
        continue;
      }
      if (m.tipo === 'propio') {
        renderMsgPropio(m);
        const div = document.getElementById('msg-'+m.msgId);
        if (div) {
          if (m.favorito) mostrarFavorito(div, true);
          const estadoSpan = document.createElement('span'); estadoSpan.className = 'estado-msg'; estadoSpan.id = 'estado-'+m.msgId;
          estadoSpan.innerHTML = '<span class="tick doble visto">\u2713\u2713</span>';
          div.querySelector('.hora-estado')?.appendChild(estadoSpan);
          mensajesEnviados.set(m.msgId, div);
          agregarEventosMensaje(div, m.msgId, m);
          if (m.reaccion) { div.dataset.reaccionCargado = '1'; mostrarReaccion(div, m.reaccion); }
        }
      }
      else if (m.tipo === 'otro') { renderMsgOtro(m); const od = document.getElementById('msg-'+m.msgId); if (od) { if (m.favorito) mostrarFavorito(od, true); if (m.reaccion) { od.dataset.reaccionCargado = '1'; mostrarReaccion(od, m.reaccion); } agregarEventosMensaje(od, m.msgId, m); } }
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
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c += '<img src="'+s+'" class="imagen-msg" loading="lazy">'; if (m.texto && !m.ubicacion && !m.encuesta) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  else if (m.audio) {
    const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : '');
    c += htmlPlayerAudio(src, m.audio.duracion||0);
    if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>';
  }
  else if (m.documento) {
    const ext = (m.documento.nombre||'archivo').split('.').pop().toUpperCase();
    const tam = m.documento.tamano ? ((m.documento.tamano/1024).toFixed(1)+' KB') : '';
    const src = m.documento.data && m.documento.data.startsWith('data:') ? m.documento.data : 'data:'+m.documento.type+';base64,'+ (m.documento.data||'');
    c += '<div class="doc-msg" onclick="window.open(\''+src+'\')"><span class="doc-icon" data-icon="file"></span><div class="doc-info"><div class="doc-name">'+escapeHtml(m.texto||m.documento.nombre)+'</div><div class="doc-meta">'+ext+' \u2022 '+tam+'</div></div></div>';
  }
  else if (m.ubicacion) {
    c += '<div class="ubic-msg" onclick="window.open(\''+escapeHtml(m.ubicacion.url)+'\',\'_blank\')"><span class="ubic-icon" data-icon="map-pin"></span><div class="ubic-info"><div class="ubic-name">'+escapeHtml(m.texto||m.ubicacion.nombre)+'</div><div class="ubic-meta">Abrir en Google Maps</div></div></div>';
  }
  else if (m.encuesta) {
    div.dataset.encuestaVotos = JSON.stringify(m.encuesta.votos || {});
    const opcs = m.encuesta.opciones.map((o, i) => {
      const key = m.msgId+'-opc-'+i;
      const v = (m.encuesta.votos||{})[key]||[];
      const total = Object.values(m.encuesta.votos||{}).reduce((s,x) => s + x.length, 0);
      const pct = total > 0 ? (v.length/total)*100 : 0;
      return '<div class="encuesta-bar" data-idx="'+i+'" onclick="votarEncuesta(\''+m.msgId+'\','+i+')"><div class="eb-fill" style="width:'+pct+'%"></div><div class="eb-label">'+escapeHtml(o)+'</div><div class="eb-pct">'+Math.round(pct)+'%</div><div class="eb-count">'+v.length+' voto'+(v.length!==1?'s':'')+'</div></div>';
    }).join('');
    c += '<div class="encuesta-msg"><div class="encuesta-preg">'+formatearTexto(m.texto)+'</div><div class="encuesta-opcs">'+opcs+'</div></div>';
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
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c+='<img src="'+s+'" class="imagen-msg" loading="lazy">'; if (m.texto && !m.ubicacion && !m.encuesta) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  if (m.audio) { const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : ''); c += htmlPlayerAudio(src, m.audio.duracion||0); if (m.texto) c += '<div class="img-caption">'+formatearTexto(m.texto)+'</div>'; }
  if (m.texto && !m.imagen && !m.documento && !m.ubicacion && !m.encuesta) c+='<div class="texto">'+formatearTexto(m.texto)+'</div>';
  if (m.documento) {
    const ext = (m.documento.nombre||'archivo').split('.').pop().toUpperCase();
    const tam = m.documento.tamano ? ((m.documento.tamano/1024).toFixed(1)+' KB') : '';
    const src = m.documento.data && m.documento.data.startsWith('data:') ? m.documento.data : 'data:'+m.documento.type+';base64,'+ (m.documento.data||'');
    c += '<div class="doc-msg" onclick="window.open(\''+src+'\')"><span class="doc-icon" data-icon="file"></span><div class="doc-info"><div class="doc-name">'+escapeHtml(m.texto||m.documento.nombre)+'</div><div class="doc-meta">'+ext+' \u2022 '+tam+'</div></div></div>';
  }
  if (m.ubicacion) {
    c += '<div class="ubic-msg" onclick="window.open(\''+escapeHtml(m.ubicacion.url)+'\',\'_blank\')"><span class="ubic-icon" data-icon="map-pin"></span><div class="ubic-info"><div class="ubic-name">'+escapeHtml(m.texto||m.ubicacion.nombre)+'</div><div class="ubic-meta">Abrir en Google Maps</div></div></div>';
  }
  if (m.encuesta) {
    div.dataset.encuestaVotos = JSON.stringify(m.encuesta.votos || {});
    const opcs = m.encuesta.opciones.map((o, i) => {
      const key = m.msgId+'-opc-'+i;
      const v = (m.encuesta.votos||{})[key]||[];
      const total = Object.values(m.encuesta.votos||{}).reduce((s,x) => s + x.length, 0);
      const pct = total > 0 ? (v.length/total)*100 : 0;
      return '<div class="encuesta-bar" data-idx="'+i+'" onclick="votarEncuesta(\''+m.msgId+'\','+i+')"><div class="eb-fill" style="width:'+pct+'%"></div><div class="eb-label">'+escapeHtml(o)+'</div><div class="eb-pct">'+Math.round(pct)+'%</div><div class="eb-count">'+v.length+' voto'+(v.length!==1?'s':'')+'</div></div>';
    }).join('');
    c += '<div class="encuesta-msg"><div class="encuesta-preg">'+formatearTexto(m.texto)+'</div><div class="encuesta-opcs">'+opcs+'</div></div>';
  }
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
      quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto');
      return;
    }
    toques++; if (toques===1) td = setTimeout(()=>{toques=0;},300); else if (toques===2) { clearTimeout(td); toques=0; const frec = getReaccFrecuentes(); const emoji = frec[0] || '\u2764\uFE0F'; socket.emit('reaccion',{sala,msgId,usuario,reaccion:emoji}); mostrarReaccion(div,emoji); setReaccionMsg(msgId, emoji); registrarReaccionUsada(emoji); }
  });
  let lp = null;
  div.addEventListener('pointerdown', e => {
    if (selectMode) return;
    lp = setTimeout(() => {
      if (selectMode) return;
      vibrar(20);
      entrSelectMode(msgId);
      const r = div.getBoundingClientRect();
      quickReactions.style.top = Math.max(10, r.top - 50) + 'px';
      const qw = quickReactions.offsetWidth || Math.min(320, window.innerWidth * 0.85);
      quickReactions.style.left = Math.max(10, (window.innerWidth - qw) / 2) + 'px';
      quickReactionMsgId = msgId;
      construirQuickReactions();
      quickReactions.classList.remove('oculto'); quickReactionsOverlay.classList.remove('oculto');
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

function abrirMenuMensaje(msgId, div, desdeSelect) {
  if (selectMode && !desdeSelect) return;
  if (!div) div = document.getElementById('msg-'+msgId);
  if (!div) return;
  msgMenuMsgId = msgId;
  const propio = div.dataset.usuario === usuario;
  const txt = !!div.dataset.texto;
  menuEditar.classList.toggle('oculto', !(propio && txt));
  menuEliminar.classList.toggle('oculto', !propio);
  menuEliminarTodos.classList.toggle('oculto', !propio);
  msgMenu.classList.remove('oculto'); emojiPicker.classList.add('oculto'); attachMenu.classList.add('oculto');
}
function mostrarReaccion(div, emoji) {
  if (!emoji) { const r = div.querySelector('.reaccion'); if (r) r.remove(); return; }
  let r = div.querySelector('.reaccion');
  if (!r) { r = document.createElement('div'); r.classList.add('reaccion'); div.appendChild(r); }
  r.textContent = emoji;
  if (!div.dataset.reaccionCargado) { r.style.animation = 'none'; void r.offsetWidth; r.style.animation = 'reaccionAparicion 0.35s ease'; }
}

socket.on('mensaje', (data) => {
  try {
    if (data.usuario === usuario) return;
    const esSistema = data.usuario === '\uD83D\uDCE2 Sistema';
    const chatVisible = !document.hidden;
    const mData = { msgId: data.msgId, usuario: data.usuario, texto: data.texto||'', hora: data.hora, fecha: new Date().toISOString(), tipo: esSistema ? 'sistema' : 'otro', leido: chatVisible };
    if (data.respondiendoA) mData.respondiendoA = data.respondiendoA;
    if (data.silencio) mData.silencio = true;
    if (data.silencioDe) mData.silencioDe = data.silencioDe;
    if (data.imagen) mData.imagen = { data: 'data:'+data.imagen.type+';base64,'+data.imagen.data, type: data.imagen.type };
    if (data.audio) mData.audio = { data: 'data:'+data.audio.type+';base64,'+data.audio.data, type: data.audio.type, duracion: data.audio.duracion };
    if (data.documento) mData.documento = { data: 'data:'+data.documento.type+';base64,'+data.documento.data, type: data.documento.type, nombre: data.documento.nombre, tamano: data.documento.tamano };
    if (data.ubicacion) mData.ubicacion = { lat: data.ubicacion.lat, lng: data.ubicacion.lng, nombre: data.ubicacion.nombre, url: data.ubicacion.url };
    if (data.encuesta) mData.encuesta = { pregunta: data.encuesta.pregunta, opciones: data.encuesta.opciones, votos: data.encuesta.votos || {} };
    if (data.reenviado) mData.reenviado = true;
    guardarMsgLocal(mData);
    if (data.silencio) {
      const targets = data.silencioDe || [];
      for (const tId of targets) {
        const tel = document.getElementById('msg-'+tId);
        if (tel) agregarQuietToggle(tel, data.msgId, data.texto);
      }
      return;
    }
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
socket.on('reaccion', (data) => { const d = document.getElementById('msg-'+data.msgId); if (d) { if (data.reaccion) { mostrarReaccion(d, data.reaccion); setReaccionMsg(data.msgId, data.reaccion); } else { mostrarReaccion(d, ''); setReaccionMsg(data.msgId, null); } } });
socket.on('voto-encuesta', (data) => {
  const d = document.getElementById('msg-'+data.msgId);
  if (d) actualizarVotosEnBurbuja(d, data.msgId, data.opcionIdx, data.usuario);
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    const idx = arr.findIndex(m => m.msgId === data.msgId);
    if (idx >= 0) {
      const key = data.msgId+'-opc-'+data.opcionIdx;
      if (!arr[idx].encuesta) arr[idx].encuesta = { votos: {} };
      if (!arr[idx].encuesta.votos) arr[idx].encuesta.votos = {};
      if (!arr[idx].encuesta.votos[key]) arr[idx].encuesta.votos[key] = [];
      if (!arr[idx].encuesta.votos[key].includes(data.usuario)) arr[idx].encuesta.votos[key].push(data.usuario);
      localStorage.setItem(keyMsgs(), JSON.stringify(arr));
    }
  } catch(e) {}
});
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
  headerNormal.classList.add('oculto'); headerSelect.classList.remove('oculto');
  selectedMsgs.clear();
  if (msgId) { selectedMsgs.add(msgId); document.getElementById('msg-'+msgId)?.classList.add('seleccionado'); }
  actualizarSelectCount();
  quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto'); deleteOptions.classList.add('oculto'); quietBar.classList.add('oculto');
}
function salirSelectMode() {
  selectMode = false;
  headerNormal.classList.remove('oculto'); headerSelect.classList.add('oculto');
  document.querySelectorAll('.mensaje.seleccionado').forEach(el => el.classList.remove('seleccionado'));
  selectedMsgs.clear();
  deleteOptions.classList.add('oculto'); quietBar.classList.add('oculto'); quickReactions.classList.add('oculto'); quickReactionsOverlay.classList.add('oculto');
}
function actualizarSelectCount() {
  const n = selectedMsgs.size;
  selectCount.textContent = n;
}
selectClose.addEventListener('click', salirSelectMode);
selectMoreBtn.addEventListener('click', () => {
  if (selectedMsgs.size === 0) return;
  const id = [...selectedMsgs][0];
  abrirMenuMensaje(id, null, true);
});
selectFav.addEventListener('click', () => {
  if (selectedMsgs.size === 0) return;
  const ids = [...selectedMsgs];
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    for (const id of ids) {
      const m = arr.find(x => x.msgId === id);
      if (m) { m.favorito = !m.favorito; const el = document.getElementById('msg-'+id); if (el) mostrarFavorito(el, m.favorito); }
    }
    localStorage.setItem(keyMsgs(), JSON.stringify(arr));
  } catch(e) {}
  mostrarToast('Actualizado');
  salirSelectMode();
});
selectDelete.addEventListener('click', () => {
  if (selectedMsgs.size === 0) return;
  const propio = [...selectedMsgs].every(id => { const d = document.getElementById('msg-'+id); return d && d.dataset.usuario === usuario; });
  deleteForEveryone.classList.toggle('oculto', !propio);
  deleteOptions.classList.remove('oculto');
});
deleteOptOverlay.addEventListener('click', () => deleteOptions.classList.add('oculto'));
deleteOptCancel.addEventListener('click', () => deleteOptions.classList.add('oculto'));
deleteForMe.addEventListener('click', () => { eliminarSeleccionados(false); deleteOptions.classList.add('oculto'); });
deleteForEveryone.addEventListener('click', () => { eliminarSeleccionados(true); deleteOptions.classList.add('oculto'); });
function eliminarSeleccionados(paraTodos) {
  if (selectedMsgs.size === 0) return;
  const ids = [...selectedMsgs];
  for (const id of ids) {
    const el = document.getElementById('msg-' + id);
    if (el) el.remove();
    if (paraTodos) socket.emit('eliminar-msg', { msgId: id, sala });
  }
  try {
    let arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    arr = arr.filter(m => !ids.includes(m.msgId));
    localStorage.setItem(keyMsgs(), JSON.stringify(arr));
  } catch(e) {}
  salirSelectMode();
  mostrarToast(ids.length + ' mensaje' + (ids.length !== 1 ? 's' : '') + ' eliminado' + (ids.length !== 1 ? 's' : ''));
}

selectQuiet.addEventListener('click', () => {
  if (selectedMsgs.size === 0) return;
  salirSelectMode();
  const ids = [...selectedMsgs];
  quietBar.dataset.targetIds = JSON.stringify(ids);
  quietText.textContent = ids.length + ' mensaje' + (ids.length !== 1 ? 's' : '');
  quietBar.classList.remove('oculto');
  $('mensajeInput').placeholder = 'Respuesta silenciosa...';
  $('mensajeInput').focus();
});
quietClose.addEventListener('click', () => { quietBar.classList.add('oculto'); $('mensajeInput').placeholder = 'Mensaje'; });

function mostrarFavorito(el, on) {
  let fi = el.querySelector('.favorito-indicator');
  if (on) {
    if (!fi) { fi = document.createElement('span'); fi.className = 'favorito-indicator'; fi.textContent = '\u2B50'; el.appendChild(fi); }
  } else { if (fi) fi.remove(); }
}
function agregarQuietToggle(containerEl, replyMsgId, texto) {
  let c = containerEl.querySelector('.quiet-reply-container');
  if (!c) {
    c = document.createElement('div'); c.className = 'quiet-reply-container'; c.id = 'qr-'+containerEl.id;
    const toggle = document.createElement('span'); toggle.className = 'quiet-toggle';
    toggle.innerHTML = '<span data-icon="message-circle"></span> 1 respuesta';
    injectIconsIn(toggle);
    toggle.addEventListener('click', () => c.classList.toggle('abierto'));
    containerEl.appendChild(toggle);
    const msgDiv = document.createElement('div'); msgDiv.className = 'quiet-reply-msg'; msgDiv.id = 'qr-msg-'+replyMsgId;
    msgDiv.innerHTML = '<div class="quiet-reply-label">Respuesta silenciosa</div><div>'+escapeHtml(texto)+'</div>';
    c.appendChild(msgDiv);
    containerEl.appendChild(c);
  } else {
    const existing = c.querySelector('#qr-msg-'+replyMsgId);
    if (existing) return;
    const msgDiv = document.createElement('div'); msgDiv.className = 'quiet-reply-msg'; msgDiv.id = 'qr-msg-'+replyMsgId;
    msgDiv.innerHTML = '<div class="quiet-reply-label">Respuesta silenciosa</div><div>'+escapeHtml(texto)+'</div>';
    c.appendChild(msgDiv);
    const toggle = containerEl.querySelector('.quiet-toggle');
    const count = c.querySelectorAll('.quiet-reply-msg').length;
    if (toggle) { toggle.innerHTML = '<span data-icon="message-circle"></span> '+count+' respuesta'+(count!==1?'s':''); injectIconsIn(toggle); }
  }
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
