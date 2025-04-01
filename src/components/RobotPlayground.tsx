import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Cell {
  type: 'empty' | 'wall' | 'goal' | 'obstacle' | 'collectible';
}

interface RobotPlaygroundProps {
  level: {
    grid: Cell[][];
    startPosition: { x: number, y: number };
    startDirection: 'up' | 'right' | 'down' | 'left';
    goalPosition?: { x: number, y: number };
  };
  codeBlocks: string[];
  isRunning: boolean;
  success: boolean | null;
}

export const RobotPlayground: React.FC<RobotPlaygroundProps> = ({ 
  level, 
  codeBlocks, 
  isRunning,
  success 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [robotPosition, setRobotPosition] = useState(level.startPosition);
  const [robotDirection, setRobotDirection] = useState(level.startDirection);
  const [collectedItems, setCollectedItems] = useState<{x: number, y: number}[]>([]);
  const [executionPath, setExecutionPath] = useState<{x: number, y: number, direction: string}[]>([]);
  const [reachedGoal, setReachedGoal] = useState(false);

  useEffect(() => {
    setRobotPosition(level.startPosition);
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([]);
    setReachedGoal(false);
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cellSize = 40;
    canvas.width = level.grid[0].length * cellSize;
    canvas.height = level.grid.length * cellSize;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        const cell = level.grid[y][x];
        
        ctx.fillStyle = '#f0f4ff';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        
        switch (cell.type) {
          case 'wall':
            ctx.fillStyle = '#6b7280';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            break;
          case 'goal':
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(
              x * cellSize + cellSize/2, 
              y * cellSize + cellSize/2, 
              cellSize/3, 0, 2 * Math.PI
            );
            ctx.fill();
            break;
          case 'obstacle':
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(
              x * cellSize + cellSize/4, 
              y * cellSize + cellSize/4, 
              cellSize/2, cellSize/2
            );
            break;
          case 'collectible':
            if (!collectedItems.some(item => item.x === x && item.y === y)) {
              ctx.fillStyle = '#f59e0b';
              ctx.beginPath();
              ctx.moveTo(x * cellSize + cellSize/2, y * cellSize + cellSize/4);
              ctx.lineTo(x * cellSize + cellSize/4, y * cellSize + cellSize*3/4);
              ctx.lineTo(x * cellSize + cellSize*3/4, y * cellSize + cellSize*3/4);
              ctx.closePath();
              ctx.fill();
            }
            break;
        }
        
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    
    executionPath.forEach((step, index) => {
      if (index > 0) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath();
        ctx.arc(
          step.x * cellSize + cellSize/2, 
          step.y * cellSize + cellSize/2, 
          cellSize/4, 0, 2 * Math.PI
        );
        ctx.fill();
      }
    });
    
    ctx.save();
    ctx.translate(
      robotPosition.x * cellSize + cellSize/2, 
      robotPosition.y * cellSize + cellSize/2
    );
    
    const rotationDegrees = {
      'up': 0,
      'right': 90,
      'down': 180,
      'left': -90
    };
    ctx.rotate(rotationDegrees[robotDirection] * Math.PI / 180);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -cellSize/6, cellSize/8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
  }, [level, robotPosition, robotDirection, collectedItems, executionPath]);

  useEffect(() => {
    if (level.goalPosition) {
      if (robotPosition.x === level.goalPosition.x && robotPosition.y === level.goalPosition.y) {
        setReachedGoal(true);
      }
    } else {
      for (let y = 0; y < level.grid.length; y++) {
        for (let x = 0; x < level.grid[y].length; x++) {
          if (level.grid[y][x].type === 'goal' && 
              robotPosition.x === x && robotPosition.y === y) {
            setReachedGoal(true);
          }
        }
      }
    }
  }, [robotPosition, level]);

  useEffect(() => {
    if (!isRunning || codeBlocks.length === 0) return;
    
    setRobotPosition({...level.startPosition});
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([{...level.startPosition, direction: level.startDirection}]);
    setReachedGoal(false);
    
    let currentBlockIndex = 0;
    const loopStack: {startIndex: number, iterations: number, count: number}[] = [];
    
    const executeNextBlock = () => {
      if (currentBlockIndex >= codeBlocks.length) {
        if (loopStack.length > 0) {
          const currentLoop = loopStack[loopStack.length - 1];
          currentLoop.count++;
          
          if (currentLoop.count < currentLoop.iterations) {
            currentBlockIndex = currentLoop.startIndex;
            setTimeout(executeNextBlock, 500);
          } else {
            loopStack.pop();
            return;
          }
        }
        return;
      }
      
      const block = codeBlocks[currentBlockIndex];
      
      switch (block) {
        case 'move-forward':
          setRobotPosition(pos => {
            const newPos = {...pos};
            const nextPos = {...pos};
            
            switch (robotDirection) {
              case 'up': nextPos.y = Math.max(0, pos.y - 1); break;
              case 'right': nextPos.x = Math.min(level.grid[0].length - 1, pos.x + 1); break;
              case 'down': nextPos.y = Math.min(level.grid.length - 1, pos.y + 1); break;
              case 'left': nextPos.x = Math.max(0, pos.x - 1); break;
            }
            
            if (level.grid[nextPos.y] && level.grid[nextPos.y][nextPos.x]) {
              const nextCell = level.grid[nextPos.y][nextPos.x];
              if (nextCell.type !== 'wall') {
                newPos.x = nextPos.x;
                newPos.y = nextPos.y;
                
                setExecutionPath(path => [...path, {...newPos, direction: robotDirection}]);
                
                if (nextCell.type === 'collectible') {
                  setCollectedItems(items => [...items, {x: nextPos.x, y: nextPos.y}]);
                }
              }
            }
            
            return newPos;
          });
          break;
        
        case 'turn-left':
          setRobotDirection(dir => {
            const newDir = dir === 'up' ? 'left' : 
                          dir === 'left' ? 'down' : 
                          dir === 'down' ? 'right' : 'up';
            
            setExecutionPath(path => {
              const lastStep = path[path.length - 1];
              return [...path, {...lastStep, direction: newDir}];
            });
            
            return newDir;
          });
          break;
          
        case 'turn-right':
          setRobotDirection(dir => {
            const newDir = dir === 'up' ? 'right' : 
                          dir === 'right' ? 'down' : 
                          dir === 'down' ? 'left' : 'up';
            
            setExecutionPath(path => {
              const lastStep = path[path.length - 1];
              return [...path, {...lastStep, direction: newDir}];
            });
            
            return newDir;
          });
          break;
          
        case 'collect':
          const currentCell = level.grid[robotPosition.y][robotPosition.x];
          if (currentCell.type === 'collectible') {
            setCollectedItems(items => [...items, {x: robotPosition.x, y: robotPosition.y}]);
          }
          break;
          
        case 'loop-start-3':
          loopStack.push({startIndex: currentBlockIndex + 1, iterations: 3, count: 0});
          break;
          
        case 'loop-end':
          if (loopStack.length > 0) {
            const currentLoop = loopStack[loopStack.length - 1];
            currentLoop.count++;
            
            if (currentLoop.count < currentLoop.iterations) {
              currentBlockIndex = currentLoop.startIndex - 1;
            } else {
              loopStack.pop();
            }
          }
          break;
          
        case 'if-path':
          let pathClear = false;
          const nextPos = {...robotPosition};
          
          switch (robotDirection) {
            case 'up': nextPos.y = Math.max(0, robotPosition.y - 1); break;
            case 'right': nextPos.x = Math.min(level.grid[0].length - 1, robotPosition.x + 1); break;
            case 'down': nextPos.y = Math.min(level.grid.length - 1, robotPosition.y + 1); break;
            case 'left': nextPos.x = Math.max(0, robotPosition.x - 1); break;
          }
          
          if (level.grid[nextPos.y] && level.grid[nextPos.y][nextPos.x]) {
            pathClear = level.grid[nextPos.y][nextPos.x].type !== 'wall';
          }
          
          if (!pathClear) {
            currentBlockIndex++;
          }
          break;
      }
      
      currentBlockIndex++;
      
      setTimeout(executeNextBlock, 500);
    };
    
    setTimeout(executeNextBlock, 500);
  }, [isRunning, codeBlocks, level]);

  const nextLevel = () => {
    
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-2 border-gray-100 rounded-lg p-2 flex-1 overflow-hidden" style={{ height: '360px', minHeight: '360px', maxHeight: '360px' }}>
        <div className="relative flex items-center justify-center h-full w-full">
          <canvas 
            ref={canvasRef} 
            className="border border-gray-300 bg-blue-50 shadow-md"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              height: 'auto',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          
          {success !== null && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className={`absolute inset-0 flex items-center justify-center font-bold text-xl ${
                success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <div className={`rounded-full ${
                success ? 'bg-green-100' : 'bg-red-100'
              } p-6`}>
                {success ? '✓ SUCESSO!' : '✗ TENTE NOVAMENTE!'}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Debug info for development */}
      {/*
      <div className="mt-2 text-xs text-gray-500">
        <div>Posição: x={robotPosition.x}, y={robotPosition.y}</div>
        <div>Direção: {robotDirection}</div>
        <div>Meta alcançada: {reachedGoal ? 'Sim' : 'Não'}</div>
      </div>
      */}
      
    </div>
  );
};
