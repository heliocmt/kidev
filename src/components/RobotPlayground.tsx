
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

  // Reset robot state when level changes
  useEffect(() => {
    setRobotPosition(level.startPosition);
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([]);
    setReachedGoal(false);
  }, [level]);

  // Draw the robot playground
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
    
    // Draw grid and cells
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
    
    // Draw execution path
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
    
    // Draw robot with direction indicator
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
    
    // Robot body
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Direction indicator (white circle)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -cellSize/6, cellSize/8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
    
    // Add data attributes for success detection
    const robotElement = document.querySelector('.robot-position');
    if (robotElement) {
      robotElement.setAttribute('data-x', robotPosition.x.toString());
      robotElement.setAttribute('data-y', robotPosition.y.toString());
    }
  }, [level, robotPosition, robotDirection, collectedItems, executionPath]);

  // Check if robot reached the goal
  useEffect(() => {
    if (!level.goalPosition) return;
    
    if (robotPosition.x === level.goalPosition.x && 
        robotPosition.y === level.goalPosition.y) {
      setReachedGoal(true);
    }
  }, [robotPosition, level.goalPosition]);

  // Helper function to get next position based on current direction
  const getNextPosition = (currentPosition: { x: number, y: number }, direction: 'up' | 'right' | 'down' | 'left') => {
    const nextPos = { ...currentPosition };
    
    switch (direction) {
      case 'up':
        nextPos.y = Math.max(0, currentPosition.y - 1);
        break;
      case 'right':
        nextPos.x = Math.min(level.grid[0].length - 1, currentPosition.x + 1);
        break;
      case 'down':
        nextPos.y = Math.min(level.grid.length - 1, currentPosition.y + 1);
        break;
      case 'left':
        nextPos.x = Math.max(0, currentPosition.x - 1);
        break;
    }
    
    return nextPos;
  };

  // Helper function to check if a move is valid
  const isValidMove = (nextPosition: { x: number, y: number }) => {
    if (!level.grid[nextPosition.y] || !level.grid[nextPosition.y][nextPosition.x]) {
      return false;
    }
    
    const nextCell = level.grid[nextPosition.y][nextPosition.x];
    return nextCell.type !== 'wall';
  };

  // Execute code blocks when running
  useEffect(() => {
    if (!isRunning || codeBlocks.length === 0) return;
    
    // Reset robot state
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
          moveRobotForward();
          break;
        
        case 'turn-left':
          turnRobotLeft();
          break;
          
        case 'turn-right':
          turnRobotRight();
          break;
          
        case 'collect':
          collectItem();
          break;
          
        case 'loop-start-3':
          loopStack.push({startIndex: currentBlockIndex + 1, iterations: 3, count: 0});
          break;
          
        case 'loop-end':
          handleLoopEnd();
          break;
          
        case 'if-path':
          checkIfPathClear();
          break;
      }
      
      currentBlockIndex++;
      
      setTimeout(executeNextBlock, 500);
    };
    
    const moveRobotForward = () => {
      setRobotPosition(currentPosition => {
        // Calculate the next position based on current direction
        const nextPos = getNextPosition(currentPosition, robotDirection);
        
        // Only move if the next position is valid
        if (isValidMove(nextPos)) {
          // Update the execution path
          setExecutionPath(path => [...path, {...nextPos, direction: robotDirection}]);
          
          // Check if we collected an item
          const nextCell = level.grid[nextPos.y][nextPos.x];
          if (nextCell.type === 'collectible') {
            setCollectedItems(items => [...items, {x: nextPos.x, y: nextPos.y}]);
          }
          
          // Check if reached goal
          if (nextCell.type === 'goal' || 
              (level.goalPosition && 
               nextPos.x === level.goalPosition.x && 
               nextPos.y === level.goalPosition.y)) {
            setReachedGoal(true);
          }
          
          return nextPos;
        }
        
        return currentPosition;
      });
    };
    
    const turnRobotLeft = () => {
      setRobotDirection(currentDirection => {
        let newDirection: 'up' | 'right' | 'down' | 'left';
        
        switch (currentDirection) {
          case 'up':
            newDirection = 'left';
            break;
          case 'right':
            newDirection = 'up';
            break;
          case 'down':
            newDirection = 'right';
            break;
          case 'left':
            newDirection = 'down';
            break;
          default:
            newDirection = currentDirection;
        }
        
        // Update the execution path with the new direction
        setExecutionPath(path => {
          const lastPos = path[path.length - 1];
          const newPos = { x: lastPos.x, y: lastPos.y, direction: newDirection };
          return [...path, newPos];
        });
        
        return newDirection;
      });
    };
    
    const turnRobotRight = () => {
      setRobotDirection(currentDirection => {
        let newDirection: 'up' | 'right' | 'down' | 'left';
        
        switch (currentDirection) {
          case 'up':
            newDirection = 'right';
            break;
          case 'right':
            newDirection = 'down';
            break;
          case 'down':
            newDirection = 'left';
            break;
          case 'left':
            newDirection = 'up';
            break;
          default:
            newDirection = currentDirection;
        }
        
        // Update the execution path with the new direction
        setExecutionPath(path => {
          const lastPos = path[path.length - 1];
          const newPos = { x: lastPos.x, y: lastPos.y, direction: newDirection };
          return [...path, newPos];
        });
        
        return newDirection;
      });
    };
    
    const collectItem = () => {
      const currentCell = level.grid[robotPosition.y][robotPosition.x];
      if (currentCell.type === 'collectible') {
        setCollectedItems(items => [...items, {x: robotPosition.x, y: robotPosition.y}]);
      }
    };
    
    const handleLoopEnd = () => {
      if (loopStack.length > 0) {
        const currentLoop = loopStack[loopStack.length - 1];
        currentLoop.count++;
        
        if (currentLoop.count < currentLoop.iterations) {
          currentBlockIndex = currentLoop.startIndex - 1;
        } else {
          loopStack.pop();
        }
      }
    };
    
    const checkIfPathClear = () => {
      const nextPos = getNextPosition(robotPosition, robotDirection);
      const pathClear = isValidMove(nextPos);
      
      if (!pathClear) {
        currentBlockIndex++;
      }
    };
    
    setTimeout(executeNextBlock, 500);
  }, [isRunning, codeBlocks, level, robotDirection]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-2 border-gray-100 rounded-lg p-2 flex-1 overflow-hidden" style={{ height: '360px', minHeight: '360px', maxHeight: '360px' }}>
        <div className="relative flex items-center justify-center h-full w-full">
          <canvas 
            ref={canvasRef} 
            className="border border-gray-300 bg-blue-50 shadow-md robot-position"
            data-x={robotPosition.x}
            data-y={robotPosition.y}
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
    </div>
  );
};
