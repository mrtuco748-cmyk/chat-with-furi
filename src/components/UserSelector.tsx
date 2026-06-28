import React from 'react';
import { User } from '../types';

interface UserSelectorProps {
  onSelectUser: (user: User) => void;
}

export default function UserSelector({ onSelectUser }: UserSelectorProps) {
  return (
    <div 
      id="user-selector-screen"
      className="min-h-screen w-full bg-linear-to-tr from-pink-50 via-rose-50 to-purple-50 flex flex-col items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Soft romantic floating background circles */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-pink-200/25 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-200/20 blur-3xl animate-pulse [animation-delay:2s]" />

      {/* Welcome Card Container */}
      <div 
        id="welcome-card"
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-pink-100/60 p-6 md:p-8 text-center relative z-10 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <span className="text-3xl">💖</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Nuestro Chat Privado
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium px-4">
            Un rincón secreto diseñado con mucho amor, exclusivamente para nosotros dos. 💕
          </p>
        </div>

        {/* User Selection Box */}
        <div className="flex flex-col gap-4 mt-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">¿Quién eres hoy?</span>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Facu Card */}
            <button
              type="button"
              id="select-user-facu"
              onClick={() => onSelectUser('Facu')}
              className="group flex flex-col items-center p-5 bg-white/90 hover:bg-gradient-to-b hover:from-white hover:to-orange-50/50 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-98 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <div className="w-20 h-20 rounded-full bg-orange-100/80 border-2 border-orange-200/60 flex items-center justify-center text-orange-500 font-bold text-3xl shadow-inner group-hover:scale-105 transition-transform duration-300 select-none">
                👨‍💻
              </div>
              <span className="text-lg font-bold text-gray-700 mt-3 group-hover:text-orange-600 transition-colors">
                Facu
              </span>
              <span className="text-[10px] text-orange-500/80 font-medium bg-orange-50 px-2 py-0.5 rounded-full mt-1.5 border border-orange-100/40 select-none">
                Mi Amor 🦁
              </span>
            </button>

            {/* Rocío Card */}
            <button
              type="button"
              id="select-user-rocio"
              onClick={() => onSelectUser('Rocío')}
              className="group flex flex-col items-center p-5 bg-white/90 hover:bg-gradient-to-b hover:from-white hover:to-pink-50/50 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-98 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <div className="w-20 h-20 rounded-full bg-pink-100/80 border-2 border-pink-200/60 flex items-center justify-center text-pink-500 font-bold text-3xl shadow-inner group-hover:scale-105 transition-transform duration-300 select-none">
                🌸
              </div>
              <span className="text-lg font-bold text-gray-700 mt-3 group-hover:text-pink-600 transition-colors">
                Rocío
              </span>
              <span className="text-[10px] text-pink-500/80 font-medium bg-pink-50 px-2 py-0.5 rounded-full mt-1.5 border border-pink-100/40 select-none">
                Mi Princesa 🐻
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div id="welcome-footer" className="text-[10px] text-gray-400 font-medium mt-2 flex items-center justify-center gap-1 select-none">
          <span>🔒 Encriptado con cariño</span>
          <span>•</span>
          <span>Guardado localmente</span>
        </div>
      </div>
    </div>
  );
}
