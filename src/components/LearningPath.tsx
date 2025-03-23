
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
  TrophyIcon, 
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
  position: 'top' | 'bottom';
  onClick: () => void;
  delay: number;
}

const PathStep: React.FC<PathStepProps> = ({ 
  step, 
  title, 
  description, 
  icon, 
  color, 
  position, 
  onClick,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={cn(
        "absolute transform -translate-x-1/2",
        position === 'top' ? '-translate-y-full -top-5' : 'translate-y-0 bottom-5',
      )}
      style={{ left: `${(step - 1) * (100 / 14)}%` }}
    >
      <div className={cn(
        "flex flex-col items-center max-w-40",
        position === 'top' ? 'mb-3' : 'mt-3'
      )}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white mb-2",
            color
          )}
        >
          {icon}
        </motion.button>
        <h3 className="font-bold text-sm text-center">{title}</h3>
        <p className="text-xs text-center text-gray-600 mt-1">{description}</p>
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
      color: "bg-yellow-400",
      position: "top" as const
    },
    {
      step: 2,
      title: "Algoritmos Básicos",
      description: "Aprenda a pensar como um programador",
      icon: <PuzzleIcon className="h-6 w-6" />,
      color: "bg-blue-400",
      position: "bottom" as const
    },
    {
      step: 3,
      title: "Lógica Divertida",
      description: "Resolva desafios de lógica",
      icon: <BrainIcon className="h-6 w-6" />,
      color: "bg-purple-500",
      position: "top" as const
    },
    {
      step: 4,
      title: "CodePets",
      description: "Crie e cuide de pets virtuais",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-green-500",
      position: "bottom" as const
    },
    {
      step: 5,
      title: "Variáveis & Dados",
      description: "Aprenda a armazenar informações",
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: "bg-indigo-500",
      position: "top" as const
    },
    {
      step: 6,
      title: "Missão Loops",
      description: "Domine a arte da repetição",
      icon: <RocketIcon className="h-6 w-6" />,
      color: "bg-red-500",
      position: "bottom" as const
    },
    {
      step: 7,
      title: "Condicionais",
      description: "Tome decisões no seu código",
      icon: <MapPinIcon className="h-6 w-6" />,
      color: "bg-pink-500",
      position: "top" as const
    },
    {
      step: 8,
      title: "Blocos de Código",
      description: "Programe usando blocos visuais",
      icon: <CodeIcon className="h-6 w-6" />,
      color: "bg-orange-500",
      position: "bottom" as const
    },
    {
      step: 9,
      title: "Funções Mágicas",
      description: "Crie suas próprias funções",
      icon: <SparklesIcon className="h-6 w-6" />,
      color: "bg-cyan-500",
      position: "top" as const
    },
    {
      step: 10,
      title: "Desafio do Labirinto",
      description: "Use código para escapar do labirinto",
      icon: <CompassIcon className="h-6 w-6" />,
      color: "bg-emerald-500",
      position: "bottom" as const
    },
    {
      step: 11,
      title: "Estruturas de Dados",
      description: "Organize seus dados de forma eficiente",
      icon: <TargetIcon className="h-6 w-6" />,
      color: "bg-violet-500",
      position: "top" as const
    },
    {
      step: 12,
      title: "Python Quest",
      description: "Comece sua jornada em Python",
      icon: <StarIcon className="h-6 w-6" />,
      color: "bg-blue-600",
      position: "bottom" as const
    },
    {
      step: 13,
      title: "Criação de Jogos",
      description: "Desenvolva seu primeiro jogo",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-red-600",
      position: "top" as const
    },
    {
      step: 14,
      title: "Projeto Final",
      description: "Aplique tudo que aprendeu",
      icon: <FlagIcon className="h-6 w-6" />,
      color: "bg-green-600",
      position: "bottom" as const
    },
    {
      step: 15,
      title: "Graduação",
      description: "Parabéns, você completou a trilha!",
      icon: <GraduationCapIcon className="h-6 w-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      position: "top" as const
    },
  ];

  return (
    <div className="py-10 px-4">
      <div className="relative">
        {/* Path Line */}
        <div className="relative h-24">
          <div className="absolute left-0 right-0 top-1/2 h-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 rounded-full transform -translate-y-1/2"></div>
          
          {/* Start Point */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute left-0 top-1/2 w-6 h-6 rounded-full bg-yellow-400 transform -translate-y-1/2 -translate-x-1/2"
          />
          
          {/* End Point */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7, type: "spring" }}
            className="absolute right-0 top-1/2 w-6 h-6 rounded-full bg-purple-600 transform -translate-y-1/2 translate-x-1/2"
          />

          {/* Steps */}
          {pathSteps.map((step, index) => (
            <PathStep
              key={step.step}
              {...step}
              delay={index}
              onClick={() => handleStepClick(step.step)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-32">
        <Button 
          size="lg"
          onClick={() => navigate('/game')}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold"
        >
          Iniciar Aventura
        </Button>
      </div>
    </div>
  );
};
