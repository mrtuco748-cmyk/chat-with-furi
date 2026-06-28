import React from 'react';
import { User } from '../types';

interface UserSelectorProps {
  onSelectUser: (user: User) => void;
}

export default function UserSelector({ onSelectUser }: UserSelectorProps) {
  return (
    <div 
      id="user-selector-screen"
      className="min-h-screen w-full bg-white dark:bg-black flex flex-col items-center justify-center p-4"
    >
      <div 
        id="welcome-card"
        className="w-full max-w-sm text-center flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
            💬
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Nuestro Chat
          </h1>
          <p className="text-sm text-gray-500">
            Elegí quién sos para entrar
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            id="select-user-facu"
            onClick={() => onSelectUser('Facu')}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
              👨‍💻
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Facu</span>
              <span className="text-xs text-gray-400">Sos mi amor</span>
            </div>
          </button>

          <button
            type="button"
            id="select-user-rocio"
            onClick={() => onSelectUser('Rocío')}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
              🌸
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Rocío</span>
              <span className="text-xs text-gray-400">Sos mi princesa</span>
            </div>
          </button>
        </div>

        <div className="text-[11px] text-gray-400 flex items-center justify-center gap-2">
          <span>Seguro</span>
          <span>·</span>
          <span>Privado</span>
          <span>·</span>
          <span>Solo para nosotros</span>
        </div>
      </div>
    </div>
  );
}
