import React, { useState } from 'react';

interface EmojiCategory {
  name: string;
  icon: string;
  emojis: string[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    name: 'Amor',
    icon: '❤️',
    emojis: [
      '❤️', '💖', '💝', '💕', '💗', '💘', '💞', '💟', '💌', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍',
      '💏', '💑', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '💋', '💍', '🌹', '🌺', '🌸', '💐', '🧸', '😍', '🥰', '😘', '😚'
    ]
  },
  {
    name: 'Caras',
    icon: '😊',
    emojis: [
      '😊', '🙂', '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😉', '😋', '😛', '😝', '😜', '🤪', '🤗',
      '🤫', '🤔', '🤭', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '🥺', '😢', '😭', '😠', '😡', '🤯', '🥵', '🥶'
    ]
  },
  {
    name: 'Gestos',
    icon: '👋',
    emojis: [
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇',
      '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪'
    ]
  },
  {
    name: 'Animales',
    icon: '🐼',
    emojis: [
      '🐱', '🐶', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
      '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🐢', '🐍', '🐙', '🦑', '🦐', '🐠', '🐟', '🐬', '🐳', '🐾', '🍀', '🌸'
    ]
  },
  {
    name: 'Comida',
    icon: '🍓',
    emojis: [
      '🍓', '🍒', '🍎', '🍉', '🍑', '🍋', '🍊', '🍇', '🥝', '🍍', '🍌', '🥑', '🥦', '🌽', '🥐', '🍞', '🧀',
      '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🍜', 'Sushi', '🍣', '🍤', '🍨', '🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '☕', '🥤', '🥂'
    ]
  },
  {
    name: 'Cosas',
    icon: '🎈',
    emojis: [
      '🎈', '🎉', '🎊', '🎁', '🎀', '🪄', '🎨', '🎭', '🎤', '🎧', '🎹', '🎸', '🎲', '🎯', '🚗', '🛵', '🚲',
      '⏰', '🧭', '🗺️', '🏖️', '🌋', '🏠', '💒', '🏮', '✉️', '📦', '📝', '📌', '🔑', '🛋️', '🧼', '🚿', '🪞'
    ]
  }
];

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelectEmoji, onClose }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Amor');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeEmojis = EMOJI_CATEGORIES.find(c => c.name === activeCategory)?.emojis || [];

  // If search is used, filter emojis from all categories
  const filteredEmojis = searchQuery.trim()
    ? EMOJI_CATEGORIES.flatMap(c => c.emojis).filter(emoji => 
        emoji.includes(searchQuery) || searchQuery.split('').some(char => emoji.includes(char))
      ).slice(0, 48) // Limit to 48 results to look clean
    : activeEmojis;

  return (
    <div 
      id="emoji-picker-container"
      className="absolute bottom-16 left-2 right-2 md:left-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100/80 z-50 flex flex-col overflow-hidden max-h-80 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header / Tabs */}
      <div className="flex bg-pink-50/50 p-2 border-b border-pink-100 justify-between items-center gap-1 overflow-x-auto scrollbar-none">
        <div className="flex gap-1">
          {EMOJI_CATEGORIES.map(category => (
            <button
              key={category.name}
              type="button"
              id={`emoji-tab-${category.name}`}
              onClick={() => {
                setActiveCategory(category.name);
                setSearchQuery('');
              }}
              className={`p-1.5 rounded-lg text-lg transition-colors duration-150 relative ${
                activeCategory === category.name && !searchQuery
                  ? 'bg-white shadow-sm text-pink-600 scale-105'
                  : 'hover:bg-pink-100/60 text-gray-600'
              }`}
              title={category.name}
            >
              <span>{category.icon}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          id="close-emoji-picker-btn"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-100 transition-colors duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-2 border-b border-pink-50">
        <input
          type="text"
          id="emoji-search-input"
          placeholder="Buscar emoji..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-pink-100 focus:outline-none focus:ring-1 focus:ring-pink-300 bg-pink-50/20 text-gray-700"
        />
      </div>

      {/* Emoji Grid */}
      <div 
        id="emoji-grid"
        className="p-3 overflow-y-auto grid grid-cols-7 gap-2 h-48 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent"
      >
        {filteredEmojis.length > 0 ? (
          filteredEmojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              type="button"
              id={`emoji-btn-${index}`}
              onClick={() => onSelectEmoji(emoji)}
              className="text-2xl p-1 hover:bg-pink-100/60 rounded-xl transition-all duration-150 hover:scale-120 text-center flex items-center justify-center active:scale-95"
            >
              {emoji}
            </button>
          ))
        ) : (
          <div id="no-emojis-msg" className="col-span-7 text-center py-8 text-xs text-gray-400">
            No se encontraron emojis 🥺
          </div>
        )}
      </div>
    </div>
  );
}
