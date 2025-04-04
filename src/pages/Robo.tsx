import { useState, useEffect } from "react";
import { BlockCodeEditor } from "@/components/BlockCodeEditor";
import { RobotPlayground } from "@/components/RobotPlayground";
import { LevelSelector } from "@/components/LevelSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, Lightbulb, Award } from "lucide-react";
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
  const [robotDirection, setRobotDirection] = useState(levels[currentLevel].startDirection);
  const [collectedItems, setCollectedItems] = useState<{x: number, y: number}[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);
  
  const level = levels[currentLevel];
  
  useEffect(() => {
    setCodeBlocks([]);
    setSuccess(null);
    setRobotPosition(level.startPosition);
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    setShowHint(false);
    setExecutionComplete(false);
  }, [currentLevel, level.startPosition, level.startDirection]);
  
  // Listen for execution completion events from RobotPlayground
  const handleExecutionComplete = (reachedGoal: boolean, collectedCount: number) => {
    setExecutionComplete(true);
    
    // Determine success based on level requirements
    let isSuccessful = false;
    
    const requiredBlocksUsed = level.requiredBlocks.every(block => 
      codeBlocks.some(b => b === block)
    );
    
    if (level.id === 4) {
      const requiredCollectibleCount = level.grid.flat().filter(cell => cell.type === 'collectible').length;
      isSuccessful = reachedGoal && collectedCount >= requiredCollectibleCount;
    } else if (level.id === 1 || level.id === 2 || level.id === 3 || level.id === 5) {
      isSuccessful = reachedGoal && requiredBlocksUsed;
    }
    
    setSuccess(isSuccessful);
    
    if (isSuccessful) {
      toast.success("Missão cumprida! Robô chegou ao objetivo.", {
        duration: 3000,
      });
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
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setSuccess(null);
    setShowHint(false);
    setExecutionComplete(false);
    
    setRobotPosition(level.startPosition);
    setRobotDirection(level.startDirection);
    setCollectedItems([]);
    
    // O RobotPlayground irá chamar handleExecutionComplete quando terminar
  };

  const resetCode = () => {
    setCodeBlocks([]);
    setSuccess(null);
    setShowHint(false);
    setExecutionComplete(false);
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

  const toggleHint = () => {
    setShowHint(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Exploração Robótica Avançada
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              Programe seu robô explorador para navegar em terrenos alienígenas e completar missões científicas.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 mb-8"
          >
            <Card className="p-4 bg-white border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                <Award className="mr-2 h-5 w-5 text-amber-500" />
                {level.title}
              </h2>
              <p className="text-gray-700 mb-4">{level.description}</p>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2">Objetivo da Missão</h3>
                <p className="text-sm text-gray-600">{level.objective}</p>
              </div>
              
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200"
                >
                  <h3 className="font-bold text-amber-800 mb-1">Dica</h3>
                  <p className="text-sm text-gray-600">{level.hint || "Tente usar os comandos disponíveis na ordem certa para alcançar o objetivo."}</p>
                </motion.div>
              )}
              
              <div className="mt-6">
                <h3 className="font-bold text-indigo-800 mb-2 flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2 text-xs">NÍVEL</span>
                  Selecione a Missão
                </h3>
                <LevelSelector 
                  levels={levels} 
                  currentLevel={currentLevel} 
                  setCurrentLevel={setCurrentLevel} 
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={toggleHint}
                  className="flex items-center text-amber-600 border-amber-300 hover:bg-amber-50"
                >
                  <Lightbulb className="mr-1 h-4 w-4" />
                  {showHint ? "Ocultar Dica" : "Mostrar Dica"}
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 bg-white border-2 border-blue-100 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2 text-sm">1</span>
                  Sequência de Comandos
                </h2>
                <BlockCodeEditor 
                  onUpdateBlocks={setCodeBlocks} 
                  blocks={codeBlocks}
                  availableBlocks={level.availableBlocks}
                  onRunCode={handleRunCode}
                  onReset={resetCode}
                  isRunning={isRunning}
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 bg-white border-2 border-blue-100 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2 text-sm">2</span>
                  Simulação: {level.title}
                </h2>
                <RobotPlayground 
                  level={level}
                  codeBlocks={codeBlocks} 
                  isRunning={isRunning}
                  success={success}
                  onExecutionComplete={handleExecutionComplete}
                />
                <div className="mt-4 flex justify-center">
                  {success && (
                    <Button 
                      onClick={nextLevel} 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <PlayIcon className="mr-2 h-4 w-4" />
                      Próxima Missão
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Robo;
