
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, 
  CodeIcon, 
  GamepadIcon,
  LightbulbIcon, 
  PuzzleIcon, 
  RocketIcon, 
  StarIcon, 
  BrainIcon,
  TargetIcon,
  MapPinIcon,
  FlagIcon,
  GraduationCapIcon,
  SparklesIcon,
  CompassIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PathStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isLeft: boolean;
  onClick: () => void;
  delay: number;
}

const PathStep: React.FC<PathStepProps> = ({ 
  step, 
  title, 
  description, 
  icon, 
  color, 
  isLeft,
  onClick,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={cn(
        "flex items-center gap-4 mb-6",
        isLeft ? "flex-row" : "flex-row-reverse"
      )}
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md shadow-purple-200 z-20",
          color
        )}
      >
        {icon}
      </motion.button>
      
      <div className={cn(
        "bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-purple-100 max-w-xs",
        isLeft ? "text-left" : "text-right"
      )}>
        <h3 className="font-bold text-sm text-purple-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  );
};

export const LearningPath: React.FC = () => {
  const navigate = useNavigate();

  const handleStepClick = (step: number) => {
    switch(step) {
      case 1:
        navigate('/game');
        break;
      case 4:
        navigate('/codepets');
        break;
      case 8:
        navigate('/blockcoding');
        break;
      case 12:
        navigate('/pythonquest');
        break;
      default:
        toast.info(`Em breve: Etapa ${step} da sua jornada!`);
    }
  };

  const pathSteps = [
    {
      step: 1,
      title: "Primeiros Passos",
      description: "Comece sua jornada na programação",
      icon: <LightbulbIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 2,
      title: "Algoritmos Básicos",
      description: "Aprenda a pensar como um programador",
      icon: <PuzzleIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 3,
      title: "Lógica Divertida",
      description: "Resolva desafios de lógica",
      icon: <BrainIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 4,
      title: "CodePets",
      description: "Crie e cuide de pets virtuais",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 5,
      title: "Variáveis & Dados",
      description: "Aprenda a armazenar informações",
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 6,
      title: "Missão Loops",
      description: "Domine a arte da repetição",
      icon: <RocketIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 7,
      title: "Condicionais",
      description: "Tome decisões no seu código",
      icon: <MapPinIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 8,
      title: "Blocos de Código",
      description: "Programe usando blocos visuais",
      icon: <CodeIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 9,
      title: "Funções Mágicas",
      description: "Crie suas próprias funções",
      icon: <SparklesIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 10,
      title: "Desafio do Labirinto",
      description: "Use código para escapar do labirinto",
      icon: <CompassIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 11,
      title: "Estruturas de Dados",
      description: "Organize seus dados de forma eficiente",
      icon: <TargetIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 12,
      title: "Python Quest",
      description: "Comece sua jornada em Python",
      icon: <StarIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 13,
      title: "Criação de Jogos",
      description: "Desenvolva seu primeiro jogo",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 14,
      title: "Projeto Final",
      description: "Aplique tudo que aprendeu",
      icon: <FlagIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 15,
      title: "Graduação",
      description: "Parabéns, você completou a trilha!",
      icon: <GraduationCapIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
  ];

  return (
    <div className="py-6 px-4">
      <div className="relative max-w-4xl mx-auto">
        <div className="relative">
          {/* Central vertical line with gradient */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-2 rounded-full bg-gradient-to-b from-purple-600 via-pink-500 to-purple-600"
            style={{ top: 0, bottom: 0 }}
          />
          
          {/* Glow for the line */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-4 rounded-full bg-gradient-to-b from-purple-600 via-pink-500 to-purple-600 blur-md"
            style={{ top: 0, bottom: 0 }}
          />
          
          {/* Path Steps Container */}
          <div className="relative py-10">
            {pathSteps.map((step, index) => (
              <PathStep
                key={step.step}
                {...step}
                isLeft={index % 2 === 0}
                delay={index}
                onClick={() => handleStepClick(step.step)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          size="lg"
          onClick={() => navigate('/game')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold"
        >
          Iniciar Aventura
        </Button>
      </div>
    </div>
  );
};
