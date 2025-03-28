
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

// Define the types for our learning path items
interface LearningItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  type: 'level' | 'chapter' | 'game' | 'exercise';
  route?: string;
  description?: string;
}

interface DescriptionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: LearningItem | null;
}

const DescriptionDialog: React.FC<DescriptionDialogProps> = ({ isOpen, setIsOpen, item }) => {
  if (!item) return null;

  const isGame = item.type === 'game';
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border border-purple-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white",
              item.color
            )}>
              {item.icon}
            </div>
            <span>{item.title}</span>
          </DialogTitle>
          <DialogDescription className="pt-4">
            {item.description || "Descubra mais sobre este conteúdo em breve!"}
            
            {item.route && (
              <div className="mt-4">
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = item.route as string;
                  }}
                  className={cn(
                    "w-full",
                    isGame ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gradient-to-r from-purple-500 to-indigo-500"
                  )}
                >
                  {isGame ? "Jogar Agora!" : "Fazer Exercício"}
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const LearningPath: React.FC = () => {
  const navigate = useNavigate();
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]); // Initially expand the first level
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LearningItem | null>(null);

  const handleItemClick = (item: LearningItem) => {
    if (item.type === 'level') {
      setExpandedLevels(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id) 
          : [...prev, item.id]
      );
      return;
    }
    
    if (item.type === 'game' || item.type === 'exercise') {
      setSelectedItem(item);
      setDialogOpen(true);
      return;
    }
  };

  // Group items by level
  const learningPath: {
    id: number;
    title: string;
    icon: React.ReactNode;
    color: string;
    type: 'level';
    items: {
      id: number;
      title: string;
      icon: React.ReactNode;
      color: string;
      type: 'chapter';
      items: LearningItem[];
    }[];
  }[] = [
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
              route: '/game',
              description: "Guie nosso amigo robô através de labirintos divertidos! Arraste blocos de comando para criar uma sequência que o ajude a chegar ao objetivo. Uma aventura emocionante que ensina os primeiros passos da programação de forma visual e intuitiva."
            },
            {
              id: 10102,
              title: "Organize os Passos",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              route: '/codepets',
              description: "Coloque em ordem as ações diárias como escovar os dentes e tomar banho! Este exercício divertido ensina seu filho a pensar de forma organizada e lógica, construindo as bases do pensamento algorítmico que será fundamental na programação."
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
              type: 'game',
              description: "Portas coloridas, decisões importantes! Seu filho aprenderá a usar condições como 'Se a porta for azul, vá para a direita' em um jogo cheio de surpresas e desafios. Uma aventura que desenvolve o raciocínio lógico e a tomada de decisões."
            },
            {
              id: 10202,
              title: "Verdadeiro ou Falso?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Um exercício divertido onde seu filho marcará expressões como verdadeiras ou falsas, aprendendo lógica booleana de forma descontraída. As bases do pensamento computacional sendo construídas enquanto se diverte!"
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
              route: '/blockcoding',
              description: "Faça nosso robô dançar criando sequências de movimentos repetitivos! Uma maneira divertida de aprender sobre loops na programação - 'repita isso 5 vezes'. Seu filho vai adorar ver o resultado de seus comandos na tela!"
            },
            {
              id: 20102,
              title: "Complete o Padrão",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Desafie seu filho a identificar padrões e completá-los usando repetições. Este exercício desenvolve o pensamento lógico-matemático e introduz o conceito de loops de forma intuitiva e divertida."
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
              type: 'game',
              description: "Ajude nosso aventureiro a guardar e usar itens em sua mochila mágica! Esta atividade ensina como as variáveis funcionam na programação de forma lúdica - armazenando, modificando e utilizando dados para resolver desafios."
            },
            {
              id: 20202,
              title: "Qual é o Valor?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Um exercício interativo onde seu filho vai descobrir como valores mudam em tempo real! Aprenda sobre variáveis enquanto resolve quebra-cabeças divertidos que estimulam o raciocínio lógico."
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
              type: 'game',
              description: "Crie seu próprio robô personalizado usando funções pré-definidas como 'andar()' e 'pular()'! Uma experiência criativa que ensina como reutilizar blocos de código para criar algo maior e mais complexo."
            },
            {
              id: 30102,
              title: "Quebra-cabeça de Funções",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Monte blocos de código que chamam diferentes funções para resolver desafios criativos. Este exercício desenvolve o pensamento abstrato e ensina modularização de forma divertida."
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
              type: 'game',
              description: "Transforme seu filho em um detetive de código! Encontre e corrija os 'bugs' em códigos mal escritos. Um jogo que ensina habilidades essenciais de depuração e resolução de problemas de forma divertida."
            },
            {
              id: 30202,
              title: "Onde está o erro?",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Identifique erros comuns de programação como variáveis mal nomeadas ou loops infinitos. Este exercício desenvolve o pensamento crítico e a capacidade de análise, habilidades fundamentais para todo programador!"
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
              type: 'game',
              description: "Dê vida aos pixels com coordenadas e comandos simples! Seu filho vai criar suas primeiras animações digitais e descobrir o poder criativo da programação. Uma experiência visual e artística que vai encantar!"
            },
            {
              id: 40102,
              title: "Mova o Personagem!",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Crie códigos simples para movimentar personagens no plano cartesiano. Este exercício prático ensina conceitos de coordenadas e animação de forma intuitiva enquanto desenvolve habilidades de programação."
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
              type: 'game',
              description: "Programe reações divertidas para cliques e teclas! Este jogo ensina interatividade e programação orientada a eventos de forma lúdica e criativa, estimulando a experimentação."
            },
            {
              id: 40202,
              title: "Responda ao Toque",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Crie respostas para diferentes eventos como 'quando o mouse clicar, mude a cor'. Um exercício prático que ensina os fundamentos da interação entre usuário e programa."
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
              type: 'game',
              description: "Use nossa ferramenta simplificada para criar seu próprio mundo de jogo! Esta atividade divertida permite que seu filho aplique tudo o que aprendeu para desenvolver sua primeira criação digital interativa."
            },
            {
              id: 50102,
              title: "Monte Seu Código!",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Combine blocos de código para criar um jogo funcional! Este exercício desafiador integra todos os conceitos aprendidos até agora em um projeto final empolgante e recompensador."
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
              route: '/pythonquest',
              description: "Dê seus primeiros passos com código real em Python! Este jogo guiado permite que seu filho escreva pequenas linhas de código que ganham vida na tela, criando uma ponte entre a programação visual e a textual."
            },
            {
              id: 50202,
              title: "Debugando o Código Final",
              icon: <BookOpen className="h-6 w-6" />,
              color: "bg-gradient-to-tr from-purple-500 to-purple-400",
              type: 'exercise',
              description: "Chegou o momento de revisar e testar seu primeiro mini-projeto Python! Este exercício final consolida todo o aprendizado e prepara seu filho para explorar ainda mais o mundo da programação."
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

      {/* Dialog for displaying more information */}
      <DescriptionDialog 
        isOpen={dialogOpen} 
        setIsOpen={setDialogOpen} 
        item={selectedItem} 
      />
    </div>
  );
};
