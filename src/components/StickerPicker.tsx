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
    ]
  }
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
      className="absolute bottom-16 left-2 right-2 md:left-12 md:right-auto md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden max-h-80"
    >
      <div className="flex bg-gray-50 dark:bg-gray-900 p-2 border-b border-gray-100 dark:border-gray-700 justify-between items-center gap-1">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {STICKER_CATEGORIES.map(category => (
            <button
              key={category.id}
              type="button"
              id={`sticker-tab-${category.id}`}
              onClick={() => setActiveTab(category.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 shrink-0 ${
                activeTab === category.id
                  ? 'bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
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
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 ml-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div 
        id="sticker-grid"
        className="p-4 overflow-y-auto grid grid-cols-3 gap-3 h-52 scrollbar-none"
      >
        {STICKER_CATEGORIES.find(c => c.id === activeTab)?.stickers.map(sticker => (
          <button
            key={sticker.id}
            type="button"
            id={`sticker-item-${sticker.id}`}
            onClick={() => onSelectSticker(sticker.emoji)}
            className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent transition-all active:scale-95"
          >
            <span className="text-5xl group-hover:scale-110 transition-transform select-none">
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
