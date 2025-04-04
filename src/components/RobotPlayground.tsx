
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Cell {
  type: 'empty' | 'wall' | 'goal' | 'obstacle' | 'collectible';
}

interface Position {
  x: number;
  y: number;
}

interface RobotPlaygroundProps {
  level: {
    grid: Cell[][];
    startPosition: Position;
    startDirection: 'up' | 'right' | 'down' | 'left';
    goalPosition?: Position;
  };
  codeBlocks: string[];
  isRunning: boolean;
  success: boolean | null;
}

// Direction vectors for efficient movement calculations
const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
};

// Rotation degrees for visual representation
const ROTATION_DEGREES = {
  up: 0,
  right: 90,
  down: 180,
  left: 270
};

export const RobotPlayground: React.FC<RobotPlaygroundProps> = ({ 
  level, 
  codeBlocks, 
  isRunning,
  success 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [robotPosition, setRobotPosition] = useState<Position>(level.startPosition);
  const [robotDirection, setRobotDirection] = useState<'up' | 'right' | 'down' | 'left'>(level.startDirection);
  const [collectedItems, setCollectedItems] = useState<Position[]>([]);
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

  // Function to get next position based on current position and direction
  const getNextPosition = (position: Position, direction: 'up' | 'right' | 'down' | 'left'): Position => {
    const vector = DIRECTION_VECTORS[direction];
    return {
      x: position.x + vector.x,
      y: position.y + vector.y
    };
  };

  // Check if position is within grid boundaries
  const isValidPosition = (position: Position): boolean => {
    return (
      position.y >= 0 && 
      position.y < level.grid.length && 
      position.x >= 0 && 
      position.x < level.grid[0].length &&
      level.grid[position.y][position.x].type !== 'wall'
    );
  };

  // Draw the robot playground with realistic graphics
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
    
    // Draw terrain background
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        // Base terrain color with slight variation for realism
        const variation = Math.random() * 10;
        ctx.fillStyle = `rgb(${210 + variation}, ${230 + variation}, ${245 + variation})`;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        
        // Add terrain texture
        ctx.strokeStyle = `rgba(180, 210, 230, 0.3)`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * cellSize + 4, y * cellSize + 4, cellSize - 8, cellSize - 8);
      }
    }
    
    // Draw grid elements with realistic styling
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        const cell = level.grid[y][x];
        
        switch (cell.type) {
          case 'wall':
            // Metallic wall with 3D effect
            const gradient = ctx.createLinearGradient(
              x * cellSize, y * cellSize, 
              x * cellSize + cellSize, y * cellSize + cellSize
            );
            gradient.addColorStop(0, '#5a6577');
            gradient.addColorStop(0.5, '#8d9cad');
            gradient.addColorStop(1, '#5a6577');
            ctx.fillStyle = gradient;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            
            // Wall texture
            ctx.fillStyle = 'rgba(50, 50, 60, 0.4)';
            ctx.fillRect(x * cellSize + 5, y * cellSize + 5, cellSize - 10, cellSize - 10);
            break;
          
          case 'goal':
            // Goal with glowing effect
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(
              x * cellSize + cellSize/2, 
              y * cellSize + cellSize/2, 
              cellSize/3, 0, 2 * Math.PI
            );
            ctx.fill();
            
            // Inner glow
            const goalGradient = ctx.createRadialGradient(
              x * cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize/6,
              x * cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize/3
            );
            goalGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            goalGradient.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
            ctx.fillStyle = goalGradient;
            ctx.beginPath();
            ctx.arc(
              x * cellSize + cellSize/2, 
              y * cellSize + cellSize/2, 
              cellSize/3, 0, 2 * Math.PI
            );
            ctx.fill();
            break;
            
          case 'obstacle':
            // Rocky obstacle
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(x * cellSize + cellSize/2, y * cellSize + 10);
            ctx.lineTo(x * cellSize + cellSize - 10, y * cellSize + cellSize/2);
            ctx.lineTo(x * cellSize + cellSize/2, y * cellSize + cellSize - 10);
            ctx.lineTo(x * cellSize + 10, y * cellSize + cellSize/2);
            ctx.closePath();
            ctx.fill();
            
            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.moveTo(x * cellSize + cellSize/2, y * cellSize + 10);
            ctx.lineTo(x * cellSize + cellSize - 10, y * cellSize + cellSize/2);
            ctx.lineTo(x * cellSize + cellSize/2, y * cellSize + cellSize/3);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'collectible':
            if (!collectedItems.some(item => item.x === x && item.y === y)) {
              // Crystal collectible with glow
              ctx.fillStyle = '#fcd34d';
              
              // Crystal base
              ctx.beginPath();
              ctx.moveTo(x * cellSize + cellSize/2, y * cellSize + 10);
              ctx.lineTo(x * cellSize + cellSize - 10, y * cellSize + cellSize/2);
              ctx.lineTo(x * cellSize + cellSize/2, y * cellSize + cellSize - 10);
              ctx.lineTo(x * cellSize + 10, y * cellSize + cellSize/2);
              ctx.closePath();
              ctx.fill();
              
              // Inner glow
              const crystalGradient = ctx.createRadialGradient(
                x * cellSize + cellSize/2, y * cellSize + cellSize/2, 0,
                x * cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize/3
              );
              crystalGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              crystalGradient.addColorStop(1, 'rgba(252, 211, 77, 0)');
              ctx.fillStyle = crystalGradient;
              ctx.beginPath();
              ctx.arc(
                x * cellSize + cellSize/2, 
                y * cellSize + cellSize/2, 
                cellSize/4, 0, 2 * Math.PI
              );
              ctx.fill();
            }
            break;
        }
      }
    }
    
    // Draw execution path with fade effect
    executionPath.forEach((step, index) => {
      if (index > 0) {
        const alpha = 0.1 + (index / executionPath.length) * 0.2;
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          step.x * cellSize + cellSize/2, 
          step.y * cellSize + cellSize/2, 
          cellSize/4, 0, 2 * Math.PI
        );
        ctx.fill();
      }
    });
    
    // Draw robot with direction indicator - more realistic appearance
    ctx.save();
    ctx.translate(
      robotPosition.x * cellSize + cellSize/2, 
      robotPosition.y * cellSize + cellSize/2
    );
    
    // Rotate based on direction
    ctx.rotate((ROTATION_DEGREES[robotDirection] * Math.PI) / 180);
    
    // Robot body - metallic look
    const robotGradient = ctx.createLinearGradient(-cellSize/3, -cellSize/3, cellSize/3, cellSize/3);
    robotGradient.addColorStop(0, '#4b5563');
    robotGradient.addColorStop(0.5, '#9ca3af');
    robotGradient.addColorStop(1, '#4b5563');
    ctx.fillStyle = robotGradient;
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Robot details
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Direction indicator - front sensor
    ctx.fillStyle = '#f87171';
    ctx.beginPath();
    ctx.arc(0, -cellSize/4, cellSize/8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Side details
    ctx.fillStyle = '#d1d5db';
    ctx.beginPath();
    ctx.arc(-cellSize/5, 0, cellSize/10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cellSize/5, 0, cellSize/10, 0, 2 * Math.PI);
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

  // Execute code blocks with improved movement logic
  useEffect(() => {
    if (!isRunning || codeBlocks.length === 0) return;
    
    // Reset robot state
    setRobotPosition({...level.startPosition});
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setExecutionPath([{...level.startPosition, direction: level.startDirection}]);
    setReachedGoal(false);
    
    console.log("Starting execution with position:", level.startPosition, "and direction:", level.startDirection);
    
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
      console.log(`Executing block: ${block} at index ${currentBlockIndex}`);
      
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
        // Calculate next position based on current direction vector
        const nextPosition = getNextPosition(currentPosition, robotDirection);
        console.log("Attempting to move from", currentPosition, "to", nextPosition, "facing", robotDirection);
        
        // Check if the move is valid within boundaries and not into a wall
        if (isValidPosition(nextPosition)) {
          console.log("Move is valid, new position:", nextPosition);
          
          // Record the move in execution path
          setExecutionPath(path => [...path, {...nextPosition, direction: robotDirection}]);
          
          // Check for collectible
          const nextCell = level.grid[nextPosition.y][nextPosition.x];
          if (nextCell.type === 'collectible') {
            console.log("Collected item at", nextPosition);
            setCollectedItems(items => [...items, {x: nextPosition.x, y: nextPosition.y}]);
          }
          
          // Check if reached goal
          if ((level.goalPosition && 
               nextPosition.x === level.goalPosition.x && 
               nextPosition.y === level.goalPosition.y) ||
              nextCell.type === 'goal') {
            console.log("Reached goal!");
            setReachedGoal(true);
          }
          
          return nextPosition;
        } else {
          console.log("Move invalid, staying at", currentPosition);
          return currentPosition;
        }
      });
    };
    
    const turnRobotLeft = () => {
      setRobotDirection(currentDirection => {
        let newDirection: 'up' | 'right' | 'down' | 'left';
        
        // Calculate new direction using the directional cycle
        switch (currentDirection) {
          case 'up': newDirection = 'left'; break;
          case 'right': newDirection = 'up'; break;
          case 'down': newDirection = 'right'; break;
          case 'left': newDirection = 'down'; break;
          default: newDirection = currentDirection;
        }
        
        console.log(`Turning left: ${currentDirection} -> ${newDirection}`);
        
        // Update execution path with new direction
        setExecutionPath(path => {
          const lastStep = path[path.length - 1];
          return [...path, {...lastStep, direction: newDirection}];
        });
        
        return newDirection;
      });
    };
    
    const turnRobotRight = () => {
      setRobotDirection(currentDirection => {
        let newDirection: 'up' | 'right' | 'down' | 'left';
        
        // Calculate new direction using the directional cycle
        switch (currentDirection) {
          case 'up': newDirection = 'right'; break;
          case 'right': newDirection = 'down'; break;
          case 'down': newDirection = 'left'; break;
          case 'left': newDirection = 'up'; break;
          default: newDirection = currentDirection;
        }
        
        console.log(`Turning right: ${currentDirection} -> ${newDirection}`);
        
        // Update execution path with new direction
        setExecutionPath(path => {
          const lastStep = path[path.length - 1];
          return [...path, {...lastStep, direction: newDirection}];
        });
        
        return newDirection;
      });
    };
    
    const collectItem = () => {
      const currentCell = level.grid[robotPosition.y][robotPosition.x];
      if (currentCell.type === 'collectible') {
        console.log("Collecting item at current position:", robotPosition);
        setCollectedItems(items => [...items, {x: robotPosition.x, y: robotPosition.y}]);
      } else {
        console.log("No collectible found at current position:", robotPosition);
      }
    };
    
    const handleLoopEnd = () => {
      if (loopStack.length > 0) {
        const currentLoop = loopStack[loopStack.length - 1];
        currentLoop.count++;
        
        console.log(`Loop iteration ${currentLoop.count}/${currentLoop.iterations}`);
        
        if (currentLoop.count < currentLoop.iterations) {
          currentBlockIndex = currentLoop.startIndex - 1;
        } else {
          console.log("Loop completed");
          loopStack.pop();
        }
      }
    };
    
    const checkIfPathClear = () => {
      const nextPosition = getNextPosition(robotPosition, robotDirection);
      const pathClear = isValidPosition(nextPosition);
      
      console.log(`Checking if path clear in direction ${robotDirection}: ${pathClear ? "YES" : "NO"}`);
      
      if (!pathClear) {
        currentBlockIndex++;
      }
    };
    
    // Start execution
    setTimeout(executeNextBlock, 500);
  }, [isRunning, codeBlocks, level]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-2 border-gray-100 rounded-lg p-2 flex-1 overflow-hidden relative" style={{ height: '360px', minHeight: '360px', maxHeight: '360px' }}>
        {/* Backdrop for 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 opacity-50"></div>
        
        <div className="relative flex items-center justify-center h-full w-full">
          <canvas 
            ref={canvasRef} 
            className="border border-gray-300 shadow-md robot-position"
            data-x={robotPosition.x}
            data-y={robotPosition.y}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              height: 'auto',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '4px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
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
              } p-6 shadow-lg`}>
                {success ? '✓ SUCESSO!' : '✗ TENTE NOVAMENTE!'}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
