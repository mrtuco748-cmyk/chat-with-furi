import React, { useState, useEffect, useRef } from 'react';
import { StickerCategory } from '../types';

const STICKER_CATEGORIES: StickerCategory[] = [
  {
    id: 'love',
    name: 'Amor',
    icon: '❤️',
    stickers: [
      { id: 'love_1', emoji: '❤️', label: 'Amor' },
      { id: 'love_2', emoji: '💖', label: 'Brillos' },
      { id: 'love_3', emoji: '💕', label: 'Dos Corazones' },
      { id: 'love_4', emoji: '💗', label: 'Creciendo' },
      { id: 'love_5', emoji: '💘', label: 'Flechazo' },
      { id: 'love_6', emoji: '💝', label: 'Regalo' },
      { id: 'love_7', emoji: '💑', label: 'Pareja' },
      { id: 'love_8', emoji: '💏', label: 'Beso' },
      { id: 'love_9', emoji: '💋', label: 'Labios' },
      { id: 'love_10', emoji: '💌', label: 'Carta' },
      { id: 'love_11', emoji: '🧸', label: 'Osito' },
      { id: 'love_12', emoji: '🌹', label: 'Rosa' },
    ],
  },
  {
    id: 'funny',
    name: 'Divertidos',
    icon: '😂',
    stickers: [
      { id: 'fun_1', emoji: '😂', label: 'Risa' },
      { id: 'fun_2', emoji: '🤪', label: 'Mueca' },
      { id: 'fun_3', emoji: '🥳', label: 'Fiesta' },
      { id: 'fun_4', emoji: '😎', label: 'Fachero' },
      { id: 'fun_5', emoji: '🤔', label: 'Duda' },
      { id: 'fun_6', emoji: '🤫', label: 'Silencio' },
      { id: 'fun_7', emoji: '👻', label: 'Fantasmito' },
      { id: 'fun_8', emoji: '🤠', label: 'Vaquero' },
      { id: 'fun_9', emoji: '👽', label: 'Alien' },
      { id: 'fun_10', emoji: '🥑', label: 'Palta' },
      { id: 'fun_11', emoji: '🍕', label: 'Pizza' },
      { id: 'fun_12', emoji: '🤡', label: 'Payaso' },
    ],
  },
  {
    id: 'cute',
    name: 'Tiernos',
    icon: '🐻',
    stickers: [
      { id: 'cute_1', emoji: '🐻', label: 'Oso' },
      { id: 'cute_2', emoji: '🐼', label: 'Panda' },
      { id: 'cute_3', emoji: '🐱', label: 'Gato' },
      { id: 'cute_4', emoji: '🐰', label: 'Conejo' },
      { id: 'cute_5', emoji: '🦊', label: 'Zorro' },
      { id: 'cute_6', emoji: '🐨', label: 'Koala' },
      { id: 'cute_7', emoji: '🦁', label: 'León' },
      { id: 'cute_8', emoji: '🐹', label: 'Hámster' },
      { id: 'cute_9', emoji: '🐧', label: 'Pingüino' },
      { id: 'cute_10', emoji: '🐥', label: 'Pollito' },
      { id: 'cute_11', emoji: '🦄', label: 'Unicornio' },
      { id: 'cute_12', emoji: '🦦', label: 'Nutria' },
    ],
  },
];

const EMOJI_ORDER = [
  { name: 'Recientes', icon: '🕐', key: 'recent' },
  { name: 'Caritas', icon: '😊', key: 'smileys' },
  { name: 'Animales', icon: '🐱', key: 'animals' },
  { name: 'Comida', icon: '🍎', key: 'food' },
  { name: 'Actividades', icon: '⚽', key: 'activities' },
  { name: 'Viajes', icon: '🏖️', key: 'travel' },
  { name: 'Objetos', icon: '💡', key: 'objects' },
  { name: 'Símbolos', icon: '💬', key: 'symbols' },
  { name: 'Banderas', icon: '🏳️', key: 'flags' },
  // Stickers tab at the end
  { name: 'Stickers', icon: '🎨', key: 'stickers' },
];

const EMOJI_MAP: Record<string, string[]> = {
  smileys: [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘',
    '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢',
    '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
    '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮',
    '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕',
    '🤠', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖', '🎃', '😺', '😸',
    '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
  ],
  animals: [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸',
    '🐵', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴',
    '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🦂', '🐢', '🐍', '🦎', '🦖',
    '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈',
    '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘',
    '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮',
    '🐕‍🦺', '🐈', '🐓', '🦃', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀',
    '🐿️', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️',
    '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🪺', '🪹', '🍄', '🐚', '🪸', '🌾',
    '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚',
    '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐',
    '💫', '⭐', '🌟', '✨', '⚡', '🔥', '💥', '☄️', '💦', '💧', '🌊',
  ],
  food: [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑',
    '🥭', '🍍', '🥝', '🍅', '🫒', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🫑',
    '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🫘', '🌰', '🍞', '🥐', '🥖', '🫓',
    '🧀', '🥚', '🍳', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟',
    '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝',
    '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠',
    '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬',
    '🍫', '🍿', '🍩', '🍪', '🌰', '🥛', '🍼', '🫖', '☕', '🍵', '🧃', '🥤', '🧋',
    '🍶', '🍺', '🍻', '🥂', '🍷', '🫗', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊',
  ],
  activities: [
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸',
    '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋',
    '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼',
    '🤸', '🤺', '⛹️', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗',
    '🚵', '🚴', '🎯', '🎲', '♟️', '🎮', '🕹️', '🎰', '🎳', '🃏', '🎴', '🀄',
    '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗',
    '🎸', '🪕', '🎻', '🎲', '♟️',
  ],
  travel: [
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛',
    '🚜', '🏍️', '🛵', '🛺', '🚲', '🛴', '🛹', '🚏', '🛣️', '🛤️', '⛽', '🛳️',
    '⛵', '🛶', '🚤', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬', '🪂', '🚁', '🚟',
    '🚠', '🚡', '🛰️', '🚀', '🛸', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏢', '🏭',
    '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏯', '🏰', '💒',
    '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃',
    '🏙️', '🌄', '🌅', '🌆', '🌇', '🌉', '🗾', '🏔️', '⛰️', '🌋', '🗻', '🏕️',
    '🏖️', '🏜️', '🏝️', '🏞️', '🌲', '🌳',
  ],
  objects: [
    '⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾',
    '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟',
    '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛',
    '⏳', '📡', '🔋', '🪫', '🔌', '💡', '🔦', '🕯️', '🧯', '🗑️', '🛢️', '💸',
    '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🪛',
    '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫',
    '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺',
    '🔮', '📿', '🧿', '🪬', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩻', '🩹', '🩺',
    '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🪠', '🧺', '🧻',
    '🚽', '🚿', '🛁', '🪥', '🪒', '🧴', '🧼', '🫧', '🪣', '🧽', '🧯', '🛎️',
    '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🪆', '🖼️', '🪞', '🪟',
    '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮',
    '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📮', '📪', '📫', '📬', '📭',
    '📦', '📯', '📃', '📜', '📄', '📑', '🧾', '✏️', '🖊️', '🖋️', '✒️', '🖌️',
    '🖍️', '📝', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗳️', '📌', '📍',
    '📁', '📂', '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋',
  ],
  symbols: [
    '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛',
    '💚', '💙', '💜', '🤎', '🖤', '🤍', '💋', '💯', '💢', '💥', '💫', '💦', '💨',
    '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💤', '♠️', '♥️', '♦️', '♣️',
    '🃏', '🀄', '🎴', '🔇', '🔈', '🔉', '🔊', '📢', '📣', '📯', '🔔', '🔕',
    '🎵', '🎶', '💹', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾',
    '⚠️', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🚷', '📵', '🔞', '☢️',
    '☣️', '⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️', '↕️', '↔️', '↩️',
    '↪️', '⤴️', '⤵️', '🔃', '🔄', '🔙', '🔚', '🔛', '🔜', '🔝', '🛐', '⚛️',
    '🕉️', '✡️', '☸️', '☯️', '✝️', '☦️', '☪️', '☮️', '🕎', '🔯', '♈', '♉',
    '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔀', '🔁',
    '🔂', '▶️', '⏩', '⏭️', '⏯️', '◀️', '⏪', '⏮️', '🔼', '⏫', '🔽', '⏬',
    '⏸️', '⏹️', '⏺️', '⏏️', '🎦', '🔅', '🔆', '📶', '📳', '📴',
  ],
  flags: [
    '🏳️', '🏴', '🏁', '🚩', '🎌', '🏴‍☠️', '🇦🇷', '🇧🇷', '🇨🇱', '🇨🇴', '🇨🇷', '🇨🇺',
    '🇩🇴', '🇪🇨', '🇸🇻', '🇬🇹', '🇭🇳', '🇲🇽', '🇳🇮', '🇵🇦', '🇵🇾', '🇵🇪', '🇵🇷',
    '🇺🇸', '🇺🇾', '🇻🇪', '🇪🇸', '🇫🇷', '🇮🇹', '🇩🇪', '🇬🇧', '🇯🇵', '🇰🇷', '🇨🇳',
    '🇮🇳', '🇷🇺', '🇦🇺', '🇨🇦', '🇧🇪', '🇳🇱', '🇵🇹', '🇸🇪', '🇳🇴', '🇩🇰', '🇫🇮',
    '🇬🇷', '🇹🇷', '🇮🇱', '🇸🇦', '🇦🇪', '🇿🇦', '🇳🇬', '🇰🇪', '🇲🇦', '🇪🇬',
  ],
};

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
  onSelectSticker?: (sticker: string) => void;
}

export default function EmojiPicker({ onSelectEmoji, onClose, onSelectSticker }: EmojiPickerProps) {
  const [tab, setTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStickerTab, setActiveStickerTab] = useState('love');
  const gridRef = useRef<HTMLDivElement>(null);
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('recent_emojis') || '[]'); }
    catch { return []; }
  });

  const saveRecent = (emoji: string) => {
    const next = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 30);
    setRecentEmojis(next);
    localStorage.setItem('recent_emojis', JSON.stringify(next));
  };

  const handleSelect = (emoji: string, isSticker?: boolean) => {
    saveRecent(emoji);
    if (isSticker && onSelectSticker) {
      onSelectSticker(emoji);
    } else {
      onSelectEmoji(emoji);
    }
  };

  const isStickersTab = tab === 'stickers';
  const currentCategory = STICKER_CATEGORIES.find(c => c.id === activeStickerTab);

  const filteredEmojis = searchQuery.trim()
    ? Object.values(EMOJI_MAP).flat().filter(e => e.includes(searchQuery)).slice(0, 60)
    : tab === 'recent'
      ? (recentEmojis.length ? recentEmojis : ['😊', '❤️', '😂', '😍', '🥰', '💕', '👍', '😘', '🔥', '✨'])
      : (EMOJI_MAP[tab] || []);

  return (
    <div
      id="emoji-picker-container"
      className="absolute bottom-[60px] left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl border-t border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden max-h-[60vh] min-h-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {isStickersTab ? 'Stickers' : 'Emojis'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Grid */}
      <div ref={gridRef} className="flex-1 overflow-y-auto p-2 scrollbar-none">
        {isStickersTab ? (
          <div>
            {/* Sticker category tabs */}
            <div className="flex gap-1 mb-2 overflow-x-auto scrollbar-none">
              {STICKER_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveStickerTab(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeStickerTab === cat.id
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            {/* Sticker grid */}
            <div className="grid grid-cols-4 gap-2">
              {(currentCategory?.stickers || []).map(sticker => (
                <button
                  key={sticker.id}
                  type="button"
                  onClick={() => handleSelect(sticker.emoji, true)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                  <span className="text-4xl">{sticker.emoji}</span>
                  <span className="text-[9px] text-gray-400 mt-0.5 font-medium">{sticker.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-8 gap-1">
            {filteredEmojis.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                type="button"
                onClick={() => handleSelect(emoji)}
                className="text-xl p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all active:scale-90 flex items-center justify-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom tab bar (like WhatsApp) */}
      <div className="flex items-center justify-around border-t border-gray-100 dark:border-gray-700 px-1 py-1 overflow-x-auto scrollbar-none shrink-0">
        {EMOJI_ORDER.map(cat => (
          <button
            key={cat.key}
            type="button"
            onClick={() => { setTab(cat.key); setSearchQuery(''); }}
            className={`p-1.5 rounded-lg text-lg transition-all shrink-0 ${
              tab === cat.key
                ? 'bg-gray-100 dark:bg-gray-700 scale-105'
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            title={cat.name}
          >
            {cat.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
