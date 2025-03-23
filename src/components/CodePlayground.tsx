
import React, { useEffect, useRef } from 'react';

interface CodePlaygroundProps {
  codeBlocks: string[];
  isRunning: boolean;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ codeBlocks, isRunning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Draw character in starting position
    drawCharacter(ctx, 50, 250);
    
    // Draw collectibles and obstacles
    drawCollectibles(ctx);
    drawObstacles(ctx);
    
    // If code is running, animate the character
    if (isRunning) {
      let characterX = 50;
      let characterY = 250;
      let stepIndex = 0;
      
      const interval = setInterval(() => {
        if (stepIndex >= codeBlocks.length) {
          clearInterval(interval);
          return;
        }
        
        const block = codeBlocks[stepIndex];
        
        // Clear previous character position
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx, canvas.width, canvas.height);
        drawCollectibles(ctx);
        drawObstacles(ctx);
        
        // Update character position based on code block
        switch (block) {
          case 'move-right':
            characterX += 50;
            break;
          case 'move-up':
            characterY -= 50;
            break;
          case 'rotate':
            // Just visual feedback
            break;
          case 'collect':
            // Visual feedback for collecting
            ctx.beginPath();
            ctx.arc(characterX, characterY, 30, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            ctx.fill();
            break;
          case 'repeat':
            // Visual indicator for repeat
            break;
          case 'if':
            // Visual indicator for condition
            break;
        }
        
        // Draw character at new position
        drawCharacter(ctx, characterX, characterY);
        
        stepIndex++;
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [codeBlocks, isRunning]);
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };
  
  const drawCharacter = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.font = '40px Arial';
    ctx.fillText('🤖', x - 20, y + 10);
  };
  
  const drawCollectibles = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '30px Arial';
    ctx.fillText('💎', 150 - 15, 250 + 10);
    ctx.fillText('💎', 250 - 15, 150 + 10);
    ctx.fillText('💎', 350 - 15, 250 + 10);
  };
  
  const drawObstacles = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '30px Arial';
    ctx.fillText('🌵', 200 - 15, 200 + 10);
    ctx.fillText('🌵', 300 - 15, 300 + 10);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-2 flex-1 min-h-[300px] flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={300} 
          className="border border-gray-300 bg-blue-50"
        />
      </div>
    </div>
  );
};
