
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
  position: 'top' | 'bottom';
  xPosition: number;
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
  xPosition,
  onClick,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={cn(
        "absolute",
        position === 'top' ? '-translate-y-full -top-4' : 'translate-y-0 bottom-4',
      )}
      style={{ left: `${xPosition}%` }}
    >
      <div className={cn(
        "flex max-w-52",
        position === 'top' ? 'mb-2 flex-col items-center text-center' : 'mt-2 flex-col-reverse items-center text-center'
      )}>
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md shadow-purple-200",
            position === 'top' ? 'mb-2' : 'mt-2',
            color
          )}
        >
          {icon}
        </motion.button>
        <div>
          <h3 className="font-bold text-sm text-purple-900">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
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

  const generateWavePoints = (steps: number) => {
    const points = [];
    const amplitude = 40; // How high/low the wave goes
    
    for (let i = 0; i < steps; i++) {
      // Calculate x position as percentage (evenly spaced)
      const x = (i / (steps - 1)) * 100;
      
      // Calculate y position with sine wave (50 is the center, amplitude is the height)
      // We add i to make each wave peak gradually higher
      const y = 50 + amplitude * Math.sin((i / (steps - 1)) * Math.PI * 2);
      
      points.push({ x, y });
    }
    
    return points;
  };
  
  const wavePoints = generateWavePoints(15);

  const pathSteps = [
    {
      step: 1,
      title: "Primeiros Passos",
      description: "Comece sua jornada na programação",
      icon: <LightbulbIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[0].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[0].x
    },
    {
      step: 2,
      title: "Algoritmos Básicos",
      description: "Aprenda a pensar como um programador",
      icon: <PuzzleIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[1].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[1].x
    },
    {
      step: 3,
      title: "Lógica Divertida",
      description: "Resolva desafios de lógica",
      icon: <BrainIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[2].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[2].x
    },
    {
      step: 4,
      title: "CodePets",
      description: "Crie e cuide de pets virtuais",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[3].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[3].x
    },
    {
      step: 5,
      title: "Variáveis & Dados",
      description: "Aprenda a armazenar informações",
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[4].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[4].x
    },
    {
      step: 6,
      title: "Missão Loops",
      description: "Domine a arte da repetição",
      icon: <RocketIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[5].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[5].x
    },
    {
      step: 7,
      title: "Condicionais",
      description: "Tome decisões no seu código",
      icon: <MapPinIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[6].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[6].x
    },
    {
      step: 8,
      title: "Blocos de Código",
      description: "Programe usando blocos visuais",
      icon: <CodeIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[7].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[7].x
    },
    {
      step: 9,
      title: "Funções Mágicas",
      description: "Crie suas próprias funções",
      icon: <SparklesIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[8].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[8].x
    },
    {
      step: 10,
      title: "Desafio do Labirinto",
      description: "Use código para escapar do labirinto",
      icon: <CompassIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[9].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[9].x
    },
    {
      step: 11,
      title: "Estruturas de Dados",
      description: "Organize seus dados de forma eficiente",
      icon: <TargetIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[10].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[10].x
    },
    {
      step: 12,
      title: "Python Quest",
      description: "Comece sua jornada em Python",
      icon: <StarIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[11].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[11].x
    },
    {
      step: 13,
      title: "Criação de Jogos",
      description: "Desenvolva seu primeiro jogo",
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[12].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[12].x
    },
    {
      step: 14,
      title: "Projeto Final",
      description: "Aplique tudo que aprendeu",
      icon: <FlagIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[13].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[13].x
    },
    {
      step: 15,
      title: "Graduação",
      description: "Parabéns, você completou a trilha!",
      icon: <GraduationCapIcon className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      position: wavePoints[14].y < 50 ? "top" as const : "bottom" as const,
      xPosition: wavePoints[14].x
    },
  ];

  return (
    <div className="py-6 px-4">
      <div className="relative">
        {/* Path Line Container */}
        <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            {/* Glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite operator="over" in="SourceGraphic" />
              </filter>
              
              {/* Gradient for path */}
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9b6eff" />
                <stop offset="50%" stopColor="#ff66d9" />
                <stop offset="100%" stopColor="#9b6eff" />
              </linearGradient>
            </defs>
            
            {/* Path Background Glow Effect */}
            <path
              d={`M ${wavePoints.map(point => `${point.x} ${point.y}`).join(' L ')}`}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              opacity="0.7"
            />
            
            {/* Main Path */}
            <path
              d={`M ${wavePoints.map(point => `${point.x} ${point.y}`).join(' L ')}`}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Points on the Path */}
          {wavePoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
              className="absolute w-4 h-4 rounded-full bg-white border-2 border-pink-500 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ 
                left: `${point.x}%`, 
                top: `${point.y}%` 
              }}
            />
          ))}
          
          {/* Start Point */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transform -translate-x-1/2 -translate-y-1/2 shadow-md z-20"
            style={{ left: `${wavePoints[0].x}%`, top: `${wavePoints[0].y}%` }}
          />
          
          {/* End Point */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7, type: "spring" }}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transform -translate-x-1/2 -translate-y-1/2 shadow-md z-20"
            style={{ left: `${wavePoints[14].x}%`, top: `${wavePoints[14].y}%` }}
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
