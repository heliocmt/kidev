
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Gamepad,
  Brain, 
  Puzzle, 
  Flag, 
  Star, 
  Compass,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Define the types for our learning path items
interface LearningItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  type: 'level' | 'chapter' | 'game' | 'exercise';
  route?: string;
}

export const LearningPath: React.FC = () => {
  const navigate = useNavigate();
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]); // Initially expand the first level

  const handleItemClick = (item: LearningItem) => {
    if (item.type === 'level') {
      setExpandedLevels(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id) 
          : [...prev, item.id]
      );
      return;
    }

    if (item.route) {
      navigate(item.route);
    } else {
      toast.info(`Em breve: ${item.title}`);
    }
  };

  // Group items by level
  const learningPath = [
    // Level 1
    {
      id: 1,
      title: "📌 Nível 1 - Fundamentos da Lógica Computacional",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
      type: 'level',
      items: [
        {
          id: 101,
          title: "🔹 Capítulo 1 - O Mundo dos Algoritmos",
          icon: <Brain className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 10101,
              title: "Aventura do Robô Explorador",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game',
              route: '/game'
            },
            {
              id: 10102,
              title: "Organize os Passos",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              route: '/codepets'
            }
          ]
        },
        {
          id: 102,
          title: "🔹 Capítulo 2 - Condições e Decisões",
          icon: <Compass className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 10201,
              title: "O Caminho Certo!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 10202,
              title: "Verdadeiro ou Falso?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        }
      ]
    },
    
    // Level 2
    {
      id: 2,
      title: "📌 Nível 2 - Estruturas Básicas de Programação",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
      type: 'level',
      items: [
        {
          id: 201,
          title: "🔹 Capítulo 3 - Repetições e Loops",
          icon: <Code className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 20101,
              title: "Dança do Robô!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game',
              route: '/blockcoding'
            },
            {
              id: 20102,
              title: "Complete o Padrão",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        },
        {
          id: 202,
          title: "🔹 Capítulo 4 - Variáveis e Armazenamento de Dados",
          icon: <Code className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500", 
          type: 'chapter',
          items: [
            {
              id: 20201,
              title: "Mochila do Aventureiro",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 20202,
              title: "Qual é o Valor?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        }
      ]
    },
    
    // Level 3
    {
      id: 3,
      title: "📌 Nível 3 - Pensamento Computacional",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
      type: 'level',
      items: [
        {
          id: 301,
          title: "🔹 Capítulo 5 - Funções e Modularização",
          icon: <Puzzle className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 30101,
              title: "Montando um Robô",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 30102,
              title: "Quebra-cabeça de Funções",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        },
        {
          id: 302,
          title: "🔹 Capítulo 6 - Depuração e Erros",
          icon: <Puzzle className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 30201,
              title: "Caça aos Bugs!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 30202,
              title: "Onde está o erro?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        }
      ]
    },
    
    // Level 4
    {
      id: 4,
      title: "📌 Nível 4 - Programação Aplicada",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
      type: 'level',
      items: [
        {
          id: 401,
          title: "🔹 Capítulo 7 - Criando Animações Simples",
          icon: <Sparkles className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 40101,
              title: "O Show do Pixel!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 40102,
              title: "Mova o Personagem!",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        },
        {
          id: 402,
          title: "🔹 Capítulo 8 - Interatividade e Eventos",
          icon: <Sparkles className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 40201,
              title: "O Jogo do Clic!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 40202,
              title: "Responda ao Toque",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        }
      ]
    },
    
    // Level 5
    {
      id: 5,
      title: "📌 Nível 5 - Criando Projetos Reais",
      icon: <Flag className="h-6 w-6" />,
      color: "bg-gradient-to-tr from-purple-700 to-purple-500",
      type: 'level',
      items: [
        {
          id: 501,
          title: "🔹 Capítulo 9 - Criando Seu Primeiro Jogo",
          icon: <Target className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 50101,
              title: "Construtor de Mundos",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game'
            },
            {
              id: 50102,
              title: "Monte Seu Código!",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        },
        {
          id: 502,
          title: "🔹 Capítulo 10 - Meu Primeiro Código Python!",
          icon: <Target className="h-6 w-6" />,
          color: "bg-gradient-to-tr from-purple-600 to-pink-500",
          type: 'chapter',
          items: [
            {
              id: 50201,
              title: "Escrevendo Código!",
              icon: <Gamepad className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-pink-500 to-pink-400",
              type: 'game',
              route: '/pythonquest'
            },
            {
              id: 50202,
              title: "Debugando o Código Final",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise'
            }
          ]
        }
      ]
    }
  ];

  // Render a learning item with proper indentation based on its type
  const renderLearningItem = (item: LearningItem, level: number = 0) => {
    const isLevel = item.type === 'level';
    const isLevelExpanded = expandedLevels.includes(item.id);
    
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-2"
      >
        <motion.div
          whileHover={{ scale: isLevel ? 1.02 : 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleItemClick(item)}
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all",
            isLevel ? "bg-white/80 shadow-sm border border-purple-100" : 
                    item.type === 'chapter' ? "bg-white/60 ml-6" : 
                    "ml-12 bg-white/40",
            item.type === 'game' ? "border-l-4 border-pink-300" :
            item.type === 'exercise' ? "border-l-4 border-purple-300" : ""
          )}
        >
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            item.color
          )}>
            {item.icon}
          </div>
          <span className={cn(
            "font-medium",
            isLevel ? "font-bold" : "",
            item.type === 'game' || item.type === 'exercise' ? "text-sm" : ""
          )}>
            {item.title}
          </span>
          
          {isLevel && (
            <div className="ml-auto pr-2">
              {isLevelExpanded ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  ▲
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▲
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="py-6 px-4">
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-purple-100 p-6">
          {/* Learning path items */}
          <div className="space-y-2">
            {learningPath.map((level) => (
              <React.Fragment key={level.id}>
                {renderLearningItem(level)}
                
                {/* Render chapters if level is expanded */}
                {expandedLevels.includes(level.id) && (
                  <div className="space-y-2">
                    {level.items.map(chapter => (
                      <React.Fragment key={chapter.id}>
                        {renderLearningItem(chapter, 1)}
                        
                        {/* Games and exercises for this chapter */}
                        <div className="space-y-1">
                          {chapter.items.map(item => 
                            renderLearningItem(item, 2)
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </React.Fragment>
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
