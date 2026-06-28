/* =========================================================
   WhatsApp Android Clone — Chat de Facu y Rocío
   Vanilla JS, Socket.io, SQLite backend
   ========================================================= */

/* ===== CONFIG ===== */
const EMOJI_CATEGORIES = [
  { key:'recent', icon:'🕐', name:'Recientes' },
  { key:'smileys', icon:'😀', name:'Smileys' },
  { key:'animals', icon:'🐾', name:'Animales' },
  { key:'food', icon:'🍔', name:'Comida' },
  { key:'travel', icon:'✈️', name:'Viajes' },
  { key:'objects', icon:'💡', name:'Objetos' },
  { key:'symbols', icon:'🔣', name:'Símbolos' },
  { key:'flags', icon:'🏁', name:'Banderas' },
];
const EMOJI_MAP = {
  smileys: ['😀','😃','😄','😁','😅','😂','🤣','😊','😇','🙂','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤠','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'],
  animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐓','🦃','🕊️','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳','🌴','🌱','🌿','☘️','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🪺','🪹','🍄','🐚','🪸','🌾','💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌎','🌍','🌏','🪐','💫','⭐','🌟','✨','⚡','🔥','💥','☄️','💦','💧','🌊'],
  food: ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅','🍄','🥜','🫘','🌰','🍞','🥐','🥖','🫓','🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌭','🍔','🍟','🍕','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🥛','🍼','🫖','☕','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾','🧊'],
  travel: ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️','🛵','🛺','🚲','🛴','🛹','🚏','🛣️','🛤️','⛽','🛳️','⛵','🛶','🚤','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🏠','🏡','🏘️','🏚️','🏗️','🏢','🏭','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩️','🕋','⛲','⛺','🌁','🌃','🏙️','🌄','🌅','🌆','🌇','🌉','🗾','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️'],
  objects: ['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','🕹️','🗜️','💽','💾','💿','📀','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️','⌛','⏳','📡','🔋','🪫','🔌','💡','🔦','🕯️','🧯','🗑️','🛢️','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🪛','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔩','⚙️','🧱','⛓️','🧲','🔫','💣','🧨','🪓','🔪','🗡️','⚔️','🛡️','🚬','⚰️','🪦','⚱️','🏺','🔮','📿','🧿','🪬','💈','⚗️','🔭','🔬','🕳️','🩻','🩹','🩺','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡️','🧹','🪠','🧺','🧻','🚽','🚿','🛁','🪥','🪒','🧴','🧼','🫧','🪣','🧽','🧯','🛎️','🔑','🗝️','🚪','🪑','🛋️','🛏️','🛌','🧸','🪆','🖼️','🪞','🪟','🛍️','🛒','🎁','🎈','🎏','🎀','🪄','🪅','🎊','🎉','🎎','🏮','🎐','🧧','✉️','📩','📨','📧','💌','📮','📪','📫','📬','📭','📦','📯','📃','📜','📄','📑','🧾','✏️','🖊️','🖋️','✒️','🖌️','🖍️','📝','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗳️','📌','📍','📁','📂','🗂️','📅','📆','🗒️','🗓️','📇','📈','📉','📊','📋'],
  symbols: ['💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','💋','💯','💢','💥','💫','💦','💨','🕳️','💣','💬','👁️‍🗨️','🗨️','🗯️','💭','💤','♠️','♥️','♦️','♣️','🃏','🀄','🎴','🔇','🔈','🔉','🔊','📢','📣','📯','🔔','🔕','🎵','🎶','💹','🏧','🚮','🚰','♿','🚹','🚺','🚻','🚼','🚾','⚠️','🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢️','☣️','⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🛐','⚛️','🕉️','✡️','☸️','☯️','✝️','☦️','☪️','☮️','🕎','🔯','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔀','🔁','🔂','▶️','⏩','⏭️','⏯️','◀️','⏪','⏮️','🔼','⏫','🔽','⏬','⏸️','⏹️','⏺️','⏏️','🎦','🔅','🔆','📶','📳','📴'],
  flags: ['🏳️','🏴','🏁','🚩','🎌','🏴‍☠️','🇦🇷','🇧🇷','🇨🇱','🇨🇴','🇨🇷','🇨🇺','🇩🇴','🇪🇨','🇸🇻','🇬🇹','🇭🇳','🇲🇽','🇳🇮','🇵🇦','🇵🇾','🇵🇪','🇵🇷','🇺🇸','🇺🇾','🇻🇪','🇪🇸','🇫🇷','🇮🇹','🇩🇪','🇬🇧','🇯🇵','🇰🇷','🇨🇳','🇮🇳','🇷🇺','🇦🇺','🇨🇦','🇧🇪','🇳🇱','🇵🇹','🇸🇪','🇳🇴','🇩🇰','🇫🇮','🇬🇷','🇹🇷','🇮🇱','🇸🇦','🇦🇪','🇿🇦','🇳🇬','🇰🇪','🇲🇦','🇪🇬'],
};
const QUICK_REACTIONS = ['👍','❤️','😂','😮','😢','🙏'];

/* ===== STATE ===== */
let currentUser = null;
let socket = null;
let messages = [];
let isLoadingMore = false;
let hasMoreMessages = true;
let currentOffset = 0;
let replyTo = null;
let audioPlayers = {};
let recordingMediaRecorder = null;
let recordingChunks = [];
let recordingTimer = null;
let recordingSeconds = 0;
let recordingAnalyser = null;
let recordingDataArray = null;
let recordingAnimFrame = null;
let searchResults = [];
let searchIndex = -1;
let isAtBottom = true;
let unreadBelow = 0;
let recentEmojis = [];
let typingTimeout = null;
let isRecording = false;
let lastNotifyTime = 0;
let selectedMessages = new Set();
let isSelectMode = false;
let longPressTimer = null;
let longPressTriggered = false;
let swipeStartX = 0;
let swipeStartY = 0;
let fontSize = 'normal';
let isDark = true;
const FONT_SIZES = { small:12, normal:14, large:16, xlarge:18 };
const FONT_SIZES_META = { small:10, normal:11, large:12, xlarge:13 };

try { recentEmojis = JSON.parse(localStorage.getItem('wa_recent')||'[]'); } catch(e){}
try { fontSize = localStorage.getItem('wa_font')||'normal'; } catch(e){}
try { isDark = localStorage.getItem('wa_dark')!=='false'; } catch(e){}

/* ===== DOM REFS ===== */
const $ = id => document.getElementById(id);
const app = $('app');
const userSelector = $('user-selector');
const messagesList = $('messages-list');
const messagesContainer = $('messages-container');
const messageInput = $('message-input');
const sendBtn = $('send-btn');
const micBtn = $('mic-btn');
const emojiBtn = $('emoji-btn');
const emojiPicker = $('emoji-picker');
const emojiOverlay = $('emoji-overlay');
const emojiGrid = $('emoji-grid');
const emojiTabs = $('emoji-tabs');
const emojiSearch = $('emoji-search-input');
const clipBtn = $('clip-btn');
const attachSheet = $('attach-sheet');
const attachOverlay = $('attach-overlay');
const fileInput = $('file-input');
const documentInput = $('document-input');
const cameraInput = $('camera-input');
const imagePreview = $('image-preview');
const previewImg = $('preview-img');
const previewCaption = $('preview-caption');
const previewSend = $('preview-send-btn');
const previewClose = $('preview-close-btn');
const previewFilename = $('preview-filename');
const lightbox = $('lightbox');
const lightboxImg = $('lightbox-img');
const lightboxClose = $('lightbox-close-btn');
const lightboxContent = $('lightbox-content');
const actionMenu = $('action-menu');
const actionMenuOverlay = $('action-menu-overlay');
const inlineReactions = $('inline-reactions');
const replyPreview = $('reply-preview');
const replyPreviewSender = $('reply-preview-sender');
const replyPreviewText = $('reply-preview-text');
const replyClose = $('reply-close-btn');
const searchBar = $('search-bar');
const searchInput = $('search-input');
const searchCount = $('search-count');
const searchPrev = $('search-prev-btn');
const searchNext = $('search-next-btn');
const searchBtn = $('search-btn');
const searchClose = $('search-close-btn');
const scrollBottomBtn = $('scroll-bottom-btn');
const scrollBadge = $('scroll-badge');
const recordingOverlay = $('recording-overlay');
const recordingTimerEl = $('recording-timer');
const recordingWaveform = $('recording-waveform');
const recordingCancel = $('recording-cancel-area');
const recordingMicBtn = $('recording-mic-btn');
const headerAvatarText = $('header-avatar-text');
const headerName = $('header-name');
const headerSubtitle = $('header-subtitle');
const reconnectOverlay = $('reconnect-overlay');
const menuBtn = $('header-menu-btn');
const headerDropdown = $('header-dropdown');
const actionBar = $('action-bar');
const actionBarCount = $('action-bar-count');
const actionBarBack = $('action-bar-back');
const settingsPanel = $('settings-panel');
const settingsOverlay = $('settings-overlay');
const settingsBack = $('settings-back');
const themeToggle = $('theme-toggle');
const settingsName = $('settings-name');

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  applyFontSize();
  const saved = localStorage.getItem('wa_user');
  if (saved && (saved==='Facu'||saved==='Rocío')) selectUser(saved);
  bindEvents();
});

/* ===== THEME ===== */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeToggle) themeToggle.classList.toggle('on', isDark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = isDark ? '#0b141a' : '#075e54';
}

function applyFontSize() {
  const size = FONT_SIZES[fontSize]||14;
  const meta = FONT_SIZES_META[fontSize]||11;
  document.documentElement.style.setProperty('--msg-font-size', size+'px');
  document.documentElement.style.setProperty('--msg-meta-size', meta+'px');
}

/* ===== SELECT USER ===== */
function selectUser(username) {
  currentUser = username;
  localStorage.setItem('wa_user', username);
  userSelector.classList.add('hidden');
  app.classList.remove('hidden');
  document.title = `Chat — ${currentUser}`;

  const other = username==='Facu'?'Rocío':'Facu';
  headerAvatarText.textContent = other[0];
  headerAvatarText.parentElement.style.background = other==='Facu'?'#5f9ef0':'#d47bcd';
  headerName.textContent = other;
  if (settingsName) settingsName.textContent = username;
  connectSocket();
}

/* ===== SOCKET ===== */
function connectSocket() {
  socket = io({ reconnectionAttempts:Infinity, reconnectionDelay:1000 });

  socket.on('connect', () => {
    reconnectOverlay.classList.remove('show');
    socket.emit('register', currentUser);
    loadMessages(true);
  });

  socket.on('disconnect', () => { reconnectOverlay.classList.add('show'); setStatus('desconectado'); });
  socket.on('reconnect_error', () => { reconnectOverlay.classList.add('show'); });

  socket.on('presence', (data) => {
    if (data.user!==currentUser) {
      setStatus(data.online?'en línea':'desconectado', data.online?'online':'');
    }
  });

  socket.on('message_sent', (m) => updateMsgStatus(m.id,'sent'));
  socket.on('message_delivered', (d) => updateMsgStatus(d.id,'delivered'));
  socket.on('message_read', (d) => updateMsgStatus(d.id,'read',d.user));

  socket.on('new_message', (msg) => {
    addMessage(msg);
    markAsRead(msg);
    if (msg.sender!==currentUser && document.hidden && Date.now()-lastNotifyTime>3000) {
      lastNotifyTime = Date.now();
      if ('Notification' in window && Notification.permission==='granted') {
        new Notification(msg.sender, { body: msg.type==='text'?msg.content:'Te envió un '+msg.type, tag:'wa-chat' });
      }
      document.title = `● ${currentUser}`;
    }
    if (isAtBottom) scrollToBottom();
    else { unreadBelow++; updateScrollBtn(); }
  });

  socket.on('reaction_updated', (d) => {
    const el = document.querySelector(`[data-msg-id="${d.messageId}"]`);
    if (el) {
      const old = el.querySelector('.bubble-reactions');
      if (old) old.replaceWith(renderReactions(d.messageId,d.reactions));
      else el.appendChild(renderReactions(d.messageId,d.reactions));
    }
    const msg = messages.find(m=>m.id===d.messageId);
    if (msg) msg.reactions = d.reactions;
  });

  socket.on('message_deleted', (d) => {
    if (d.forEveryone) {
      const el = document.querySelector(`[data-msg-id="${d.id}"]`);
      if (el) {
        const b = el.querySelector('.bubble');
        if (b) {
          const f = b.querySelector('.bubble-meta');
          b.innerHTML = '<div class="bubble-text" style="font-style:italic;color:var(--txt-muted)">🚫 Se eliminó este mensaje</div>';
          if (f) b.appendChild(f);
        }
      }
    } else { const el=document.querySelector(`[data-msg-id="${d.id}"]`); if(el) el.remove(); messages=messages.filter(m=>m.id!==d.id); }
  });

  socket.on('clear', () => { messages=[]; messagesList.innerHTML=''; currentOffset=0; hasMoreMessages=true; });

  let typingClear;
  socket.on('typing', (d) => {
    if (d.user!==currentUser) {
      if (d.typing) { setStatus('escribiendo','typing'); clearTimeout(typingClear); }
      else { typingClear=setTimeout(()=>setStatus('en línea','online'),1000); }
    }
  });

  socket.on('unread_count', (d) => { if(d.count>0) document.title=`(${d.count}) ● ${currentUser}`; });
}

/* ===== STATUS ===== */
function setStatus(text, cls='') {
  headerSubtitle.textContent = text;
  headerSubtitle.className = 'header-subtitle'+(cls?' '+cls:'');
}

/* ===== MESSAGES ===== */
async function loadMessages(reset) {
  if (reset) { currentOffset=0; hasMoreMessages=true; messages=[]; }
  if (!hasMoreMessages||isLoadingMore) return;
  isLoadingMore = true;

  try {
    const res = await fetch(`/api/messages?offset=${currentOffset}&limit=50`);
    const data = await res.json();
    if (data.length<50) hasMoreMessages = false;

    if (reset) {
      messages = data;
      renderMessages();
    } else {
      const prev = messagesContainer.scrollHeight;
      messages = [...data, ...messages];
      renderMessages();
      messagesContainer.scrollTop = messagesContainer.scrollHeight - prev;
    }
    currentOffset += data.length;
  } catch(e) { console.error(e); }
  finally { isLoadingMore=false; $('messages-loading').classList.add('hidden'); }
  scrollToBottom();
}

function renderMessages() {
  if (!messages.length) {
    messagesList.innerHTML = '<div style="text-align:center;color:var(--txt-muted);padding:60px 20px;font-size:14px;line-height:1.8;">Enviense un mensaje 💕</div>';
    return;
  }
  let html = '';
  let lastDate = null;
  let lastSender = null;
  let lastOwn = null;

  for (let i=0; i<messages.length; i++) {
    const msg = messages[i];
    const d = new Date(msg.timestamp);
    const dk = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    if (dk!==lastDate) {
      html += `<div class="date-separator"><span>${fmtDate(d)}</span></div>`;
      lastDate = dk; lastSender = null;
    }

    const own = msg.sender===currentUser;
    const consec = lastSender===msg.sender && lastOwn===own && i>0 && (msg.timestamp-messages[i-1].timestamp)<120000;
    const sel = selectedMessages.has(msg.id);
    const side = own?'out':'in';

    html += `<div class="msg-row ${side}${consec?' grouped':''}${sel?' selected':''}" data-msg-id="${msg.id}" data-sender="${msg.sender}" data-timestamp="${msg.timestamp}">`;

    html += `<div class="bubble-wrap">`;

    // Select overlay
    if (isSelectMode) {
      html += `<div class="message-select-overlay" onclick="toggleSelect('${msg.id}')"><div class="select-checkbox${sel?' checked':''}">${sel?'✓':''}</div></div>`;
    }

    html += `<div class="bubble">`;

    // Reply quote
    if (msg.replyTo) {
      const rc = msg.replyTo.content||'';
      html += `<div class="bubble-reply" onclick="scrollToMsg('${msg.replyTo.id}')">
        <div class="reply-sender">${esc(msg.replyTo.sender||'')}</div>
        <div class="reply-text">${esc(rc.length>80?rc.substring(0,80)+'…':rc)}</div>
      </div>`;
    }

    // Content
    if (msg.deleted) {
      html += `<div class="bubble-text" style="font-style:italic;color:var(--txt-muted)">🚫 Se eliminó este mensaje</div>`;
    } else if (msg.type==='text') {
      html += `<div class="bubble-text">${esc(msg.content).replace(/\n/g,'<br>')}</div>`;
    } else if (msg.type==='image') {
      html += `<div class="bubble-img-wrap"><img src="${msg.content}" class="bubble-img" onclick="openLightbox('${msg.content.replace(/'/g,"\\'")}')" alt="Foto" loading="lazy"></div>`;
    } else if (msg.type==='video') {
      html += `<div class="bubble-img-wrap"><video src="${msg.content}" class="bubble-img" controls playsinline preload="metadata"></video></div>`;
    } else if (msg.type==='audio') {
      html += renderAudio(msg);
    } else if (msg.type==='sticker') {
      html += `<img src="${msg.content}" class="bubble-img" style="max-width:160px" alt="Sticker" loading="lazy">`;
    } else if (msg.type==='document') {
      html += renderDoc(msg);
    }

    // Meta footer
    html += `<div class="bubble-meta">`;
    if (msg.edited) html += `<span class="bubble-time" style="margin-right:4px;font-style:italic">editado</span>`;
    html += `<span class="bubble-time">${fmtTime(msg.timestamp)}</span>`;
    if (own) html += renderTicks(msg);
    html += `</div></div>`;

    // Reactions
    if (msg.reactions&&msg.reactions.length>0) {
      html += `<div class="bubble-reactions">`;
      const g={};
      msg.reactions.forEach(r=>{g[r.emoji]=(g[r.emoji]||0)+1;});
      Object.entries(g).forEach(([e,c])=>{
        const a = msg.reactions.some(r=>r.emoji===e&&r.user===currentUser);
        html += `<div class="reaction-pill${a?' active':''}" onclick="toggleReaction('${msg.id}','${e}')">${e}${c>1?` <span class="reaction-count">${c}</span>`:''}</div>`;
      });
      html += `</div>`;
    }

    html += `</div></div>`;
    lastSender = msg.sender;
    lastOwn = own;
  }
  messagesList.innerHTML = html;
}

/* ===== HELPERS ===== */
function esc(t) { const d=document.createElement('div'); d.textContent=t; return d.innerHTML; }
function fmtTime(ts) { return new Date(ts).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}); }
function fmtDate(d) {
  const t=new Date();
  if (d.getDate()===t.getDate()&&d.getMonth()===t.getMonth()&&d.getFullYear()===t.getFullYear()) return 'Hoy';
  const y=new Date(t); y.setDate(y.getDate()-1);
  if (d.getDate()===y.getDate()&&d.getMonth()===y.getMonth()&&d.getFullYear()===y.getFullYear()) return 'Ayer';
  return d.toLocaleDateString('es-ES',{day:'numeric',month:'long'}).replace(/de /g,'');
}
function fmtSize(b) { if(!b) return ''; if(b<1024) return b+' B'; if(b<1048576) return (b/1024).toFixed(1)+' KB'; return (b/1048576).toFixed(1)+' MB'; }
function fmtDur(s) { const m=Math.floor(s/60); return m+':'+(s%60).toString().padStart(2,'0'); }

function renderTicks(msg) {
  let s = 'sent';
  if (msg.readBy&&msg.readBy.length>0) s='read';
  else if (msg.delivered) s='delivered';
  if (s==='read') return `<span class="bubble-ticks"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-read"><path d="M11.5.5l-6 6-3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 6.5l2-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14.5.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  if (s==='delivered') return `<span class="bubble-ticks"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-received"><path d="M11.5.5l-6 6-3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 6.5l2-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14.5.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  return `<span class="bubble-ticks"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-sent"><path d="M11.5.5l-6 6L3.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}

function renderDoc(msg) {
  const ext = (msg.fileName||'').split('.').pop().toLowerCase();
  const icons = {pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',zip:'📦',rar:'📦',mp4:'🎬',mp3:'🎵',jpg:'🖼️',jpeg:'🖼️',png:'🖼️',gif:'🖼️'};
  const icon = icons[ext]||'📎';
  return `<div class="bubble-doc"><div class="doc-icon">${icon}</div><div class="doc-info"><div class="doc-name">${esc(msg.fileName||'Documento')}</div><div class="doc-size">${fmtSize(msg.fileSize)}</div></div></div>`;
}

/* ===== AUDIO ===== */
function renderAudio(msg) {
  const bars = Array(30).fill(0).map((_,i)=>`<div class="audio-bar" style="height:${3+Math.random()*18}px" data-wave="${i}"></div>`).join('');
  return `<div class="bubble-audio">
    <button class="audio-play-btn" onclick="toggleAudio(event,'${msg.id}')" aria-label="Reproducir">
      <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
    </button>
    <div class="audio-waveform" id="wave-${msg.id}">${bars}</div>
    <span class="audio-duration" id="dur-${msg.id}">${fmtDur(msg.duration||0)}</span>
  </div>`;
}

function toggleAudio(e,id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const msg = messages.find(m=>m.id===id);
  if (!msg) return;

  if (audioPlayers[id]) {
    if (!audioPlayers[id].paused) { audioPlayers[id].pause(); btn.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'; }
    else { audioPlayers[id].play(); btn.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'; }
    return;
  }

  const audio = new Audio(msg.content);
  audioPlayers[id] = audio;
  audio.play().catch(()=>{});
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

  audio.addEventListener('timeupdate',()=>{
    const dur = audio.duration||msg.duration||1;
    const p = audio.currentTime/dur;
    document.querySelectorAll(`#wave-${id} .audio-bar`).forEach((b,i)=>{b.classList.toggle('playing',i/30<=p);});
    const de = document.getElementById(`dur-${id}`);
    if (de) de.textContent = fmtDur(audio.currentTime);
  });

  audio.addEventListener('ended',()=>{
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
    const de = document.getElementById(`dur-${id}`);
    if (de) de.textContent = fmtDur(msg.duration||0);
    document.querySelectorAll(`#wave-${id} .audio-bar`).forEach(b=>b.classList.remove('playing'));
    delete audioPlayers[id];
  });
}

function cycleSpeed(e,id) {
  e.stopPropagation();
  const a = audioPlayers[id];
  if (!a) return;
  const speeds = [1,1.5,2];
  const c = parseFloat(e.currentTarget.textContent);
  const n = speeds[(speeds.indexOf(c)+1)%speeds.length];
  a.playbackRate = n;
  e.currentTarget.textContent = n+'×';
}

/* ===== REACTIONS ===== */
function renderReactions(mid,reactions) {
  const c = document.createElement('div'); c.className = 'bubble-reactions';
  const g={}; reactions.forEach(r=>{g[r.emoji]=(g[r.emoji]||0)+1;});
  Object.entries(g).forEach(([e,count])=>{
    const a = reactions.some(r=>r.emoji===e&&r.user===currentUser);
    const p = document.createElement('div');
    p.className = `reaction-pill${a?' active':''}`;
    p.onclick = ()=>toggleReaction(mid,e);
    p.innerHTML = `${e}${count>1?` <span class="reaction-count">${count}</span>`:''}`;
    c.appendChild(p);
  });
  return c;
}

function toggleReaction(mid,emoji) {
  const msg = messages.find(m=>m.id===mid);
  if (!msg) return;
  const ex = msg.reactions?.find(r=>r.emoji===emoji&&r.user===currentUser);
  socket.emit(ex?'remove_reaction':'add_reaction',{messageId:mid,emoji,user:currentUser});
}

/* ===== ADD / UPDATE MESSAGE ===== */
function addMessage(msg) {
  if (messages.some(m=>m.id===msg.id)) return;
  messages.push(msg);
  messages.sort((a,b)=>a.timestamp-b.timestamp);
  renderMessages();
  if (isAtBottom) scrollToBottom();
}

function updateMsgStatus(id,status,user) {
  const msg = messages.find(m=>m.id===id);
  if (!msg) return;
  if (status==='sent') msg.status='sent';
  else if (status==='delivered') msg.delivered=true;
  else if (status==='read') {
    if (!msg.readBy) msg.readBy=[];
    if (user&&!msg.readBy.some(r=>r.user===user)) msg.readBy.push({user,at:Date.now()});
  }
  const el = document.querySelector(`[data-msg-id="${id}"]`);
  if (el&&msg.sender===currentUser) {
    const f = el.querySelector('.bubble-meta');
    if (f) { const t=f.querySelector('.bubble-ticks'); if(t) t.outerHTML=renderTicks(msg); }
  }
}

function markAsRead(msg) {
  if (msg.sender!==currentUser) {
    socket.emit('mark_read',{messageId:msg.id,user:currentUser});
    document.title = `Chat — ${currentUser}`;
  }
}

/* ===== SEND ===== */
function sendMessage(type,content,extra={}) {
  if (!currentUser||(!content&&type==='text')) return;
  const id = `msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
  const msg = { id, sender:currentUser, type, content, timestamp:Date.now(), replyTo:replyTo||null, reactions:[], readBy:[], ...extra };
  messages.push(msg);
  renderMessages();
  scrollToBottom();
  resetInput();

  socket.emit('send_message',{
    id, sender:currentUser, type, content, timestamp:msg.timestamp,
    replyTo:replyTo?{id:replyTo.id,sender:replyTo.sender,content:replyTo.content,type:replyTo.type}:null,
    fileName:extra.fileName, fileSize:extra.fileSize, mimeType:extra.mimeType, duration:extra.duration,
  });

  replyTo=null; replyPreview.classList.add('hidden');
}

function resetInput() {
  messageInput.value=''; messageInput.style.height='auto'; sendBtn.classList.add('hidden'); micBtn.classList.remove('hidden');
}

/* ===== EVENTS ===== */
function bindEvents() {
  document.querySelectorAll('.user-btn').forEach(b=>b.addEventListener('click',()=>selectUser(b.dataset.user)));

  messageInput.addEventListener('input',()=>{
    messageInput.style.height='auto'; messageInput.style.height=Math.min(messageInput.scrollHeight,120)+'px';
    if (messageInput.value.trim()) { sendBtn.classList.remove('hidden'); micBtn.classList.add('hidden'); }
    else { sendBtn.classList.add('hidden'); micBtn.classList.remove('hidden'); }
    if (socket&&socket.connected) {
      clearTimeout(typingTimeout);
      socket.emit('typing',{user:currentUser,typing:true});
      typingTimeout=setTimeout(()=>socket.emit('typing',{user:currentUser,typing:false}),2000);
    }
  });

  messageInput.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();const t=messageInput.value.trim();if(t)sendMessage('text',t);} });
  sendBtn.addEventListener('click',()=>{const t=messageInput.value.trim();if(t)sendMessage('text',t);});

  emojiBtn.addEventListener('click',()=>{ closeAttach(); toggleEmoji(); });
  emojiOverlay.addEventListener('click',closeEmoji);
  emojiSearch.addEventListener('input',()=>buildEmoji());

  clipBtn.addEventListener('click',()=>{ closeEmoji(); toggleAttach(); });
  attachOverlay.addEventListener('click',closeAttach);

  document.querySelectorAll('.attach-option').forEach(o=>{
    o.addEventListener('click',()=>{
      closeAttach();
      const t=o.dataset.type;
      if (t==='gallery') fileInput.click();
      else if (t==='document') documentInput.click();
      else if (t==='camera') cameraInput.click();
    });
  });

  fileInput.addEventListener('change',handleFileSelect);
  documentInput.addEventListener('change',handleDocSelect);
  cameraInput.addEventListener('change',e=>{if(e.target.files?.[0])handleFiles([e.target.files[0]],'image');});

  previewClose.addEventListener('click',()=>imagePreview.classList.add('hidden'));
  previewSend.addEventListener('click',sendPreview);
  previewCaption.addEventListener('keydown',e=>{if(e.key==='Enter')sendPreview();});

  lightboxClose.addEventListener('click',()=>lightbox.classList.add('hidden'));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.add('hidden');});

  replyClose.addEventListener('click',()=>{replyTo=null;replyPreview.classList.add('hidden');});

  // Search
  searchBtn.addEventListener('click',()=>{ searchBar.classList.toggle('hidden'); if(!searchBar.classList.contains('hidden'))searchInput.focus(); });
  searchClose.addEventListener('click',()=>{ searchBar.classList.add('hidden'); searchInput.value=''; clearSearch(); });
  searchInput.addEventListener('input',doSearch);
  searchPrev.addEventListener('click',()=>navSearch(-1));
  searchNext.addEventListener('click',()=>navSearch(1));

  // Scroll
  messagesContainer.addEventListener('scroll',handleScroll);
  scrollBottomBtn.addEventListener('click',()=>{scrollToBottom();unreadBelow=0;updateScrollBtn();});

  // Mic / Recording
  micBtn.addEventListener('mousedown',startRec);
  micBtn.addEventListener('touchstart',startRec,{passive:true});
  recordingCancel.addEventListener('click',cancelRec);

  // Header menu
  menuBtn.addEventListener('click',e=>{e.stopPropagation();headerDropdown.classList.toggle('hidden');});
  document.addEventListener('click',e=>{if(!headerDropdown.contains(e.target)&&e.target!==menuBtn)headerDropdown.classList.add('hidden');});
  document.querySelectorAll('.header-dropdown-item').forEach(item=>{
    item.addEventListener('click',()=>{
      headerDropdown.classList.add('hidden');
      const a=item.dataset.action;
      if (a==='search')searchBtn.click();
      else if (a==='settings')openSettings();
      else if (a==='mute')alert('Notificaciones silenciadas (simulado)');
      else if (a==='wallpaper')alert('Fondo de pantalla (próximamente)');
      else if (a==='profile')alert(`Chat con ${headerName.textContent}`);
    });
  });

  // Settings
  settingsBack.addEventListener('click',closeSettings);
  settingsOverlay.addEventListener('click',closeSettings);
  themeToggle.addEventListener('click',()=>{isDark=!isDark;localStorage.setItem('wa_dark',isDark);applyTheme();});
  document.querySelectorAll('.font-size-opt').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.font-size-opt').forEach(o=>o.classList.remove('active'));
      b.classList.add('active');
      fontSize=b.dataset.size;
      localStorage.setItem('wa_font',fontSize);
      applyFontSize();
      renderMessages();
    });
  });
  $('settings-logout')?.addEventListener('click',()=>{localStorage.removeItem('wa_user');location.reload();});
  $('open-wallpaper')?.addEventListener('click',()=>alert('Galería de wallpapers (próximamente)'));

  // Action bar
  actionBarBack.addEventListener('click',clearSelect);

  // Long press + touch events on messages container
  messagesList.addEventListener('touchstart',onTouchStart,{passive:true});
  messagesList.addEventListener('touchmove',onTouchMove,{passive:true});
  messagesList.addEventListener('touchend',onTouchEnd,{passive:true});
  messagesList.addEventListener('mousedown',onMouseDown);
  messagesList.addEventListener('mousemove',onMouseMove);
  messagesList.addEventListener('mouseup',onMouseUp);
  messagesList.addEventListener('mouseleave',onMouseUp);

  // Screen resize
  window.addEventListener('resize',()=>{ if(isAtBottom)scrollToBottom(); });
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize',()=>{
      if (isAtBottom) setTimeout(scrollToBottom,100);
    });
  }
}

/* ===== EMOJI ===== */
function toggleEmoji() {
  emojiPicker.classList.toggle('hidden');
  emojiOverlay.classList.toggle('hidden');
  if (!emojiPicker.classList.contains('hidden')) buildEmoji();
  else { messageInput.focus(); }
}

function closeEmoji() { emojiPicker.classList.add('hidden'); emojiOverlay.classList.add('hidden'); }

function buildEmoji(cat) {
  const cur = cat||'recent';
  emojiGrid.innerHTML = '';
  let emojis = [];
  if (emojiSearch.value.trim()) {
    const q = emojiSearch.value.toLowerCase();
    emojis = Object.values(EMOJI_MAP).flat().filter(e=>e.includes(q)).slice(0,60);
  } else if (cur==='recent') {
    emojis = recentEmojis.length?recentEmojis:['😊','❤️','😂','😍','🥰','💕','👍','😘','🔥','✨','🥺','💖','🤣','🙏'];
  } else {
    emojis = EMOJI_MAP[cur]||[];
  }
  emojis.forEach(e=>{
    const btn=document.createElement('button');
    btn.textContent=e;
    btn.onclick=()=>selectEmoji(e);
    emojiGrid.appendChild(btn);
  });
  emojiTabs.innerHTML = '';
  EMOJI_CATEGORIES.forEach(c=>{
    const t=document.createElement('button');
    t.className=`emoji-tab${c.key===cur?' active':''}`;
    t.textContent=c.icon; t.title=c.name;
    t.onclick=()=>buildEmoji(c.key);
    emojiTabs.appendChild(t);
  });
}

function selectEmoji(emoji) {
  recentEmojis = [emoji,...recentEmojis.filter(e=>e!==emoji)].slice(0,24);
  localStorage.setItem('wa_recent',JSON.stringify(recentEmojis));
  if (!inlineReactions.classList.contains('hidden')&&inlineReactions.dataset.msgId) {
    toggleReaction(inlineReactions.dataset.msgId,emoji);
    hideInlineReactions();
    return;
  }
  const start=messageInput.selectionStart,end=messageInput.selectionEnd;
  messageInput.value = messageInput.value.substring(0,start)+emoji+messageInput.value.substring(end);
  messageInput.selectionStart=messageInput.selectionEnd=start+emoji.length;
  messageInput.dispatchEvent(new Event('input'));
}

/* ===== ATTACHMENT ===== */
function toggleAttach() { attachSheet.classList.toggle('hidden'); attachOverlay.classList.toggle('hidden'); }
function closeAttach() { attachSheet.classList.add('hidden'); attachOverlay.classList.add('hidden'); }

/* ===== FILES ===== */
function handleFileSelect(e) { if(e.target.files?.length) handleFiles(Array.from(e.target.files)); e.target.value=''; }
function handleDocSelect(e) { const f=e.target.files?.[0]; if(f){e.target.value='';uploadAndSend(f,'document');} }

function handleFiles(files,force) {
  const f=files[0]; if(!f) return;
  const isImg=force==='image'||f.type.startsWith('image/');
  const isVid=force==='video'||f.type.startsWith('video/');
  if (isImg||isVid) {
    const r=new FileReader();
    r.onload=e=>{
      previewImg.src=e.target.result;
      previewFilename.textContent=f.name;
      previewImg.dataset.fileType=isVid?'video':'image';
      previewImg.dataset.fileName=f.name;
      previewImg.dataset.fileSize=f.size;
      previewImg.dataset.mimeType=f.type;
      imagePreview.classList.remove('hidden');
    };
    r.readAsDataURL(f);
  } else { uploadAndSend(f,'document'); }
}

function sendPreview() {
  const type=previewImg.dataset.fileType||'image';
  sendMessage(type,previewImg.src,{
    fileName:previewImg.dataset.fileName, fileSize:parseInt(previewImg.dataset.fileSize)||0, mimeType:previewImg.dataset.mimeType,
  });
  const cap=previewCaption.value.trim();
  if (cap) setTimeout(()=>sendMessage('text',cap),100);
  imagePreview.classList.add('hidden'); previewCaption.value='';
}

function uploadAndSend(file,type) {
  const r=new FileReader();
  r.onload=e=>sendMessage(type,e.target.result,{fileName:file.name,fileSize:file.size,mimeType:file.type});
  r.readAsDataURL(file);
}

/* ===== LIGHTBOX ===== */
function openLightbox(src) { lightboxImg.src=src; lightbox.classList.remove('hidden'); }

/* ===== SEARCH ===== */
function doSearch() {
  const q=searchInput.value.trim().toLowerCase(); clearSearch();
  if (!q) { searchCount.textContent=''; return; }
  searchResults = [];
  document.querySelectorAll('.msg-row').forEach(el=>{
    if (el.textContent.toLowerCase().includes(q)) {
      searchResults.push(el);
      el.querySelectorAll('.bubble-text').forEach(t=>{
        const safe=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        t.innerHTML = t.textContent.replace(new RegExp(`(${safe})`,'gi'),'<mark style="background:#fff3a8;padding:0 2px;border-radius:2px;color:#111">$1</mark>');
      });
    }
  });
  searchIndex=-1;
  searchCount.textContent = searchResults.length?`0 / ${searchResults.length}`:'Sin resultados';
  navSearch(1);
}

function navSearch(dir) {
  if (!searchResults.length) return;
  if (searchResults[searchIndex]) searchResults[searchIndex].style.background='';
  searchIndex = (searchIndex+dir+searchResults.length)%searchResults.length;
  const el=searchResults[searchIndex];
  el.scrollIntoView({behavior:'smooth',block:'center'});
  el.style.transition='background 0.5s'; el.style.background='#d9fdd3';
  setTimeout(()=>{el.style.background='';},2000);
  searchCount.textContent=`${searchIndex+1} / ${searchResults.length}`;
}

function clearSearch() {
  document.querySelectorAll('.msg-row mark').forEach(m=>{const p=m.closest('.bubble-text');if(p)p.innerHTML=p.textContent;});
  searchResults=[];
}

/* ===== SCROLL ===== */
function handleScroll() {
  const {scrollTop,scrollHeight,clientHeight}=messagesContainer;
  isAtBottom = scrollHeight-scrollTop-clientHeight<50;
  updateScrollBtn();
  if (scrollTop<100&&!isLoadingMore&&hasMoreMessages) loadMessages(false);
  if (isAtBottom) { unreadBelow=0; updateScrollBtn(); }
}

function scrollToBottom() { messagesContainer.scrollTo({top:messagesContainer.scrollHeight,behavior:'smooth'}); }

function updateScrollBtn() {
  if (isAtBottom) { scrollBottomBtn.classList.add('hidden'); return; }
  scrollBottomBtn.classList.remove('hidden');
  if (unreadBelow>0) { scrollBadge.textContent=unreadBelow; scrollBadge.classList.remove('hidden'); }
  else { scrollBadge.classList.add('hidden'); }
}

/* ===== RECORDING ===== */
function startRec(e) {
  if (messageInput.value.trim()) return;
  const touch = e.touches?.[0];
  if (!touch&&e.type==='touchstart') return;
  e.preventDefault();
  if (isRecording) return;

  navigator.vibrate?.(50);

  (async()=>{
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      isRecording = true;
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?'audio/webm;codecs=opus':'audio/webm';

      recordingMediaRecorder = new MediaRecorder(stream,{mimeType:mime});
      recordingChunks = [];

      // Analyser for waveform
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      recordingAnalyser = analyser;
      recordingDataArray = new Uint8Array(analyser.frequencyBinCount);

      // Waveform bars
      recordingWaveform.innerHTML = '';
      for (let i=0;i<20;i++) {
        const bar=document.createElement('div');
        bar.className='rec-bar';
        recordingWaveform.appendChild(bar);
      }

      recordingMediaRecorder.ondataavailable = e=>{if(e.data.size>0)recordingChunks.push(e.data);};

      recordingMediaRecorder.onstop = ()=>{
        if (recordingChunks.length>0) {
          const blob = new Blob(recordingChunks,{type:'audio/webm'});
          const r=new FileReader();
          r.onload=()=>sendMessage('audio',r.result,{duration:recordingSeconds,mimeType:'audio/webm'});
          r.readAsDataURL(blob);
        }
        stream.getTracks().forEach(t=>t.stop());
        ctx.close();
        recordingOverlay.classList.add('hidden');
        isRecording=false;
        if (recordingAnimFrame) cancelAnimationFrame(recordingAnimFrame);
      };

      recordingMediaRecorder.start();
      recordingSeconds = 0;
      recordingTimerEl.textContent = '0:00';
      recordingOverlay.classList.remove('hidden');

      recordingTimer = setInterval(()=>{recordingSeconds++;recordingTimerEl.textContent=fmtDur(recordingSeconds);},1000);

      // Waveform animation
      function drawWave() {
        if (!recordingAnalyser) return;
        recordingAnalyser.getByteTimeDomainData(recordingDataArray);
        const bars = recordingWaveform.querySelectorAll('.rec-bar');
        bars.forEach((bar,i)=>{
          const v = (recordingDataArray[i]||128)/128;
          bar.style.height = Math.max(3, v*20)+'px';
        });
        recordingAnimFrame = requestAnimationFrame(drawWave);
      }
      drawWave();

      // Swipe to cancel
      let startX = touch?.clientX||e.clientX;
      const onMove = (ev)=>{
        const x = ev.touches?.[0]?.clientX||ev.clientX;
        const dx = startX - x;
        if (dx>100) cancelRec();
      };
      const onEnd = ()=>{
        document.removeEventListener('touchmove',onMove);
        document.removeEventListener('touchend',onEnd);
        document.removeEventListener('mousemove',onMove);
        document.removeEventListener('mouseup',onEnd);
        if (isRecording&&recordingMediaRecorder?.state==='recording') recordingMediaRecorder.stop();
      };
      document.addEventListener('touchmove',onMove,{passive:true});
      document.addEventListener('touchend',onEnd,{passive:true});
      document.addEventListener('mousemove',onMove);
      document.addEventListener('mouseup',onEnd);

    } catch(err) {
      console.error(err);
      recordingOverlay.classList.add('hidden');
      isRecording=false;
    }
  })();
}

function cancelRec() {
  if (recordingMediaRecorder?.state==='recording') {
    recordingMediaRecorder.ondataavailable = null;
    recordingMediaRecorder.stop();
  }
  clearInterval(recordingTimer);
  recordingOverlay.classList.add('hidden');
  isRecording=false;
  if (recordingAnimFrame) cancelAnimationFrame(recordingAnimFrame);
}

/* ===== LONG PRESS / TOUCH HANDLING ===== */
let touchTarget = null;
let touchStartTime = 0;
let touchMoved = false;
let touchStartX2 = 0;
let touchStartY2 = 0;

function onTouchStart(e) {
  const msgEl = e.target.closest('.msg-row');
  if (!msgEl) return;
  touchTarget = msgEl;
  touchStartTime = Date.now();
  touchMoved = false;
  touchStartX2 = e.touches[0].clientX;
  touchStartY2 = e.touches[0].clientY;
  longPressTriggered = false;

  // Swipe to reply
  swipeStartX = touchStartX2;

  longPressTimer = setTimeout(()=>{
    if (!touchMoved&&touchTarget&&!isSelectMode) {
      longPressTriggered = true;
      navigator.vibrate?.(30);
      showInlineReactions(touchTarget);
    }
  },500);
}

function onTouchMove(e) {
  if (!touchTarget) return;
  const touch = e.touches[0];
  const dx = Math.abs(touch.clientX - touchStartX2);
  const dy = Math.abs(touch.clientY - touchStartY2);
  if (dx>10||dy>10) touchMoved = true;

  if (longPressTimer&&touchMoved) { clearTimeout(longPressTimer); longPressTimer=null; }

  // Swipe to reply
  if (!longPressTriggered&&!isSelectMode) {
    const sx = touch.clientX - swipeStartX;
    if (sx>60&&!touchMoved) {
      const msgId = touchTarget.dataset.msgId;
      if (msgId) {
        const msg = messages.find(m=>m.id===msgId);
        if (msg) { setReplyTo(msg); touchMoved=true; }
      }
    }
  }
}

function onTouchEnd(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer=null; }
  if (!touchMoved&&!longPressTriggered&&touchTarget&&Date.now()-touchStartTime<300) {
    // Tap — if select mode, toggle select
    if (isSelectMode) {
      const id = touchTarget.dataset.msgId;
      if (id) toggleSelect(id);
    }
  }
  touchTarget = null;
}

function onMouseDown(e) {
  const msgEl = e.target.closest('.msg-row');
  if (!msgEl||e.button!==0) return;
  touchTarget = msgEl;
  touchStartTime = Date.now();
  touchMoved = false;
  longPressTriggered = false;

  longPressTimer = setTimeout(()=>{
    if (!touchMoved&&touchTarget&&!isSelectMode) {
      longPressTriggered = true;
      navigator.vibrate?.(30);
      showInlineReactions(touchTarget);
    }
  },500);
}

function onMouseMove(e) {
  if (touchTarget) {
    const dx = Math.abs(e.clientX - touchStartX2||0);
    if (dx>10) touchMoved=true;
    if (longPressTimer&&touchMoved) { clearTimeout(longPressTimer); longPressTimer=null; }
  }
}

function onMouseUp(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer=null; }
  if (!touchMoved&&!longPressTriggered&&touchTarget&&Date.now()-touchStartTime<300) {
    if (isSelectMode) {
      const id = touchTarget.dataset.msgId;
      if (id) toggleSelect(id);
    }
  }
  touchTarget = null;
}

/* ===== INLINE REACTIONS ===== */
function showInlineReactions(msgEl) {
  const id = msgEl.dataset.msgId;
  if (!id) return;
  const rect = msgEl.getBoundingClientRect();
  inlineReactions.innerHTML = '';
  inlineReactions.dataset.msgId = id;
  QUICK_REACTIONS.forEach(e=>{
    const btn=document.createElement('button');
    btn.textContent=e;
    btn.onclick=(ev)=>{ev.stopPropagation();toggleReaction(id,e);hideInlineReactions();};
    inlineReactions.appendChild(btn);
  });
  const more=document.createElement('button');
  more.className='more-reactions'; more.textContent='+';
  more.onclick=()=>{hideInlineReactions();closeEmoji();emojiPicker.classList.remove('hidden');emojiOverlay.classList.remove('hidden');buildEmoji();};
  inlineReactions.appendChild(more);

  inlineReactions.classList.remove('hidden');
  const isOwn = msgEl.classList.contains('own');
  const menuW = 260;
  let left = isOwn ? rect.right - menuW - 8 : rect.left + 8;
  if (left<8) left=8;
  if (left+menuW>window.innerWidth-8) left=window.innerWidth-menuW-8;
  inlineReactions.style.left = left+'px';
  inlineReactions.style.top = (rect.top-50)+'px';

  // Auto-hide
  setTimeout(()=>{
    document.addEventListener('click',hideInlineReactions,{once:true});
  },0);
}

function hideInlineReactions() {
  inlineReactions.classList.add('hidden');
  inlineReactions.dataset.msgId = '';
}

/* ===== SELECT MODE ===== */
function toggleSelect(id) {
  if (selectedMessages.has(id)) selectedMessages.delete(id);
  else selectedMessages.add(id);
  actionBarCount.textContent = selectedMessages.size+' seleccionados';
  renderMessages();
  if (selectedMessages.size===0) clearSelect();
}

function clearSelect() {
  selectedMessages.clear();
  isSelectMode = false;
  actionBar.classList.add('hidden');
  renderMessages();
}

function enterSelectMode(msgId) {
  isSelectMode = true;
  selectedMessages.add(msgId);
  actionBar.classList.remove('hidden');
  actionBarCount.textContent = '1 seleccionado';
  renderMessages();
}

/* ===== REPLY ===== */
function setReplyTo(msg) {
  replyTo = { id:msg.id, sender:msg.sender, content:msg.content, type:msg.type };
  replyPreviewSender.textContent = msg.sender===currentUser?'Tú':msg.sender;
  const labels = {text:msg.content, image:'📷 Foto', video:'🎬 Video', audio:'🎵 Audio', sticker:'🎨 Sticker', document:'📄 Documento'};
  replyPreviewText.textContent = labels[msg.type]||msg.content;
  replyPreview.classList.remove('hidden');
  messageInput.focus();
}

function scrollToMsg(id) {
  const el=document.querySelector(`[data-msg-id="${id}"]`);
  if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.transition='background 0.5s';el.style.background='#d9fdd3';setTimeout(()=>{el.style.background='';},1500);}
}

/* ===== SETTINGS ===== */
function openSettings() {
  settingsPanel.classList.add('open');
  settingsOverlay.classList.remove('hidden');
  document.querySelectorAll('.font-size-opt').forEach(b=>b.classList.toggle('active',b.dataset.size===fontSize));
}

function closeSettings() {
  settingsPanel.classList.remove('open');
  settingsOverlay.classList.add('hidden');
}

/* ===== NOTIFICATIONS ===== */
if ('Notification' in window&&Notification.permission==='default') Notification.requestPermission();

document.addEventListener('visibilitychange',()=>{if(!document.hidden)document.title=`Chat — ${currentUser}`;});

/* ===== SERVICE WORKER ===== */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
