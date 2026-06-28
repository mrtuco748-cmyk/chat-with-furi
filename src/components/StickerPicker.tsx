import React, { useState } from 'react';
import { StickerCategory } from '../types';

const STICKER_CATEGORIES: StickerCategory[] = [
  {
    id: 'love',
    name: 'Amor ❤️',
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
      { id: 'love_12', emoji: '🌹', label: 'Rosa' }
    ]
  },
  {
    id: 'funny',
    name: 'Divertidos 😂',
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
      { id: 'fun_12', emoji: '🤡', label: 'Payaso' }
    ]
  },
  {
    id: 'cute',
    name: 'Tiernos 🐻',
    icon: '🐻',
    stickers: [
      { id: 'cute_1', emoji: '🐻', label: 'Oso' },
      { id: 'cute_2', emoji: 'Panda', label: 'Panda' }, // we can use 🐼 but let's make it a string 🐼
      { id: 'cute_3', emoji: '🐱', label: 'Gato' },
      { id: 'cute_4', emoji: '🐰', label: 'Conejo' },
      { id: 'cute_5', emoji: '🦊', label: 'Zorro' },
      { id: 'cute_6', emoji: 'Koala', label: 'Koala' }, // we can use 🐨
      { id: 'cute_7', emoji: '🦁', label: 'León' },
      { id: 'cute_8', emoji: 'Hamster', label: 'Hamster' }, // we can use 🐹
      { id: 'cute_9', emoji: '🐧', label: 'Pingüino' },
      { id: 'cute_10', emoji: '🐥', label: 'Pollito' },
      { id: 'cute_11', emoji: '🦄', label: 'Unicornio' },
      { id: 'cute_12', emoji: 'Otter', label: 'Nutria' } // we can use 🦦
    ]
  }
];

// Re-write cute categories with solid standard emojis to prevent any missing assets
STICKER_CATEGORIES[2].stickers = [
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
  { id: 'cute_12', emoji: '🦦', label: 'Nutria' }
];

interface StickerPickerProps {
  onSelectSticker: (emoji: string) => void;
  onClose: () => void;
}

export default function StickerPicker({ onSelectSticker, onClose }: StickerPickerProps) {
  const [activeTab, setActiveTab] = useState<string>('love');

  return (
    <div 
      id="sticker-picker-container"
      className="absolute bottom-16 left-2 right-2 md:left-12 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100/80 z-50 flex flex-col overflow-hidden max-h-80 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header Tabs */}
      <div className="flex bg-pink-50/50 p-2 border-b border-pink-100 justify-between items-center gap-1">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {STICKER_CATEGORIES.map(category => (
            <button
              key={category.id}
              type="button"
              id={`sticker-tab-${category.id}`}
              onClick={() => setActiveTab(category.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1 relative shrink-0 ${
                activeTab === category.id
                  ? 'bg-white shadow-sm text-pink-600 scale-102 border border-pink-100'
                  : 'hover:bg-pink-100/40 text-gray-600'
              }`}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          id="close-sticker-picker-btn"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-100 transition-colors duration-150 shrink-0 ml-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Sticker Grid */}
      <div 
        id="sticker-grid"
        className="p-4 overflow-y-auto grid grid-cols-3 gap-3 h-52 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent"
      >
        {STICKER_CATEGORIES.find(c => c.id === activeTab)?.stickers.map(sticker => (
          <button
            key={sticker.id}
            type="button"
            id={`sticker-item-${sticker.id}`}
            onClick={() => onSelectSticker(sticker.emoji)}
            className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-pink-50 border border-transparent hover:border-pink-100/50 transition-all duration-200 active:scale-95"
          >
            <span className="text-5xl group-hover:scale-115 transition-transform duration-200 select-none filter drop-shadow-sm">
              {sticker.emoji}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 select-none font-medium">
              {sticker.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
