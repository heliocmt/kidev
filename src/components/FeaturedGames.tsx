
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: 'Fácil' | 'Médio' | 'Desafiador';
  category: string;
}

const GameCard: React.FC<GameCardProps & { onSelect: () => void }> = ({ 
  title, description, image, difficulty, category, onSelect 
}) => {
  const difficultyColors = {
    'Fácil': 'bg-green-100 text-green-700',
    'Médio': 'bg-yellow-100 text-yellow-700',
    'Desafiador': 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full cursor-pointer"
      onClick={onSelect}
    >
      <Card className="h-full overflow-hidden border-2 border-blue-100">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {image}
          </div>
          <div className="absolute top-2 right-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="font-bold text-lg mt-2 text-blue-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const FeaturedGames: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Função para verificar a assinatura e redirecionar o usuário
  const handleGameSelect = async (gameRoute: string) => {
    setIsLoading(true);
    
    // Se o usuário não estiver logado, redireciona para autenticação
    if (!user) {
      setIsLoading(false);
      navigate("/auth");
      return;
    }
    
    try {
      // Verificar status de assinatura através da edge function
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        body: {},
      });
      
      if (error) throw error;
      
      // Redireciona com base no status da assinatura
      if (data?.subscribed) {
        navigate(gameRoute);
      } else {
        // Se não tem assinatura, redireciona para pagamentos
        navigate("/payments");
      }
    } catch (error) {
      console.error("Erro ao verificar assinatura:", error);
      toast.error("Não foi possível verificar sua assinatura. Redirecionando para o jogo.");
      navigate(gameRoute);
    } finally {
      setIsLoading(false);
    }
  };

  const games: (GameCardProps & { route: string })[] = [
    {
      title: "Labirinto do Código",
      description: "Resolva o labirinto usando comandos de programação simples.",
      image: "🧩",
      difficulty: "Fácil",
      category: "Algoritmos",
      route: "/game"
    },
    {
      title: "Caça ao Tesouro das Variáveis",
      description: "Aprenda sobre variáveis enquanto procura tesouros escondidos.",
      image: "💎",
      difficulty: "Fácil",
      category: "Variáveis",
      route: "/blockcoding"
    },
    {
      title: "Loops Espaciais",
      description: "Use loops para guiar sua nave espacial através de obstáculos.",
      image: "🚀",
      difficulty: "Médio",
      category: "Loops",
      route: "/pythonquest"
    },
    {
      title: "Robô Construtor",
      description: "Crie funções para ajudar seu robô a construir estruturas.",
      image: "🤖",
      difficulty: "Médio",
      category: "Funções",
      route: "/jscodepets"
    },
    {
      title: "Floresta das Decisões",
      description: "Explore uma floresta mágica usando condicionais para tomar decisões.",
      image: "🌳",
      difficulty: "Desafiador",
      category: "Condicionais",
      route: "/codepets"
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-800">
        Jogos em Destaque
      </h2>
      
      <Carousel className="max-w-5xl mx-auto">
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full pl-4 py-2">
              <GameCard 
                title={game.title} 
                description={game.description} 
                image={game.image} 
                difficulty={game.difficulty} 
                category={game.category} 
                onSelect={() => handleGameSelect(game.route)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static md:absolute" />
          <CarouselNext className="relative static md:absolute" />
        </div>
      </Carousel>
    </div>
  );
};
