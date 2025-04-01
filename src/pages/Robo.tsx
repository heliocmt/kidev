
import { useState, useEffect } from "react";
import { BlockCodeEditor } from "@/components/BlockCodeEditor";
import { RobotPlayground } from "@/components/RobotPlayground";
import { LevelSelector } from "@/components/LevelSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, RewindIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { levels } from "@/data/robot-levels";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Robo = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [robotPosition, setRobotPosition] = useState(levels[currentLevel].startPosition);
  const [collectedItems, setCollectedItems] = useState<{x: number, y: number}[]>([]);
  
  const level = levels[currentLevel];
  
  // Reset state when level changes
  useEffect(() => {
    setCodeBlocks([]);
    setSuccess(null);
    setRobotPosition(level.startPosition);
    setCollectedItems([]);
  }, [currentLevel, level.startPosition]);
  
  const handleRunCode = () => {
    setIsRunning(true);
    setSuccess(null);
    
    // Reset to initial state
    setRobotPosition(level.startPosition);
    setCollectedItems([]);
    
    // Check code after execution completes
    setTimeout(() => {
      // Get current robot position from the playground component
      const robotElement = document.querySelector('.robot-position') as HTMLElement;
      const finalPosition = robotElement?.dataset ? {
        x: parseInt(robotElement.dataset.x || '0'), 
        y: parseInt(robotElement.dataset.y || '0')
      } : robotPosition;
      
      // Check if robot reached the goal
      const isAtGoal = level.goalPosition ? 
        finalPosition.x === level.goalPosition.x && finalPosition.y === level.goalPosition.y 
        : false;
      
      // Check if all required collectibles were collected
      const requiredCollectibleCount = level.grid.flat().filter(cell => cell.type === 'collectible').length;
      const allCollected = collectedItems.length >= requiredCollectibleCount;
      
      // Check if all required blocks are used
      const requiredBlocksUsed = level.requiredBlocks.every(block => 
        codeBlocks.some(b => b === block)
      );
      
      const isSuccessful = isAtGoal && requiredBlocksUsed;
      
      if (level.id === 4) { // For collectible level
        setSuccess(isAtGoal && allCollected);
      } else {
        setSuccess(isSuccessful);
      }
      
      if (isSuccessful) {
        toast.success("Missão cumprida! Robô chegou ao objetivo.", {
          duration: 3000,
        });
        // Play success sound
        const audio = new Audio("/sounds/success.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed:", e));
      } else {
        toast.error("Ops! O robô não alcançou o objetivo.", {
          duration: 3000,
        });
        const audio = new Audio("/sounds/error.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed:", e));
      }
      
      setIsRunning(false);
    }, level.executionTime || 3000);
  };

  const resetCode = () => {
    setCodeBlocks([]);
    setSuccess(null);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      resetCode();
      toast("Nova missão desbloqueada!", { description: levels[currentLevel + 1].title });
    } else {
      toast("Parabéns! Você completou todas as fases!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Aventura do Robô Explorador
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              Ajude o robô a explorar planetas desconhecidos criando instruções com blocos de código!
            </p>
            
            <LevelSelector 
              levels={levels} 
              currentLevel={currentLevel} 
              setCurrentLevel={setCurrentLevel} 
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 bg-white border-2 border-blue-100 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2 text-sm">1</span>
                Comandos Disponíveis
              </h2>
              <BlockCodeEditor 
                onUpdateBlocks={setCodeBlocks} 
                blocks={codeBlocks}
                availableBlocks={level.availableBlocks}
              />
            </Card>

            <Card className="p-4 bg-white border-2 border-green-100 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                <span className="bg-green-100 text-green-700 p-1 rounded mr-2 text-sm">2</span>
                Planeta: {level.title}
              </h2>
              <RobotPlayground 
                level={level}
                codeBlocks={codeBlocks} 
                isRunning={isRunning}
                success={success}
              />
              <div className="mt-4 flex justify-center gap-4">
                <Button 
                  onClick={resetCode}
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  disabled={isRunning || codeBlocks.length === 0}
                >
                  <RewindIcon className="mr-2 h-4 w-4" />
                  Limpar Código
                </Button>
                <Button 
                  onClick={handleRunCode} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isRunning || codeBlocks.length === 0}
                >
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Executar Missão
                </Button>
                {success && (
                  <Button 
                    onClick={nextLevel} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Próxima Missão
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="p-4 bg-white border-2 border-purple-100 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-purple-700">{level.title}</h2>
              <p className="text-gray-700 mb-4">{level.description}</p>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-2">Objetivo</h3>
                <p className="text-sm text-gray-600">{level.objective}</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Robo;
