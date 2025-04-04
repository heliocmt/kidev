
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

// Direction vectors for each possible direction
interface DirectionVector {
  x: number;
  y: number;
}

const DIRECTION_VECTORS: Record<string, DirectionVector> = {
  'up': { x: 0, y: -1 },    // Up decreases Y
  'right': { x: 1, y: 0 },  // Right increases X
  'down': { x: 0, y: 1 },   // Down increases Y
  'left': { x: -1, y: 0 }   // Left decreases X
};

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

  // Get next position based on current position and direction vector
  const getNextPosition = (currentPosition: { x: number, y: number }, direction: 'up' | 'right' | 'down' | 'left') => {
    // Get the direction vector for the current direction
    const dirVector = DIRECTION_VECTORS[direction];
    
    // Calculate next position by adding direction vector to current position
    const nextPos = { 
      x: currentPosition.x + dirVector.x,
      y: currentPosition.y + dirVector.y
    };
    
    console.log(`Movendo de (${currentPosition.x},${currentPosition.y}) para (${nextPos.x},${nextPos.y}) na direção ${direction}`);
    console.log(`Vetor de direção: (${dirVector.x}, ${dirVector.y})`);
    
    return nextPos;
  };

  // Helper function to check if a move is valid
  const isValidMove = (position: { x: number, y: number }) => {
    // Check if the position is within grid boundaries
    if (position.y < 0 || position.y >= level.grid.length ||
        position.x < 0 || position.x >= level.grid[0].length) {
      console.log(`Posição inválida: fora dos limites (${position.x},${position.y})`);
      return false;
    }
    
    // Check if the cell is not a wall
    const cell = level.grid[position.y][position.x];
    const isWall = cell.type === 'wall';
    
    if (isWall) {
      console.log(`Posição inválida: parede em (${position.x},${position.y})`);
    }
    
    return !isWall;
  };

  // Helper function to turn the robot left
  const turnRobotLeft = () => {
    console.log(`turnRobotLeft - Virando da direção ${robotDirection}`);
    
    // Calculate new direction after turning left
    const directionOrder = ['up', 'left', 'down', 'right'];
    const currentIndex = directionOrder.indexOf(robotDirection);
    const newDirection = directionOrder[(currentIndex + 1) % 4] as 'up' | 'right' | 'down' | 'left';
    
    console.log(`Virou à esquerda: ${robotDirection} -> ${newDirection}`);
    
    // Update the execution path with the new direction
    setExecutionPath(path => {
      const lastPos = path[path.length - 1];
      return [...path, { x: lastPos.x, y: lastPos.y, direction: newDirection }];
    });
    
    // Update robot direction
    setRobotDirection(newDirection);
  };

  // Helper function to turn the robot right
  const turnRobotRight = () => {
    console.log(`turnRobotRight - Virando da direção ${robotDirection}`);
    
    // Calculate new direction after turning right
    const directionOrder = ['up', 'right', 'down', 'left'];
    const currentIndex = directionOrder.indexOf(robotDirection);
    const newDirection = directionOrder[(currentIndex + 1) % 4] as 'up' | 'right' | 'down' | 'left';
    
    console.log(`Virou à direita: ${robotDirection} -> ${newDirection}`);
    
    // Update the execution path with the new direction
    setExecutionPath(path => {
      const lastPos = path[path.length - 1];
      return [...path, { x: lastPos.x, y: lastPos.y, direction: newDirection }];
    });
    
    // Update robot direction
    setRobotDirection(newDirection);
  };

  // Helper function to move the robot forward based on its current direction
  const moveRobotForward = () => {
    console.log(`moveRobotForward - Posição atual: (${robotPosition.x}, ${robotPosition.y}), Direção: ${robotDirection}`);
    
    // Calculate next position based on direction
    const nextPos = getNextPosition(robotPosition, robotDirection);
    
    // Move only if the next position is valid
    if (isValidMove(nextPos)) {
      console.log(`Posição válida! Movendo para: (${nextPos.x}, ${nextPos.y})`);
      
      // Update execution path
      setExecutionPath(path => [...path, {...nextPos, direction: robotDirection}]);
      
      // Check for collectible items
      if (nextPos.y >= 0 && nextPos.y < level.grid.length && 
          nextPos.x >= 0 && nextPos.x < level.grid[0].length) {
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
      }
      
      // Update robot position
      setRobotPosition(nextPos);
    } else {
      console.log(`Movimento inválido! Permanecendo em: (${robotPosition.x}, ${robotPosition.y})`);
    }
  };

  // Helper function to collect items
  const collectItem = () => {
    const currentCell = level.grid[robotPosition.y]?.[robotPosition.x];
    if (currentCell && currentCell.type === 'collectible') {
      setCollectedItems(items => [...items, {x: robotPosition.x, y: robotPosition.y}]);
      console.log(`Item coletado em (${robotPosition.x}, ${robotPosition.y})`);
    } else {
      console.log(`Nenhum item para coletar em (${robotPosition.x}, ${robotPosition.y})`);
    }
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
    
    console.log("Iniciando execução com posição:", level.startPosition, "direção:", level.startDirection);
    
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
      console.log(`Executando bloco: ${block} (índice ${currentBlockIndex})`);
      
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
    
    const handleLoopEnd = () => {
      if (loopStack.length > 0) {
        const currentLoop = loopStack[loopStack.length - 1];
        currentLoop.count++;
        console.log(`Loop: iteração ${currentLoop.count} de ${currentLoop.iterations}`);
        
        if (currentLoop.count < currentLoop.iterations) {
          currentBlockIndex = currentLoop.startIndex - 1;
        } else {
          loopStack.pop();
          console.log("Loop finalizado");
        }
      }
    };
    
    const checkIfPathClear = () => {
      const nextPos = getNextPosition(robotPosition, robotDirection);
      const pathClear = isValidMove(nextPos);
      console.log(`Verificando caminho: ${pathClear ? "livre" : "bloqueado"}`);
      
      if (!pathClear) {
        currentBlockIndex++;
      }
    };
    
    // Start executing blocks
    console.log("Iniciando execução de blocos:", codeBlocks);
    setTimeout(executeNextBlock, 500);
    
    // Cleanup function
    return () => {
      // If necessary, add cleanup code here
    };
    
  }, [isRunning, codeBlocks, level]);

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
