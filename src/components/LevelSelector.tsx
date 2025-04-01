
import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

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
    <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
      <div className="flex space-x-4 min-w-max">
        {levels.map((level, index) => {
          // Determine if level is locked (only allow sequential progression)
          const isLocked = index > currentLevel + 1;
          
          // Determine the status of the level
          const isActive = index === currentLevel;
          const isCompleted = index < currentLevel;
          const isNext = index === currentLevel + 1;
          
          // Styling based on level state
          let bgColor = "";
          let textColor = "";
          let borderStyle = "";
          
          if (isActive) {
            bgColor = "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500";
            textColor = "text-white";
            borderStyle = "border-2 border-white shadow-lg";
          } else if (isCompleted) {
            bgColor = "bg-gradient-to-br from-green-400 to-green-300";
            textColor = "text-white";
            borderStyle = "border border-green-200";
          } else if (isLocked) {
            bgColor = "bg-gray-100";
            textColor = "text-gray-400";
            borderStyle = "border border-gray-200";
          } else {
            bgColor = "bg-white";
            textColor = "text-purple-700";
            borderStyle = "border border-purple-200";
          }
          
          // Difficulty indicator styling
          const difficultyColor = 
            level.difficulty === 'easy' 
              ? 'bg-green-500' 
              : level.difficulty === 'medium' 
                ? 'bg-yellow-500' 
                : 'bg-red-500';
          
          return (
            <motion.div
              key={level.id}
              whileHover={!isLocked ? { scale: 1.05 } : {}}
              whileTap={!isLocked ? { scale: 0.95 } : {}}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <button
                  onClick={() => !isLocked && setCurrentLevel(index)}
                  className={`relative w-16 h-16 rounded-full ${bgColor} ${textColor} ${borderStyle} flex items-center justify-center text-xl font-bold shadow-sm transition-all duration-300 ${!isLocked ? 'hover:shadow-md' : ''}`}
                  disabled={isLocked}
                >
                  {isLocked ? (
                    <Lock className="w-6 h-6 opacity-70" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                
                {index < levels.length - 1 && !isLocked && (
                  <div className={`absolute top-1/2 left-full w-4 h-0.5 ${isCompleted ? 'bg-green-300' : 'bg-gray-200'}`} style={{ transform: 'translateY(-50%)' }}></div>
                )}
              </div>
              
              <div className="mt-2 flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full ${difficultyColor} ${isLocked ? 'opacity-40' : ''}`} />
                <div className={`text-xs mt-1 font-medium ${isLocked ? 'text-gray-400' : 'text-gray-700'} max-w-[85px] text-center truncate`}>
                  {isLocked ? "Bloqueado" : level.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
