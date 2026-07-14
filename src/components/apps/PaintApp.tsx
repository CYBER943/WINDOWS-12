import React, { useRef, useState, useEffect } from 'react';
import { Download, Eraser, PenTool, Square, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PaintApp: React.FC<{ windowId: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
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
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#202020]">
      {/* Toolbar */}
      <div className="flex items-center gap-4 p-2 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/20">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setTool('pen')}
            className={cn("p-2 rounded hover:bg-black/5 dark:hover:bg-white/10", tool === 'pen' && "bg-blue-100 dark:bg-white/20 text-blue-600 dark:text-white")}
          >
            <PenTool size={18} />
          </button>
          <button 
            onClick={() => setTool('eraser')}
            className={cn("p-2 rounded hover:bg-black/5 dark:hover:bg-white/10", tool === 'eraser' && "bg-blue-100 dark:bg-white/20 text-blue-600 dark:text-white")}
          >
            <Eraser size={18} />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          className="w-8 h-8 rounded cursor-pointer"
        />
        <input 
          type="range" 
          min="1" 
          max="50" 
          value={size} 
          onChange={(e) => setSize(parseInt(e.target.value))} 
          className="w-24"
        />
        <div className="flex-1" />
        <button onClick={clearCanvas} className="px-3 py-1 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded">
          Clear
        </button>
      </div>
      {/* Canvas Container */}
      <div className="flex-1 overflow-auto bg-gray-200 dark:bg-[#1a1a1a] p-4 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="bg-white shadow-md rounded-sm cursor-crosshair"
          style={{ width: 800, height: 600 }}
        />
      </div>
    </div>
  );
};
