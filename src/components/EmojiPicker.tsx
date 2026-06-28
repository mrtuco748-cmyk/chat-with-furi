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
      '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🍜', '🍣', '🍤', '🍨', '🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '☕', '🥤', '🥂'
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
  const filteredEmojis = searchQuery.trim()
    ? EMOJI_CATEGORIES.flatMap(c => c.emojis).filter(emoji => 
        emoji.includes(searchQuery) || searchQuery.split('').some(char => emoji.includes(char))
      ).slice(0, 48)
    : activeEmojis;

  return (
    <div 
      id="emoji-picker-container"
      className="absolute bottom-16 left-2 right-2 md:left-4 md:right-auto md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden max-h-80"
    >
      <div className="flex bg-gray-50 dark:bg-gray-900 p-2 border-b border-gray-100 dark:border-gray-700 justify-between items-center gap-1 overflow-x-auto scrollbar-none">
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
              className={`p-1.5 rounded-lg text-lg transition-colors duration-150 ${
                activeCategory === category.name && !searchQuery
                  ? 'bg-white dark:bg-gray-700 shadow-sm scale-105'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
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
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="p-2 border-b border-gray-100 dark:border-gray-700">
        <input
          type="text"
          id="emoji-search-input"
          placeholder="Buscar emoji..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        />
      </div>

      <div 
        id="emoji-grid"
        className="p-3 overflow-y-auto grid grid-cols-7 gap-2 h-48 scrollbar-none"
      >
        {filteredEmojis.length > 0 ? (
          filteredEmojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              type="button"
              id={`emoji-btn-${index}`}
              onClick={() => onSelectEmoji(emoji)}
              className="text-2xl p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-150 hover:scale-120 text-center flex items-center justify-center active:scale-95"
            >
              {emoji}
            </button>
          ))
        ) : (
          <div id="no-emojis-msg" className="col-span-7 text-center py-8 text-xs text-gray-400">
            No se encontraron emojis
          </div>
        )}
      </div>
    </div>
  );
}
