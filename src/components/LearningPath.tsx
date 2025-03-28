
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Gamepad,
  LightbulbIcon, 
  Puzzle, 
  RocketIcon, 
  Star, 
  Brain,
  Target,
  MapPin,
  Flag,
  GraduationCap,
  Sparkles,
  Compass
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PathStepProps {
  step: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  isLeft: boolean;
  onClick: () => void;
  delay: number;
  isGame?: boolean;
  isExercise?: boolean;
}

const PathStep: React.FC<PathStepProps> = ({ 
  step, 
  title, 
  icon, 
  color, 
  isLeft,
  onClick,
  delay,
  isGame,
  isExercise
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={cn(
        "flex items-center gap-4 mb-4",
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
        <div className="flex items-center gap-2">
          {isGame && <Gamepad className="h-4 w-4 text-pink-500" />}
          {isExercise && <BookOpen className="h-4 w-4 text-purple-500" />}
          <h3 className="font-bold text-sm text-purple-900">{title}</h3>
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
      case 10:
        navigate('/pythonquest');
        break;
      default:
        toast.info(`Em breve: ${step}`);
    }
  };

  const pathSteps = [
    // Nível 1
    {
      step: 1,
      title: "📌 Nível 1 - Fundamentos da Lógica Computacional",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
    },
    {
      step: 2,
      title: "🔹 Capítulo 1 - O Mundo dos Algoritmos",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 3,
      title: "Aventura do Robô Explorador",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 4,
      title: "Organize os Passos",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 5,
      title: "🔹 Capítulo 2 - Condições e Decisões",
      icon: <Compass className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 6,
      title: "O Caminho Certo!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 7,
      title: "Verdadeiro ou Falso?",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    
    // Nível 2
    {
      step: 8,
      title: "📌 Nível 2 - Estruturas Básicas de Programação",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
    },
    {
      step: 9,
      title: "🔹 Capítulo 3 - Repetições e Loops",
      icon: <Code className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 10,
      title: "Dança do Robô!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 11,
      title: "Complete o Padrão",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 12,
      title: "🔹 Capítulo 4 - Variáveis e Armazenamento de Dados",
      icon: <Code className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 13,
      title: "Mochila do Aventureiro",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 14,
      title: "Qual é o Valor?",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    
    // Nível 3
    {
      step: 15,
      title: "📌 Nível 3 - Pensamento Computacional",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
    },
    {
      step: 16,
      title: "🔹 Capítulo 5 - Funções e Modularização",
      icon: <Puzzle className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 17,
      title: "Montando um Robô",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 18,
      title: "Quebra-cabeça de Funções",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 19,
      title: "🔹 Capítulo 6 - Depuração e Erros",
      icon: <Puzzle className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 20,
      title: "Caça aos Bugs!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 21,
      title: "Onde está o erro?",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    
    // Nível 4
    {
      step: 22,
      title: "📌 Nível 4 - Programação Aplicada",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
    },
    {
      step: 23,
      title: "🔹 Capítulo 7 - Criando Animações Simples",
      icon: <Sparkles className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 24,
      title: "O Show do Pixel!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 25,
      title: "Mova o Personagem!",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 26,
      title: "🔹 Capítulo 8 - Interatividade e Eventos",
      icon: <Sparkles className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 27,
      title: "O Jogo do Clic!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 28,
      title: "Responda ao Toque",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    
    // Nível 5
    {
      step: 29,
      title: "📌 Nível 5 - Criando Projetos Reais",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
    },
    {
      step: 30,
      title: "🔹 Capítulo 9 - Criando Seu Primeiro Jogo",
      icon: <Target className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 31,
      title: "Construtor de Mundos",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 32,
      title: "Monte Seu Código!",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 33,
      title: "🔹 Capítulo 10 - Meu Primeiro Código Python!",
      icon: <Target className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
    },
    {
      step: 34,
      title: "Escrevendo Código!",
      icon: <Gamepad className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-pink-500 to-pink-400",
      isGame: true,
    },
    {
      step: 35,
      title: "Debugando o Código Final",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-500 to-purple-400",
      isExercise: true,
    },
    {
      step: 36,
      title: "Formatura",
      icon: <GraduationCap className="h-6 w-6" />,
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
