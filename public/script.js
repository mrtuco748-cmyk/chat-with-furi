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
  'arrow-left': '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  'edit': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  'play': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  'pause': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  'more': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
  'log-out': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
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
const scrollBtn = $('scrollBtn'), camaraBtn = $('camaraBtn');
const wallpaperBtn = $('wallpaperBtn'), wallpaperMenu = $('wallpaperMenu'), wallpaperOverlay = $('wallpaperOverlay');
const searchBtn = $('searchBtn'), searchBar = $('searchBar'), searchInput = $('searchInput'), searchBack = $('searchBack'), searchCount = $('searchCount');
const moreBtn = $('moreBtn'), moreMenu = $('moreMenu'), moreOverlay = $('moreOverlay'), moreLogout = $('moreLogout');
const statsBtn = $('statsBtn'), statsModal = $('statsModal'), statsOverlay = $('statsOverlay'), statsSetDate = $('statsSetDate');
const statDias = $('statDias'), statMsgs = $('statMsgs'), statFotos = $('statFotos'), statAudios = $('statAudios');
const quickReactions = $('quickReactions');
const imgPreview = $('imagePreview'), imgPrevImage = $('imgPrevImage'), imgPrevOverlay = $('imgPrevOverlay'), imgPrevSend = $('imgPrevSend');
let imgPreviewFile = null;

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
  mensajesDiv.innerHTML = ''; ultimaFecha = '';
  cargarMsgsLocal(); conectarAlSala(); mensajeInput.focus();
  registrarServiceWorker(); pedirPermisoNotificacion();
  construirEmojiPicker(); actualizarStats();
}
function conectarAlSala() {
  if (socket.connected) { socket.emit('unirse', { sala, usuario }); marcarPresente(); }
  else socket.once('connect', () => { socket.emit('unirse', { sala, usuario }); marcarPresente(); });
}
async function registrarServiceWorker() { if ('serviceWorker' in navigator) { try { await navigator.serviceWorker.register('/sw.js'); } catch (e) {} } }
function pedirPermisoNotificacion() { if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission(); }
function marcarPresente() { presente = true; socket.emit('presente', { usuario }); headerEstado.textContent = 'en l\u00ednea'; }
function marcarAusente() { presente = false; socket.emit('ausente', { usuario }); }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') marcarPresente(); else { marcarAusente(); headerEstado.textContent = 'ausente'; } });
window.addEventListener('focus', () => marcarPresente());
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
  if (mensajeInput.value.trim().length > 0) { microfonoBtn2.classList.add('oculto'); enviarBtn.classList.remove('oculto'); }
  else { microfonoBtn2.classList.remove('oculto'); enviarBtn.classList.add('oculto'); }
}
enviarBtn.addEventListener('click', enviarMensaje);
mensajeInput.addEventListener('keypress', e => { if (e.key === 'Enter') enviarMensaje(); });
function enviarMensaje() {
  const texto = mensajeInput.value.trim(); if (!texto) return;
  vibrar(15);
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
  agregarMensajePropio(msgId, { usuario, texto, audio: null, imagen: null, respondiendoA });
  mensajeInput.value = ''; actualizarBotonEnvio(); mensajeInput.focus();
  emojiPicker.classList.add('oculto'); cancelarReply();
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
    audioChunks = []; grabando = true; grabacionBloqueada = false; tiempoGrabacion = 0; vibrar(30);
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
const wpGuardado = localStorage.getItem('chat-wallpaper'); if (wpGuardado) document.body.className = 'wallpaper-' + wpGuardado;
document.querySelectorAll('.attach-option').forEach(btn => { btn.addEventListener('click', () => { attachMenu.classList.add('oculto'); if (btn.dataset.tipo === 'camara') abrirCamara(); else abrirGaleria(); }); });
function abrirCamara() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.capture = 'environment'; i.addEventListener('change', e => { if (e.target.files?.[0]) mostrarPreviewImagen(e.target.files[0]); }); i.click(); }
function abrirGaleria() { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.addEventListener('change', e => { if (e.target.files?.[0]) mostrarPreviewImagen(e.target.files[0]); }); i.click(); }
function mostrarPreviewImagen(file) {
  imgPreviewFile = file;
  const r = new FileReader();
  r.onloadend = () => { imgPrevImage.src = r.result; imgPreview.classList.remove('oculto'); };
  r.readAsDataURL(file);
}
function cerrarPreviewImagen() { imgPreview.classList.add('oculto'); imgPrevImage.src = ''; imgPreviewFile = null; }
imgPrevOverlay.addEventListener('click', cerrarPreviewImagen);
imgPrevSend.addEventListener('click', () => { if (imgPreviewFile) enviarImagen(imgPreviewFile); cerrarPreviewImagen(); });
function enviarImagen(file) {
  const r = new FileReader(); const msgId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  r.onloadend = () => { const b64 = r.result; const b = b64.split(',')[1]; socket.emit('mensaje', { msgId, usuario, texto: '', imagen: { data: b, type: file.type }, respondiendoA }); agregarMensajePropio(msgId, { usuario, texto: '', audio: null, imagen: { data: b64, type: file.type }, respondiendoA }); if (respondiendoA) cancelarReply(); fotoCount++; actualizarStats(); };
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
function iniciarReply(data) { respondiendoA = { msgId: data.msgId, usuario: data.usuarioUsuario || data.usuario, texto: data.texto }; replyUser.textContent = respondiendoA.usuario; replyText.textContent = respondiendoA.texto || (data.audio ? 'Audio' : 'Foto'); replyBar.classList.remove('oculto'); scrollBtnBottom(); mensajeInput.focus(); }
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

const iv = $('imageViewer'), ivImg = $('ivImage'), ivInfo = $('ivInfo');
mensajesDiv.addEventListener('click', e => {
  const img = e.target.closest('.imagen-msg');
  if (img) abrirVisorImagen(img.currentSrc || img.src, img.closest('.mensaje')?.dataset?.usuario || '');
});
$('ivOverlay').addEventListener('click', cerrarVisorImagen);
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

function vibrar(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

function keyMsgs() { return 'chat-msgs-' + sala; }
function guardarMsgLocal(m) {
  try { const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]'); arr.push(m); localStorage.setItem(keyMsgs(), JSON.stringify(arr)); } catch(e) {}
}
function cargarMsgsLocal() {
  mensajesDiv.innerHTML = ''; ultimaFecha = ''; msgCount = 0; fotoCount = 0; audioCount = 0;
  try {
    const arr = JSON.parse(localStorage.getItem(keyMsgs()) || '[]');
    for (const m of arr) {
      if (m.tipo === 'propio') renderMsgPropio(m);
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
  insertarSeparadorFecha();
  const div = document.createElement('div'); div.id = 'msg-'+m.msgId; div.classList.add('mensaje','propio');
  div.dataset.usuario = m.usuario; div.dataset.texto = m.texto||'';
  let rh='', c='';
  if (m.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(m.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(m.respondiendoA.texto)+'</div></div>';
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c += '<img src="'+s+'" class="imagen-msg" loading="lazy">'; }
  else if (m.audio) {
    const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : '');
    c += htmlPlayerAudio(src, m.audio.duracion||0);
  }
  else c += '<div class="texto">'+formatearTexto(m.texto)+'</div>';
  div.innerHTML = rh+c+'<div class="hora-estado"><span class="hora">'+(m.hora||'')+'</span></div>';
  mensajesDiv.appendChild(div);
  initAudioPlayers(div);
}
function renderMsgOtro(m) {
  insertarSeparadorFecha();
  const div = document.createElement('div'); div.id = 'msg-'+m.msgId; div.classList.add('mensaje','otro');
  div.dataset.usuario = m.usuario; div.dataset.texto = m.texto||'';
  const esSistema = m.usuario === '\uD83D\uDCE2 Sistema';
  if (esSistema) div.classList.add('sistema');
  let rh='', c='';
  if (m.respondiendoA) rh = '<div class="reply-quote"><div class="rq-user">'+escapeHtml(m.respondiendoA.usuario)+'</div><div class="rq-text">'+escapeHtml(m.respondiendoA.texto)+'</div></div>';
  if (m.imagen) { const s = m.imagen.data && m.imagen.data.startsWith('data:') ? m.imagen.data : 'data:'+m.imagen.type+';base64,'+ (m.imagen.data||''); c+='<img src="'+s+'" class="imagen-msg" loading="lazy">'; }
  if (m.audio) { const src = m.audio.data && m.audio.data.startsWith('data:') ? m.audio.data : (m.audio.data ? 'data:'+m.audio.type+';base64,'+m.audio.data : ''); c += htmlPlayerAudio(src, m.audio.duracion||0); }
  if (m.texto) c+='<div class="texto">'+formatearTexto(m.texto)+'</div>';
  div.innerHTML = (esSistema?'':'<div class="usuario">'+m.usuario+'</div>')+rh+c+'<div class="hora">'+(m.hora||'')+'</div>';
  mensajesDiv.appendChild(div);
  initAudioPlayers(div);
}

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
  const hora = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  const m = { msgId, usuario, texto: data.texto||'', audio: data.audio||null, imagen: data.imagen||null, respondiendoA: data.respondiendoA||null, hora, tipo: 'propio' };
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
  div.addEventListener('click', () => { toques++; if (toques===1) td = setTimeout(()=>{toques=0;},300); else if (toques===2) { clearTimeout(td); toques=0; socket.emit('reaccion',{sala,msgId,usuario,reaccion:'\u2764\uFE0F'}); mostrarReaccion(div,'\u2764\uFE0F'); } });
  let lp = null;
  div.addEventListener('pointerdown', e => { lp = setTimeout(() => { vibrar(20); const r = div.getBoundingClientRect(); quickReactions.style.top = (r.top - 50) + 'px'; quickReactions.style.left = Math.min(r.left + r.width/2 - 100, window.innerWidth - 220) + 'px'; quickReactionMsgId = msgId; quickReactions.classList.remove('oculto'); }, 600); });
  div.addEventListener('pointerup', () => { clearTimeout(lp); limpiarSwipe(); });
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
    if (dx > 50) { iniciarReply({ msgId, usuario: data.usuario, texto: data.texto }); mostrarToast('Respondiendo...'); }
    div.classList.remove('swiping'); div.style.boxShadow = ''; swiping = false;
  });
  div.addEventListener('touchcancel', () => { cancelAnimationFrame(animFrame); div.classList.remove('swiping'); div.style.boxShadow = ''; swiping = false; });
}

function abrirMenuMensaje(msgId, div) {
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
  if (data.usuario === usuario) return;
  const esSistema = data.usuario === '\uD83D\uDCE2 Sistema';
  const mData = { msgId: data.msgId, usuario: data.usuario, texto: data.texto||'', hora: data.hora, tipo: esSistema ? 'sistema' : 'otro' };
  if (data.respondiendoA) mData.respondiendoA = data.respondiendoA;
  if (data.imagen) mData.imagen = { data: 'data:'+data.imagen.type+';base64,'+data.imagen.data, type: data.imagen.type };
  if (data.audio) mData.audio = { data: 'data:'+data.audio.type+';base64,'+data.audio.data, type: data.audio.type, duracion: data.audio.duracion };
  guardarMsgLocal(mData);
  if (esSistema) { const d = document.createElement('div'); d.classList.add('mensaje','sistema'); d.textContent = data.texto; mensajesDiv.appendChild(d); mensajesDiv.scrollTop = mensajesDiv.scrollHeight; return; }
  renderMsgOtro(m);
  const div = document.getElementById('msg-'+data.msgId);
  if (div) { agregarEventosMensaje(div, data.msgId, data); mensajesEnviados.set(data.msgId, div); }
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  if (document.hidden && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
    let cuerpo = data.texto; if (data.audio) cuerpo = 'Audio ('+(data.audio.duracion||0)+'s)'; else if (data.imagen) cuerpo = 'Foto';
    navigator.serviceWorker.controller.postMessage({ tipo:'notificacion', titulo:'\u2764\uFE0F '+data.usuario, cuerpo, tag:'chat-'+data.msgId });
  }
});
socket.on('estado-msg', (data) => { const el = document.getElementById('estado-'+data.msgId); if (!el) return; if (data.estado==='enviado') el.innerHTML = '<span class="tick">\u2713</span>'; else if (data.estado==='entregado') el.innerHTML = '<span class="tick doble">\u2713\u2713</span>'; else if (data.estado==='visto') el.innerHTML = ICONS['heart']; });
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

socket.on('escribiendo', (data) => {
  const dots = escribiendoDiv.querySelector('.typing-dots');
  if (dots) dots.style.display = (data.usuario && data.usuario !== usuario) ? 'inline-flex' : 'none';
});

(function() { const d = escribiendoDiv.querySelector('.typing-dots'); if (d) d.style.display = 'none'; })();

const sg = localStorage.getItem('chat-sala'), su = localStorage.getItem('chat-usuario');
if (sg && su) { sala = sg; usuario = su; iniciarSesion(); }
