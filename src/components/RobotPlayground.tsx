
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

  // Reset robot when level changes
  useEffect(() => {
    setRobotPosition(level.startPosition);
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([]);
    setReachedGoal(false);
  }, [level]);

  // Draw the grid and robot
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cellSize = 40;
    canvas.width = level.grid[0].length * cellSize;
    canvas.height = level.grid.length * cellSize;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        const cell = level.grid[y][x];
        
        // Draw cell background
        ctx.fillStyle = '#f0f4ff'; // Default empty cell
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        
        // Draw cell content
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
            // Don't draw if already collected
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
        
        // Draw grid lines
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    
    // Draw execution path (lightly)
    executionPath.forEach((step, index) => {
      if (index > 0) { // Skip the first position (starting point)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'; // Light blue
        ctx.beginPath();
        ctx.arc(
          step.x * cellSize + cellSize/2, 
          step.y * cellSize + cellSize/2, 
          cellSize/4, 0, 2 * Math.PI
        );
        ctx.fill();
      }
    });
    
    // Draw robot
    ctx.save();
    ctx.translate(
      robotPosition.x * cellSize + cellSize/2, 
      robotPosition.y * cellSize + cellSize/2
    );
    
    // Rotate based on direction
    const rotationDegrees = {
      'up': 0,
      'right': 90,
      'down': 180,
      'left': -90
    };
    ctx.rotate(rotationDegrees[robotDirection] * Math.PI / 180);
    
    // Draw robot body
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw robot face direction indicator
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -cellSize/6, cellSize/8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
    
  }, [level, robotPosition, robotDirection, collectedItems, executionPath]);

  // Check if we've reached the goal
  useEffect(() => {
    // Check if robot is at goal position
    if (level.goalPosition) {
      if (robotPosition.x === level.goalPosition.x && robotPosition.y === level.goalPosition.y) {
        setReachedGoal(true);
      }
    } else {
      // Find goal in grid if not explicitly defined
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

  // Execute code blocks when running
  useEffect(() => {
    if (!isRunning || codeBlocks.length === 0) return;
    
    // Reset robot position and execution data
    setRobotPosition({...level.startPosition});
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([{...level.startPosition, direction: level.startDirection}]);
    setReachedGoal(false);
    
    let currentBlockIndex = 0;
    const loopStack: {startIndex: number, iterations: number, count: number}[] = [];
    
    const executeNextBlock = () => {
      if (currentBlockIndex >= codeBlocks.length) {
        // Check if we need to return to a loop
        if (loopStack.length > 0) {
          const currentLoop = loopStack[loopStack.length - 1];
          currentLoop.count++;
          
          if (currentLoop.count < currentLoop.iterations) {
            // Go back to start of loop
            currentBlockIndex = currentLoop.startIndex;
            setTimeout(executeNextBlock, 500);
          } else {
            // Loop complete, remove from stack
            loopStack.pop();
            // We're done with all blocks
            return;
          }
        }
        return;
      }
      
      const block = codeBlocks[currentBlockIndex];
      
      // Process current block
      switch (block) {
        case 'move-forward':
          setRobotPosition(pos => {
            const newPos = {...pos};
            const nextPos = {...pos}; // Calculate potential next position
            
            // Determine next position based on current direction
            switch (robotDirection) {
              case 'up': nextPos.y = Math.max(0, pos.y - 1); break;
              case 'right': nextPos.x = Math.min(level.grid[0].length - 1, pos.x + 1); break;
              case 'down': nextPos.y = Math.min(level.grid.length - 1, pos.y + 1); break;
              case 'left': nextPos.x = Math.max(0, pos.x - 1); break;
            }
            
            // Check if there's a wall in the next position
            if (level.grid[nextPos.y] && level.grid[nextPos.y][nextPos.x]) {
              const nextCell = level.grid[nextPos.y][nextPos.x];
              if (nextCell.type !== 'wall') {
                // If no wall, update position
                newPos.x = nextPos.x;
                newPos.y = nextPos.y;
                
                // Record this move in the execution path
                setExecutionPath(path => [...path, {...newPos, direction: robotDirection}]);
                
                // Check for collectibles
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
            
            // Update execution path with new direction
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
            
            // Update execution path with new direction
            setExecutionPath(path => {
              const lastStep = path[path.length - 1];
              return [...path, {...lastStep, direction: newDir}];
            });
            
            return newDir;
          });
          break;
          
        case 'collect':
          // Try to collect item at current position
          const currentCell = level.grid[robotPosition.y][robotPosition.x];
          if (currentCell.type === 'collectible') {
            setCollectedItems(items => [...items, {x: robotPosition.x, y: robotPosition.y}]);
          }
          break;
          
        case 'loop-start-3':
          // Add new loop to stack
          loopStack.push({startIndex: currentBlockIndex + 1, iterations: 3, count: 0});
          break;
          
        case 'loop-end':
          if (loopStack.length > 0) {
            const currentLoop = loopStack[loopStack.length - 1];
            currentLoop.count++;
            
            if (currentLoop.count < currentLoop.iterations) {
              // Go back to start of loop
              currentBlockIndex = currentLoop.startIndex - 1; // -1 because we'll increment at the end
            } else {
              // Loop complete, remove from stack
              loopStack.pop();
            }
          }
          break;
          
        case 'if-path':
          // Check if the path ahead is clear
          let pathClear = false;
          const nextPos = {...robotPosition};
          
          // Determine the position in front based on current direction
          switch (robotDirection) {
            case 'up': nextPos.y = Math.max(0, robotPosition.y - 1); break;
            case 'right': nextPos.x = Math.min(level.grid[0].length - 1, robotPosition.x + 1); break;
            case 'down': nextPos.y = Math.min(level.grid.length - 1, robotPosition.y + 1); break;
            case 'left': nextPos.x = Math.max(0, robotPosition.x - 1); break;
          }
          
          // Check if the cell in front is not a wall
          if (level.grid[nextPos.y] && level.grid[nextPos.y][nextPos.x]) {
            pathClear = level.grid[nextPos.y][nextPos.x].type !== 'wall';
          }
          
          // If path is not clear, skip the next block
          if (!pathClear) {
            currentBlockIndex++;
          }
          break;
      }
      
      // Move to next block
      currentBlockIndex++;
      
      // Schedule execution of next block
      setTimeout(executeNextBlock, 500);
    };
    
    // Start the execution sequence
    setTimeout(executeNextBlock, 500);
    
  }, [isRunning, codeBlocks, level]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-2 border-gray-100 rounded-lg p-2 flex-1 min-h-[300px] flex items-center justify-center">
        <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="border border-gray-300 bg-blue-50 shadow-md"
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
