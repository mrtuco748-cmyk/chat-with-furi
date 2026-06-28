import React from 'react';

interface LightboxProps {
  src: string;
  sender: string;
  timestamp: string;
  onClose: () => void;
}

export default function Lightbox({ src, sender, timestamp, onClose }: LightboxProps) {
  // Prevent propagation to close when clicking the image itself
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      id="lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
    >
      {/* Top Bar Controls */}
      <div 
        id="lightbox-topbar"
        onClick={stopPropagation}
        className="absolute top-0 inset-x-0 p-4 bg-linear-to-b from-black/50 to-transparent flex justify-between items-center text-white z-10 cursor-default"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold flex items-center gap-1.5">
            <span>{sender === 'Facu' ? '👨‍💻' : '🌸'}</span>
            Enviado por {sender}
          </span>
          <span className="text-[10px] text-gray-300 font-mono">{timestamp}</span>
        </div>

        <div className="flex gap-2">
          {/* Download Button */}
          <a
            href={src}
            download={`dibujo-${sender}-${Date.now()}.png`}
            id="lightbox-download-link"
            className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-colors duration-150 text-white flex items-center justify-center"
            title="Descargar imagen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
          
          {/* Close Button */}
          <button
            type="button"
            id="lightbox-close-btn"
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-colors duration-150 text-white flex items-center justify-center"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="max-w-full max-h-[85vh] relative flex items-center justify-center">
        <img
          src={src}
          alt="Visual del Chat"
          id="lightbox-image"
          onClick={stopPropagation}
          className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-2xl shadow-2xl cursor-default animate-in zoom-in-95 duration-200"
        />
      </div>
    </div>
  );
}
