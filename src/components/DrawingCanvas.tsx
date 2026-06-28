import React, { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
  onSendDrawing: (dataUrl: string) => void;
  onClose: () => void;
}

const PALETTE_COLORS = [
  '#ec4899', // Pink / Rosa
  '#f43f5e', // Rose / Rojo
  '#f97316', // Orange / Naranja
  '#eab308', // Yellow / Amarillo
  '#22c55e', // Green / Verde
  '#3b82f6', // Blue / Azul
  '#a855f7', // Purple / Violeta
  '#64748b', // Slate / Gris
  '#0f172a', // Dark / Negro
];

const BRUSH_SIZES = [
  { label: 'Fino', value: 3 },
  { label: 'Medio', value: 7 },
  { label: 'Grueso', value: 14 },
];

export default function DrawingCanvas({ onSendDrawing, onClose }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#ec4899');
  const [brushSize, setBrushSize] = useState<number>(7);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  // Set canvas resolution and styling on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background color to white on creation so it's not transparent
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  // Handle resizing/responsiveness of drawing screen coordinate system
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Check if it's touch or mouse
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      const touch = e.touches[0];
      // Scale coordinates correctly based on bounding client rect
      const x = ((touch.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((touch.clientY - rect.top) / rect.height) * canvas.height;
      return { x, y };
    } else {
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      return { x, y };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = brushSize;

    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const sendDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    // Convert to image
    const dataUrl = canvas.toDataURL('image/png');
    onSendDrawing(dataUrl);
    onClose();
  };

  return (
    <div 
      id="drawing-modal"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        id="drawing-container"
        className="bg-white rounded-3xl shadow-2xl border border-pink-100 w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-pink-50/50 p-4 border-b border-pink-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Pizarrón de Dibujo</h3>
              <p className="text-[10px] md:text-xs text-pink-600/80 font-medium">¡Dibuja algo romántico para tu pareja! 💕</p>
            </div>
          </div>
          <button
            type="button"
            id="close-drawing-btn"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-100/60 transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Canvas Body */}
        <div className="p-4 flex flex-col items-center justify-center bg-gray-50/60">
          <div className="w-full relative aspect-[4/3] bg-white rounded-2xl border-2 border-dashed border-pink-100/80 overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="p-4 border-t border-pink-50 flex flex-col gap-3.5 bg-white">
          {/* Colors */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 text-left">Color del Pincel:</span>
            <div className="flex gap-2 items-center flex-wrap">
              {PALETTE_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  id={`canvas-color-${c}`}
                  onClick={() => {
                    setColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 relative ${
                    color === c && !isEraser
                      ? 'scale-115 border-pink-400 shadow-md'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
              
              {/* Eraser Button */}
              <button
                type="button"
                id="canvas-eraser-btn"
                onClick={() => setIsEraser(true)}
                className={`ml-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 ${
                  isEraser
                    ? 'bg-pink-600 text-white border-pink-600 shadow-sm scale-102'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>🧽 Goma</span>
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 text-left">Grosor de Trazo:</span>
            <div className="flex gap-2">
              {BRUSH_SIZES.map(size => (
                <button
                  key={size.value}
                  type="button"
                  id={`canvas-size-${size.value}`}
                  onClick={() => setBrushSize(size.value)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 border ${
                    brushSize === size.value
                      ? 'bg-pink-100/80 text-pink-700 border-pink-200 font-semibold'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span 
                      className="rounded-full bg-current inline-block" 
                      style={{ width: `${size.value}px`, height: `${size.value}px` }}
                    />
                    {size.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-pink-50/20 border-t border-pink-100/50 flex gap-2.5">
          <button
            type="button"
            id="clear-canvas-btn"
            onClick={clearCanvas}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-pink-200/80 bg-white text-pink-600 hover:bg-pink-50 font-semibold text-sm transition-colors duration-150 flex items-center justify-center gap-1.5"
          >
            <span>🗑️ Limpiar</span>
          </button>
          
          <button
            type="button"
            id="send-drawing-btn"
            onClick={sendDrawing}
            disabled={!hasDrawn}
            className={`flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm ${
              hasDrawn
                ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>💖 Enviar Dibujo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
