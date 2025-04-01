
import React from 'react';
import { motion } from 'framer-motion';

interface Level {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface LevelSelectorProps {
  levels: Level[];
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  currentLevel,
  setCurrentLevel
}) => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-3 min-w-max">
        {levels.map((level, index) => {
          // Determine if level is locked (only allow sequential progression)
          const isLocked = index > currentLevel + 1;
          
          // Styling based on level state
          const baseClasses = "flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg";
          
          let statusClasses = "";
          if (index === currentLevel) {
            statusClasses = "bg-blue-600 text-white border-4 border-blue-300";
          } else if (isLocked) {
            statusClasses = "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50";
          } else if (index < currentLevel) {
            statusClasses = "bg-green-100 text-green-800 border-2 border-green-300";
          } else {
            statusClasses = "bg-blue-100 text-blue-800 border-2 border-blue-300 hover:bg-blue-200";
          }
          
          // Difficulty indicator color
          const difficultyColor = 
            level.difficulty === 'easy' 
              ? 'bg-green-500' 
              : level.difficulty === 'medium' 
                ? 'bg-yellow-500' 
                : 'bg-red-500';
          
          return (
            <motion.div
              key={level.id}
              whileHover={!isLocked ? { scale: 1.1 } : {}}
              whileTap={!isLocked ? { scale: 0.95 } : {}}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => !isLocked && setCurrentLevel(index)}
                className={`${baseClasses} ${statusClasses}`}
                disabled={isLocked}
              >
                {index + 1}
              </button>
              
              <div className="mt-1 flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full ${difficultyColor}`} />
                <div className="text-xs mt-1 font-medium text-gray-600 max-w-[80px] truncate">
                  {level.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
