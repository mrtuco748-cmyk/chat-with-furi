import React, { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
  onSendDrawing: (dataUrl: string) => void;
  onClose: () => void;
}

const PALETTE_COLORS = [
  '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#64748b', '#0f172a',
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      const touch = e.touches[0];
      return {
        x: ((touch.clientX - rect.left) / rect.width) * canvas.width,
        y: ((touch.clientY - rect.top) / rect.height) * canvas.height,
      };
    } else {
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvas.width,
        y: ((e.clientY - rect.top) / rect.height) * canvas.height,
      };
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

  const stopDrawing = () => setIsDrawing(false);

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
    const dataUrl = canvas.toDataURL('image/png');
    onSendDrawing(dataUrl);
    onClose();
  };

  return (
    <div 
      id="drawing-modal"
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <div 
        id="drawing-container"
        className="bg-white dark:bg-gray-800 w-full max-w-lg flex flex-col overflow-hidden rounded-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Dibujar</h3>
          </div>
          <button
            type="button"
            id="close-drawing-btn"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Canvas Body */}
        <div className="p-4 flex flex-col items-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full relative aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-600">
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
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Color</span>
            <div className="flex gap-2 items-center flex-wrap">
              {PALETTE_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  id={`canvas-color-${c}`}
                  onClick={() => { setColor(c); setIsEraser(false); }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    color === c && !isEraser
                      ? 'scale-110 border-blue-400 shadow-sm'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <button
                type="button"
                id="canvas-eraser-btn"
                onClick={() => setIsEraser(true)}
                className={`ml-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                  isEraser
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                🧽
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Grosor</span>
            <div className="flex gap-2">
              {BRUSH_SIZES.map(size => (
                <button
                  key={size.value}
                  type="button"
                  id={`canvas-size-${size.value}`}
                  onClick={() => setBrushSize(size.value)}
                  className={`flex-1 py-1 rounded-lg text-xs font-medium border ${
                    brushSize === size.value
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <span className="rounded-full bg-current inline-block" style={{ width: `${size.value}px`, height: `${size.value}px` }} />
                    {size.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
          <button
            type="button"
            id="clear-canvas-btn"
            onClick={clearCanvas}
            className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium text-sm"
          >
            Limpiar
          </button>
          <button
            type="button"
            id="send-drawing-btn"
            onClick={sendDrawing}
            disabled={!hasDrawn}
            className={`flex-1 py-2 rounded-lg font-medium text-sm ${
              hasDrawn
                ? 'bg-[#3797f0] text-white hover:bg-[#3182d6]'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
