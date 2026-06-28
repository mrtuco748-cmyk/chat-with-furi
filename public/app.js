/* === CONFIG === */
const EMOJI_CATEGORIES = [
  { key: 'recent', icon: '🕐', name: 'Recientes' },
  { key: 'smileys', icon: '😊', name: 'Smileys' },
  { key: 'animals', icon: '🐱', name: 'Animales' },
  { key: 'food', icon: '🍎', name: 'Comida' },
  { key: 'travel', icon: '🏖️', name: 'Viajes' },
  { key: 'objects', icon: '💡', name: 'Objetos' },
  { key: 'symbols', icon: '💬', name: 'Símbolos' },
  { key: 'flags', icon: '🏳️', name: 'Banderas' },
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
const QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

/* === STATE === */
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
let searchResults = [];
let searchIndex = -1;
let isAtBottom = true;
let unreadBelow = 0;
let recentEmojis = [];
let typingTimeout = null;
let isRecording = false;
let lastNotifyTime = 0;

try { recentEmojis = JSON.parse(localStorage.getItem('wa_recent_emojis') || '[]'); } catch(e) {}

/* === DOM REFS === */
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
const emojiGrid = $('emoji-grid');
const emojiTabs = $('emoji-tabs');
const emojiSearch = $('emoji-search');
const emojiClose = $('emoji-close');
const clipBtn = $('clip-btn');
const attachmentMenu = $('attachment-menu');
const fileInput = $('file-input');
const documentInput = $('document-input');
const cameraInput = $('camera-input');
const imagePreview = $('image-preview');
const previewImg = $('preview-img');
const previewCaption = $('preview-caption');
const previewSend = $('preview-send');
const previewClose = $('preview-close');
const previewFilename = $('preview-filename');
const lightbox = $('lightbox');
const lightboxImg = $('lightbox-img');
const lightboxClose = $('lightbox-close');
const contextMenu = $('context-menu');
const replyPreview = $('reply-preview');
const replyPreviewSender = $('reply-preview-sender');
const replyPreviewText = $('reply-preview-text');
const replyClose = $('reply-close');
const searchBar = $('search-bar');
const searchInput = $('search-input');
const searchCount = $('search-count');
const searchPrev = $('search-prev');
const searchNext = $('search-next');
const searchBtn = $('search-btn');
const searchClose = $('search-close');
const scrollBottomBtn = $('scroll-bottom-btn');
const recordingOverlay = $('recording-overlay');
const recordingTimerEl = $('recording-timer');
const headerAvatarText = $('header-avatar-text');
const headerName = $('header-name');
const headerStatus = $('header-status');
const reconnectBanner = $('reconnect-banner');
const menuBtn = $('menu-btn');

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('wa_user');
  if (saved && (saved === 'Facu' || saved === 'Rocío')) {
    selectUser(saved);
  }
  setupEventListeners();
});

function selectUser(username) {
  currentUser = username;
  localStorage.setItem('wa_user', username);
  userSelector.classList.add('hidden');
  app.classList.remove('hidden');
  document.title = `Chat de Facu y Rocío — ${currentUser}`;

  const other = username === 'Facu' ? 'Rocío' : 'Facu';
  const color = other === 'Facu' ? '#5f9ef0' : '#d47bcd';
  headerAvatarText.textContent = other[0];
  headerAvatarText.parentElement.style.background = color;
  headerName.textContent = other;
  connectSocket();
}

/* === SOCKET.IO === */
function connectSocket() {
  socket = io({ reconnectionAttempts: Infinity, reconnectionDelay: 1000 });

  socket.on('connect', () => {
    reconnectBanner.classList.add('hidden');
    socket.emit('register', currentUser);
    loadMessages(true);
  });

  socket.on('disconnect', () => {
    reconnectBanner.classList.remove('hidden');
    setStatus('desconectado');
  });

  socket.on('reconnect_error', () => {
    reconnectBanner.classList.remove('hidden');
  });

  socket.on('presence', (data) => {
    if (data.user !== currentUser) {
      if (data.online) setStatus('en línea', 'online');
      else setStatus(formatLastSeen(data.lastSeen));
    }
  });

  socket.on('message_sent', (msg) => updateMessageStatus(msg.id, 'sent'));
  socket.on('message_delivered', (data) => updateMessageStatus(data.id, 'delivered'));
  socket.on('message_read', (data) => updateMessageStatus(data.id, 'read', data.user));

  socket.on('new_message', (msg) => {
    addMessage(msg);
    markAsRead(msg);
    if (msg.sender !== currentUser && document.hidden) {
      const now = Date.now();
      if (now - lastNotifyTime > 3000) {
        lastNotifyTime = now;
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Mensaje de ${msg.sender}`, {
            body: msg.type === 'text' ? msg.content : `Te envió un ${msg.type}`,
            tag: 'wa-chat',
          });
        }
        document.title = `● Nuevo mensaje — ${currentUser}`;
      }
    }
    if (isAtBottom) {
      scrollToBottom();
    } else {
      unreadBelow++;
      updateScrollBtn();
    }
  });

  socket.on('reaction_updated', (data) => {
    const msgEl = document.querySelector(`[data-msg-id="${data.messageId}"]`);
    if (msgEl) {
      const bar = msgEl.querySelector('.reactions-bar');
      if (bar) bar.replaceWith(renderReactionsEl(data.messageId, data.reactions));
      else msgEl.appendChild(renderReactionsEl(data.messageId, data.reactions));
    }
    const msg = messages.find(m => m.id === data.messageId);
    if (msg) msg.reactions = data.reactions;
  });

  socket.on('message_deleted', (data) => {
    if (data.forEveryone) {
      const msgEl = document.querySelector(`[data-msg-id="${data.id}"]`);
      if (msgEl) {
        const bubble = msgEl.querySelector('.message-bubble');
        if (bubble) {
          const footer = bubble.querySelector('.message-footer');
          bubble.innerHTML = '<div class="message-deleted">🚫 Este mensaje fue eliminado</div>';
          if (footer) bubble.appendChild(footer);
        }
      }
    } else {
      const msgEl = document.querySelector(`[data-msg-id="${data.id}"]`);
      if (msgEl) msgEl.remove();
      messages = messages.filter(m => m.id !== data.id);
    }
  });

  socket.on('clear', () => {
    messages = []; messagesList.innerHTML = '';
    currentOffset = 0; hasMoreMessages = true;
  });

  let typingTimeoutId = null;
  socket.on('typing', (data) => {
    if (data.user !== currentUser) {
      if (data.typing) {
        setStatus('escribiendo', 'typing');
        clearTimeout(typingTimeoutId);
        typingTimeoutId = setTimeout(() => setStatus('en línea', 'online'), 3000);
      } else {
        clearTimeout(typingTimeoutId);
        setStatus('en línea', 'online');
      }
    }
  });

  socket.on('unread_count', (data) => {
    if (data.count > 0) document.title = `(${data.count}) ● ${currentUser}`;
  });
}

/* === STATUS === */
function setStatus(text, className = '') {
  headerStatus.textContent = text;
  headerStatus.className = 'header-status' + (className ? ' ' + className : '');
}

function formatLastSeen(ts) {
  if (!ts) return 'desconectado';
  const d = new Date(ts);
  const today = new Date();
  const sameDay = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  const time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return `últ. vez hoy a las ${time}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear())
    return `últ. vez ayer a las ${time}`;
  return `últ. vez ${d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} a las ${time}`;
}

/* === MESSAGES LOADING === */
async function loadMessages(reset = false) {
  if (reset) { currentOffset = 0; hasMoreMessages = true; messages = []; }
  if (!hasMoreMessages || isLoadingMore) return;
  isLoadingMore = true;

  try {
    const res = await fetch(`/api/messages?offset=${currentOffset}&limit=50`);
    const data = await res.json();
    if (data.length < 50) hasMoreMessages = false;

    if (reset) {
      messages = data;
      renderMessages();
    } else {
      const prevHeight = messagesContainer.scrollHeight;
      messages = [...data, ...messages];
      renderMessages();
      messagesContainer.scrollTop = messagesContainer.scrollHeight - prevHeight;
    }
    currentOffset += data.length;
  } catch (err) {
    console.error('Error loading messages:', err);
  } finally {
    isLoadingMore = false;
    $('messages-loading').classList.add('hidden');
  }
  scrollToBottom();
}

/* === RENDER MESSAGES === */
function renderMessages() {
  if (!messages.length) {
    messagesList.innerHTML = '<div style="text-align:center;color:#8696a0;padding:60px 20px;font-size:14px;line-height:1.6;">No hay mensajes aún<br><span style="font-size:40px;display:block;margin-bottom:8px;">💬</span>Empezá a chatear</div>';
    return;
  }

  let html = '';
  let lastDate = null;
  let lastSender = null;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const msgDate = new Date(msg.timestamp);
    const dateKey = formatDateKey(msgDate);

    if (dateKey !== lastDate) {
      html += `<div class="date-separator"><span>${formatDateHeader(msgDate)}</span></div>`;
      lastDate = dateKey;
      lastSender = null;
    }

    const isConsecutive = lastSender === msg.sender && i > 0 &&
      (msg.timestamp - messages[i-1].timestamp) < 300000;

    const isOwn = msg.sender === currentUser;
    const wrapperClass = `message-wrapper ${isOwn ? 'own' : 'other'}${isConsecutive ? ' consecutive' : ''}`;

    html += `<div class="${wrapperClass}" data-msg-id="${msg.id}" data-sender="${msg.sender}" data-timestamp="${msg.timestamp}">`;
    html += `<div class="message-bubble">`;

    if (msg.replyTo) {
      const replyContent = msg.replyTo.content || '';
      html += `<div class="reply-quote" onclick="scrollToMessage('${msg.replyTo.id}')">
        <div><div class="reply-quote-sender">${escapeHtml(msg.replyTo.sender || '')}</div>
        <div class="reply-quote-text">${escapeHtml(replyContent.length > 80 ? replyContent.substring(0, 80) + '…' : replyContent)}</div></div>
      </div>`;
    }

    if (msg.deleted) {
      html += `<div class="message-deleted">🚫 Este mensaje fue eliminado</div>`;
    } else if (msg.type === 'text') {
      html += `<div class="message-text">${renderText(msg.content)}</div>`;
    } else if (msg.type === 'image') {
      html += `<img src="${msg.content}" class="message-image" onclick="openLightbox('${msg.content.replace(/'/g, "\\'")}')" alt="Foto" loading="lazy">`;
    } else if (msg.type === 'video') {
      html += `<video src="${msg.content}" class="message-video" controls playsinline preload="metadata"></video>`;
    } else if (msg.type === 'audio') {
      html += renderAudioPlayer(msg);
    } else if (msg.type === 'sticker') {
      html += `<img src="${msg.content}" class="message-sticker" alt="Sticker" loading="lazy">`;
    } else if (msg.type === 'document') {
      html += `<div class="message-document" onclick="downloadDoc('${msg.content}', '${escapeHtml(msg.fileName || 'documento')}')">
        <div class="doc-icon" style="background:#5f9ef0">📄</div>
        <div class="doc-info">
          <div class="doc-name">${escapeHtml(msg.fileName || 'Documento')}</div>
          <div class="doc-size">${formatFileSize(msg.fileSize)}</div>
        </div>
      </div>`;
    }

    html += `<div class="message-footer">`;
    html += `<span class="message-time">${formatTime(msg.timestamp)}</span>`;
    if (isOwn) html += renderTicks(msg);
    html += `</div>`;
    html += `</div>`;

    if (msg.reactions && msg.reactions.length > 0) {
      html += `<div class="reactions-bar">`;
      const grouped = {};
      msg.reactions.forEach(r => { grouped[r.emoji] = (grouped[r.emoji] || 0) + 1; });
      Object.entries(grouped).forEach(([emoji, count]) => {
        const active = msg.reactions.some(r => r.emoji === emoji && r.user === currentUser);
        html += `<div class="reaction-pill${active ? ' active' : ''}" onclick="toggleReaction('${msg.id}','${emoji}')">${emoji}${count > 1 ? ` <span class="reaction-count">${count}</span>` : ''}</div>`;
      });
      html += `</div>`;
    }

    html += `<div class="message-actions">
      <button class="message-action-btn" onclick="event.stopPropagation();showContextMenu(event, '${msg.id}')" aria-label="Más opciones">
        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/></svg>
      </button>
    </div>`;

    html += `</div>`;
    lastSender = msg.sender;
  }
  messagesList.innerHTML = html;
}

function renderText(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

/* === FORMAT HELPERS === */
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function formatDateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function formatDateHeader(d) {
  const today = new Date();
  if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear())
    return 'Hoy';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear())
    return 'Ayer';
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/de /g, '');
}

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

function formatDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* === TICKS === */
function renderTicks(msg) {
  let status = 'sent';
  if (msg.readBy && msg.readBy.length > 0) status = 'read';
  else if (msg.delivered) status = 'delivered';

  if (status === 'read') {
    return `<span class="message-tick"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-blue"><path d="M11.5.5l-6 6-3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7.5 6.5l2-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14.5.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>`;
  } else if (status === 'delivered') {
    return `<span class="message-tick"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-grey"><path d="M11.5.5l-6 6-3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7.5 6.5l2-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14.5.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>`;
  }
  return `<span class="message-tick"><svg viewBox="0 0 16 11" width="16" height="11" class="tick-grey"><path d="M11.5.5l-6 6L3.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>`;
}

/* === AUDIO PLAYER === */
function renderAudioPlayer(msg) {
  const bars = Array(30).fill(0).map((_, i) =>
    `<div class="audio-wave-bar" style="height:${3 + Math.random() * 18}px" data-wave="${i}"></div>`
  ).join('');

  return `<div class="audio-player">
    <button class="audio-play-btn" onclick="toggleAudio(event, '${msg.id}')" aria-label="Reproducir audio">
      <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
    </button>
    <div class="audio-waveform" id="wave-${msg.id}">${bars}</div>
    <span class="audio-duration" id="dur-${msg.id}">${formatDuration(msg.duration || 0)}</span>
    <button class="audio-speed-btn" onclick="cycleSpeed(event, '${msg.id}')">1×</button>
  </div>`;
}

function toggleAudio(e, msgId) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const msg = messages.find(m => m.id === msgId);
  if (!msg) return;

  if (audioPlayers[msgId]) {
    if (!audioPlayers[msgId].paused) {
      audioPlayers[msgId].pause();
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
    } else {
      audioPlayers[msgId].play();
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    }
    return;
  }

  const audio = new Audio(msg.content);
  audioPlayers[msgId] = audio;
  audio.play().catch(() => {});
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

  audio.addEventListener('timeupdate', () => {
    const dur = audio.duration || msg.duration || 1;
    const progress = audio.currentTime / dur;
    document.querySelectorAll(`#wave-${msgId} .audio-wave-bar`).forEach((bar, i) => {
      bar.classList.toggle('playing', i / 30 <= progress);
    });
    const durEl = document.getElementById(`dur-${msgId}`);
    if (durEl) durEl.textContent = formatDuration(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
    const durEl = document.getElementById(`dur-${msgId}`);
    if (durEl) durEl.textContent = formatDuration(msg.duration || 0);
    document.querySelectorAll(`#wave-${msgId} .audio-wave-bar`).forEach(b => b.classList.remove('playing'));
    delete audioPlayers[msgId];
  });
}

function cycleSpeed(e, msgId) {
  e.stopPropagation();
  const audio = audioPlayers[msgId];
  if (!audio) return;
  const speeds = [1, 1.5, 2];
  const current = parseFloat(e.currentTarget.textContent);
  const next = speeds[(speeds.indexOf(current) + 1) % speeds.length];
  audio.playbackRate = next;
  e.currentTarget.textContent = next + '×';
}

/* === REACTIONS RENDERER === */
function renderReactionsEl(messageId, reactions) {
  const container = document.createElement('div');
  container.className = 'reactions-bar';
  const grouped = {};
  reactions.forEach(r => { grouped[r.emoji] = (grouped[r.emoji] || 0) + 1; });
  Object.entries(grouped).forEach(([emoji, count]) => {
    const active = reactions.some(r => r.emoji === emoji && r.user === currentUser);
    const pill = document.createElement('div');
    pill.className = `reaction-pill${active ? ' active' : ''}`;
    pill.onclick = () => toggleReaction(messageId, emoji);
    pill.innerHTML = `${emoji}${count > 1 ? ` <span class="reaction-count">${count}</span>` : ''}`;
    container.appendChild(pill);
  });
  return container;
}

/* === ADD MESSAGE === */
function addMessage(msg) {
  if (messages.some(m => m.id === msg.id)) return;
  messages.push(msg);
  messages.sort((a, b) => a.timestamp - b.timestamp);
  renderMessages();
  if (isAtBottom) scrollToBottom();
}

function updateMessageStatus(id, status, user) {
  const msg = messages.find(m => m.id === id);
  if (!msg) return;

  if (status === 'sent') msg.status = 'sent';
  else if (status === 'delivered') msg.delivered = true;
  else if (status === 'read') {
    if (!msg.readBy) msg.readBy = [];
    if (user && !msg.readBy.some(r => r.user === user)) {
      msg.readBy.push({ user, at: Date.now() });
    }
  }

  const msgEl = document.querySelector(`[data-msg-id="${id}"]`);
  if (msgEl && msg.sender === currentUser) {
    const footer = msgEl.querySelector('.message-footer');
    if (footer) {
      const tickSpan = footer.querySelector('.message-tick');
      if (tickSpan) tickSpan.outerHTML = renderTicks(msg);
    }
  }
}

function markAsRead(msg) {
  if (msg.sender !== currentUser) {
    socket.emit('mark_read', { messageId: msg.id, user: currentUser });
    document.title = `Chat de Facu y Rocío — ${currentUser}`;
  }
}

/* === SEND MESSAGE === */
async function sendMessage(type, content, extra = {}) {
  if (!currentUser || (!content && type === 'text')) return;

  const msgId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const msg = {
    id: msgId, sender: currentUser, type, content,
    timestamp: Date.now(), replyTo: replyTo || null,
    reactions: [], readBy: [], ...extra,
  };

  messages.push(msg);
  renderMessages();
  scrollToBottom();
  resetInput();

  socket.emit('send_message', {
    id: msgId, sender: currentUser, type, content,
    timestamp: msg.timestamp,
    replyTo: replyTo ? { id: replyTo.id, sender: replyTo.sender, content: replyTo.content, type: replyTo.type } : null,
    fileName: extra.fileName, fileSize: extra.fileSize,
    mimeType: extra.mimeType, duration: extra.duration,
  });

  replyTo = null;
  replyPreview.classList.add('hidden');
}

function resetInput() {
  messageInput.value = '';
  messageInput.style.height = 'auto';
  sendBtn.classList.add('hidden');
  micBtn.classList.remove('hidden');
}

/* === EVENT LISTENERS === */
function setupEventListeners() {
  document.querySelectorAll('.user-btn').forEach(btn => {
    btn.addEventListener('click', () => selectUser(btn.dataset.user));
  });

  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';

    if (messageInput.value.trim()) {
      sendBtn.classList.remove('hidden');
      micBtn.classList.add('hidden');
    } else {
      sendBtn.classList.add('hidden');
      micBtn.classList.remove('hidden');
    }

    if (socket && socket.connected) {
      clearTimeout(typingTimeout);
      socket.emit('typing', { user: currentUser, typing: true });
      typingTimeout = setTimeout(() => {
        socket.emit('typing', { user: currentUser, typing: false });
      }, 2000);
    }
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (text) sendMessage('text', text);
    }
  });

  sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) sendMessage('text', text);
  });

  emojiBtn.addEventListener('click', () => {
    attachmentMenu.classList.add('hidden');
    emojiPicker.classList.toggle('hidden');
    if (!emojiPicker.classList.contains('hidden')) buildEmojiPicker();
  });

  emojiClose.addEventListener('click', () => emojiPicker.classList.add('hidden'));

  clipBtn.addEventListener('click', () => {
    emojiPicker.classList.add('hidden');
    attachmentMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.attach-option').forEach(opt => {
    opt.addEventListener('click', () => {
      attachmentMenu.classList.add('hidden');
      const type = opt.dataset.type;
      if (type === 'gallery') fileInput.click();
      else if (type === 'document') documentInput.click();
      else if (type === 'camera') cameraInput.click();
    });
  });

  fileInput.addEventListener('change', handleFileSelect);
  documentInput.addEventListener('change', handleDocumentSelect);
  cameraInput.addEventListener('change', (e) => {
    if (e.target.files?.[0]) handleFiles([e.target.files[0]], 'image');
  });

  previewClose.addEventListener('click', () => imagePreview.classList.add('hidden'));
  previewSend.addEventListener('click', sendPreview);

  lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.add('hidden');
  });

  replyClose.addEventListener('click', () => {
    replyTo = null;
    replyPreview.classList.add('hidden');
  });

  searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) searchInput.focus();
  });

  searchClose.addEventListener('click', () => {
    searchBar.classList.add('hidden');
    searchInput.value = '';
    clearSearchHighlights();
  });

  searchInput.addEventListener('input', performSearch);
  searchPrev.addEventListener('click', () => navigateSearch(-1));
  searchNext.addEventListener('click', () => navigateSearch(1));

  messagesContainer.addEventListener('scroll', handleScroll);
  scrollBottomBtn.addEventListener('click', () => { scrollToBottom(); unreadBelow = 0; updateScrollBtn(); });

  document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) contextMenu.classList.add('hidden');
  });
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  micBtn.addEventListener('mousedown', startRecording);
  micBtn.addEventListener('touchstart', startRecording, { passive: true });

  menuBtn.addEventListener('click', () => {
    if (confirm('¿Borrar todo el historial de mensajes?')) {
      fetch('/api/clear', { method: 'POST' });
    }
  });
}

/* === FILE HANDLING === */
function handleFileSelect(e) {
  const files = e.target.files;
  if (!files?.length) return;
  handleFiles(Array.from(files));
  e.target.value = '';
}

function handleDocumentSelect(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  e.target.value = '';
  uploadAndSend(file, 'document');
}

function handleFiles(files, forceType) {
  const file = files[0];
  if (!file) return;

  const isImage = forceType === 'image' || file.type.startsWith('image/');
  const isVideo = forceType === 'video' || file.type.startsWith('video/');

  if (isImage || isVideo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewFilename.textContent = file.name;
      previewImg.dataset.fileType = isVideo ? 'video' : 'image';
      previewImg.dataset.fileName = file.name;
      previewImg.dataset.fileSize = file.size;
      previewImg.dataset.mimeType = file.type;
      imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    uploadAndSend(file, 'document');
  }
}

function sendPreview() {
  const type = previewImg.dataset.fileType || 'image';
  const content = previewImg.src;

  sendMessage(type, content, {
    fileName: previewImg.dataset.fileName,
    fileSize: parseInt(previewImg.dataset.fileSize) || 0,
    mimeType: previewImg.dataset.mimeType,
  });

  const caption = previewCaption.value.trim();
  if (caption) setTimeout(() => sendMessage('text', caption), 100);

  imagePreview.classList.add('hidden');
  previewCaption.value = '';
}

function uploadAndSend(file, type) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    sendMessage(type, content, {
      fileName: file.name, fileSize: file.size, mimeType: file.type,
    });
  };
  reader.readAsDataURL(file);
}

function downloadDoc(url, name) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
}

/* === EMOJI PICKER === */
function buildEmojiPicker(category = null) {
  const current = category || 'recent';
  emojiGrid.innerHTML = '';

  let emojis = [];
  if (emojiSearch.value.trim()) {
    const q = emojiSearch.value.toLowerCase();
    emojis = Object.values(EMOJI_MAP).flat().filter(e => e.includes(q)).slice(0, 60);
  } else if (current === 'recent') {
    emojis = recentEmojis.length ? recentEmojis : ['😊','❤️','😂','😍','🥰','💕','👍','😘','🔥','✨','🥺','💖','🤣','🙏','👋','🎉','💪','😢','😎','🤔','😩','💀','👻','🎂'];
  } else {
    emojis = EMOJI_MAP[current] || [];
  }

  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.onclick = () => selectEmoji(emoji);
    btn.setAttribute('role', 'option');
    emojiGrid.appendChild(btn);
  });

  emojiTabs.innerHTML = '';
  EMOJI_CATEGORIES.forEach(cat => {
    const tab = document.createElement('button');
    tab.className = `emoji-tab${cat.key === current ? ' active' : ''}`;
    tab.textContent = cat.icon;
    tab.title = cat.name;
    tab.onclick = () => buildEmojiPicker(cat.key);
    tab.setAttribute('role', 'tab');
    emojiTabs.appendChild(tab);
  });
}

emojiSearch.addEventListener('input', () => buildEmojiPicker());

function selectEmoji(emoji) {
  recentEmojis = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 24);
  localStorage.setItem('wa_recent_emojis', JSON.stringify(recentEmojis));

  const msgId = contextMenu.dataset.msgId;
  if (msgId && !contextMenu.classList.contains('hidden')) {
    toggleReaction(msgId, emoji);
    contextMenu.classList.add('hidden');
  } else {
    const start = messageInput.selectionStart;
    const end = messageInput.selectionEnd;
    const text = messageInput.value;
    messageInput.value = text.substring(0, start) + emoji + text.substring(end);
    messageInput.selectionStart = messageInput.selectionEnd = start + emoji.length;
    messageInput.dispatchEvent(new Event('input'));
  }
  emojiPicker.classList.add('hidden');
}

/* === REACTIONS === */
function toggleReaction(msgId, emoji) {
  const msg = messages.find(m => m.id === msgId);
  if (!msg) return;

  const existing = msg.reactions?.find(r => r.emoji === emoji && r.user === currentUser);
  if (existing) {
    socket.emit('remove_reaction', { messageId: msgId, emoji, user: currentUser });
  } else {
    socket.emit('add_reaction', { messageId: msgId, emoji, user: currentUser });
  }
}

function showQuickReactions(e, msgId) {
  e.preventDefault();
  e.stopPropagation();

  contextMenu.innerHTML = '';
  contextMenu.style.left = '-9999px';
  contextMenu.style.top = '-9999px';
  contextMenu.classList.remove('hidden');
  contextMenu.dataset.msgId = msgId;

  const title = document.createElement('div');
  title.className = 'context-menu-item';
  title.style.cssText = 'font-size:12px;color:#8696a0;justify-content:center;padding:8px 16px;cursor:default;text-transform:uppercase;letter-spacing:0.5px;';
  title.textContent = 'Reaccionar';
  contextMenu.appendChild(title);

  const reactionsDiv = document.createElement('div');
  reactionsDiv.style.cssText = 'display:flex;gap:4px;padding:6px 14px 12px;justify-content:center;';
  QUICK_REACTIONS.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.style.cssText = 'font-size:28px;cursor:pointer;background:none;border:none;padding:4px;border-radius:50%;transition:all 0.15s;line-height:1;';
    btn.onmouseenter = () => { btn.style.transform = 'scale(1.2)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; };
    btn.onclick = (ev) => { ev.stopPropagation(); toggleReaction(msgId, emoji); contextMenu.classList.add('hidden'); };
    reactionsDiv.appendChild(btn);
  });
  contextMenu.appendChild(reactionsDiv);

  const divider = document.createElement('div');
  divider.className = 'context-menu-divider';
  contextMenu.appendChild(divider);

  const pickerBtn = document.createElement('button');
  pickerBtn.className = 'context-menu-item';
  pickerBtn.innerHTML = `<span style="font-size:18px">➕</span> Más emojis...`;
  pickerBtn.onclick = () => { contextMenu.classList.add('hidden'); emojiPicker.classList.remove('hidden'); buildEmojiPicker(); };
  contextMenu.appendChild(pickerBtn);

  const x = Math.min(e.clientX || e.touches?.[0]?.clientX || 0, window.innerWidth - 220);
  const y = Math.min(e.clientY || e.touches?.[0]?.clientY || 0, window.innerHeight - 200);
  contextMenu.style.left = Math.max(10, x) + 'px';
  contextMenu.style.top = Math.max(10, y) + 'px';
}

/* === CONTEXT MENU === */
function showContextMenu(e, msgId) {
  e.preventDefault();
  e.stopPropagation();

  const msg = messages.find(m => m.id === msgId);
  if (!msg) return;

  contextMenu.innerHTML = '';
  contextMenu.style.left = '-9999px';
  contextMenu.style.top = '-9999px';
  contextMenu.classList.remove('hidden');

  const isOwn = msg.sender === currentUser;
  const timeSinceSent = Date.now() - msg.timestamp;
  const canDeleteForAll = isOwn && timeSinceSent < 3600000;

  const replyItem = document.createElement('button');
  replyItem.className = 'context-menu-item';
  replyItem.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>Responder';
  replyItem.onclick = () => { setReplyTo(msg); contextMenu.classList.add('hidden'); };
  contextMenu.appendChild(replyItem);

  const reactItem = document.createElement('button');
  reactItem.className = 'context-menu-item';
  reactItem.innerHTML = '<span style="font-size:18px;width:20px;text-align:center">😊</span> Reaccionar';
  reactItem.onclick = (ev) => { showQuickReactions(ev, msgId); };
  contextMenu.appendChild(reactItem);

  const copyItem = document.createElement('button');
  copyItem.className = 'context-menu-item';
  copyItem.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>Copiar';
  copyItem.onclick = () => { navigator.clipboard?.writeText(msg.content).catch(() => {}); contextMenu.classList.add('hidden'); };
  contextMenu.appendChild(copyItem);

  const divider = document.createElement('div');
  divider.className = 'context-menu-divider';
  contextMenu.appendChild(divider);

  if (isOwn) {
    const delMe = document.createElement('button');
    delMe.className = 'context-menu-item danger';
    delMe.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>Eliminar para mí';
    delMe.onclick = () => { socket.emit('delete_message', { messageId: msgId, forEveryone: false }); contextMenu.classList.add('hidden'); };
    contextMenu.appendChild(delMe);

    if (canDeleteForAll) {
      const delAll = document.createElement('button');
      delAll.className = 'context-menu-item danger';
      delAll.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>Eliminar para todos';
      delAll.onclick = () => { socket.emit('delete_message', { messageId: msgId, forEveryone: true }); contextMenu.classList.add('hidden'); };
      contextMenu.appendChild(delAll);
    }
  } else {
    const delMe = document.createElement('button');
    delMe.className = 'context-menu-item danger';
    delMe.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>Eliminar para mí';
    delMe.onclick = () => { socket.emit('delete_message', { messageId: msgId, forEveryone: false }); contextMenu.classList.add('hidden'); };
    contextMenu.appendChild(delMe);
  }

  const rect = e.target.closest('.message-wrapper')?.getBoundingClientRect();
  let cx = e.clientX || (rect ? rect.right : 0);
  let cy = e.clientY || (rect ? rect.top : 0);

  if (e.touches) {
    cx = e.touches[0].clientX;
    cy = e.touches[0].clientY;
  }

  const menuW = 220;
  const menuH = isOwn && canDeleteForAll ? 280 : 220;
  let left = Math.min(cx, window.innerWidth - menuW - 10);
  let top = Math.min(cy, window.innerHeight - menuH - 10);
  contextMenu.style.left = Math.max(10, left) + 'px';
  contextMenu.style.top = Math.max(10, top) + 'px';
}

/* === REPLY === */
function setReplyTo(msg) {
  replyTo = { id: msg.id, sender: msg.sender, content: msg.content, type: msg.type };
  replyPreviewSender.textContent = msg.sender === currentUser ? 'Tú' : msg.sender;
  const typeLabel = {
    text: msg.content,
    image: '📷 Foto', video: '🎬 Video', audio: '🎵 Audio',
    sticker: '🎨 Sticker', 'sticker-emoji': '🎨 Sticker',
    document: '📄 Documento',
  };
  replyPreviewText.textContent = typeLabel[msg.type] || '📄 Documento';
  replyPreview.classList.remove('hidden');
  messageInput.focus();
}

function scrollToMessage(id) {
  const el = document.querySelector(`[data-msg-id="${id}"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.transition = 'background 0.5s';
    el.style.background = '#d9fdd3';
    setTimeout(() => { el.style.background = ''; }, 1500);
  }
}

/* === LIGHTBOX === */
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
}

/* === SEARCH === */
function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  clearSearchHighlights();

  if (!query) {
    searchCount.textContent = '';
    return;
  }

  searchResults = [];
  document.querySelectorAll('.message-wrapper').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(query)) {
      searchResults.push(el);
      el.querySelectorAll('.message-text').forEach(t => {
        const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        t.innerHTML = t.textContent.replace(new RegExp(`(${safe})`, 'gi'),
          '<mark style="background:#fff3a8;padding:0 2px;border-radius:2px">$1</mark>');
      });
    }
  });

  searchIndex = -1;
  searchCount.textContent = searchResults.length ? `0 / ${searchResults.length}` : 'Sin resultados';
  navigateSearch(1);
}

function navigateSearch(dir) {
  if (!searchResults.length) return;

  if (searchResults[searchIndex]) searchResults[searchIndex].style.background = '';

  searchIndex = (searchIndex + dir + searchResults.length) % searchResults.length;
  const el = searchResults[searchIndex];
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.style.transition = 'background 0.5s';
  el.style.background = '#d9fdd3';
  setTimeout(() => { el.style.background = ''; }, 2000);

  searchCount.textContent = `${searchIndex + 1} / ${searchResults.length}`;
}

function clearSearchHighlights() {
  document.querySelectorAll('.message-wrapper mark').forEach(m => {
    const parent = m.closest('.message-text');
    if (parent) parent.innerHTML = parent.textContent;
  });
  searchResults = [];
}

/* === SCROLL === */
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
  isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
  updateScrollBtn();

  if (scrollTop < 100 && !isLoadingMore && hasMoreMessages) {
    loadMessages(false);
  }

  if (isAtBottom) {
    unreadBelow = 0;
    updateScrollBtn();
  }
}

function scrollToBottom() {
  messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
}

function updateScrollBtn() {
  if (isAtBottom) {
    scrollBottomBtn.classList.add('hidden');
  } else {
    scrollBottomBtn.classList.remove('hidden');
    if (unreadBelow > 0) {
      scrollBottomBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" style="position:relative"><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
        <span style="position:absolute;top:-4px;right:-2px;background:#00a884;color:white;border-radius:50%;width:20px;height:20px;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center">${unreadBelow}</span>`;
    } else {
      scrollBottomBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>';
    }
  }
}

/* === RECORDING === */
async function startRecording(e) {
  e.preventDefault();
  if (messageInput.value.trim() || isRecording) return;
  if (e.touches && e.touches.length > 1) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    isRecording = true;
    recordingMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    recordingChunks = [];

    recordingMediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordingChunks.push(e.data);
    };

    recordingMediaRecorder.onstop = () => {
      if (recordingChunks.length > 0) {
        const blob = new Blob(recordingChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          sendMessage('audio', reader.result, { duration: recordingSeconds, mimeType: 'audio/webm' });
        };
        reader.readAsDataURL(blob);
      }
      stream.getTracks().forEach(t => t.stop());
      recordingOverlay.classList.add('hidden');
      isRecording = false;
    };

    recordingMediaRecorder.start();
    recordingSeconds = 0;
    recordingTimerEl.textContent = '0:00';
    recordingOverlay.classList.remove('hidden');

    recordingTimer = setInterval(() => {
      recordingSeconds++;
      recordingTimerEl.textContent = formatDuration(recordingSeconds);
    }, 1000);

    const stopRec = (ev) => {
      ev.preventDefault();
      if (recordingMediaRecorder?.state === 'recording') {
        recordingMediaRecorder.stop();
      }
      clearInterval(recordingTimer);
      document.removeEventListener('mouseup', stopRec);
      document.removeEventListener('touchend', stopRec);
    };

    const cancelOnMove = (ev) => {
      if (ev.touches) {
        const touch = ev.touches[0];
        if (touch.clientX < window.innerWidth / 3) {
          if (recordingMediaRecorder?.state === 'recording') {
            recordingMediaRecorder.ondataavailable = null;
            recordingMediaRecorder.stop();
            stream.getTracks().forEach(t => t.stop());
            clearInterval(recordingTimer);
            recordingOverlay.classList.add('hidden');
            isRecording = false;
          }
          document.removeEventListener('touchmove', cancelOnMove);
        }
      }
    };

    document.addEventListener('mouseup', stopRec);
    document.addEventListener('touchend', stopRec);
    document.addEventListener('touchmove', cancelOnMove, { passive: true });

  } catch (err) {
    console.error('Recording error:', err);
    recordingOverlay.classList.add('hidden');
    isRecording = false;
  }
}

/* === NOTIFICATIONS === */
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) document.title = `Chat de Facu y Rocío — ${currentUser}`;
});
