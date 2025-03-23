
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: 'Fácil' | 'Médio' | 'Desafiador';
  category: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, image, difficulty, category }) => {
  const difficultyColors = {
    'Fácil': 'bg-green-100 text-green-700',
    'Médio': 'bg-yellow-100 text-yellow-700',
    'Desafiador': 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full"
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
  const games: GameCardProps[] = [
    {
      title: "Labirinto do Código",
      description: "Resolva o labirinto usando comandos de programação simples.",
      image: "🧩",
      difficulty: "Fácil",
      category: "Algoritmos"
    },
    {
      title: "Caça ao Tesouro das Variáveis",
      description: "Aprenda sobre variáveis enquanto procura tesouros escondidos.",
      image: "💎",
      difficulty: "Fácil",
      category: "Variáveis"
    },
    {
      title: "Loops Espaciais",
      description: "Use loops para guiar sua nave espacial através de obstáculos.",
      image: "🚀",
      difficulty: "Médio",
      category: "Loops"
    },
    {
      title: "Robô Construtor",
      description: "Crie funções para ajudar seu robô a construir estruturas.",
      image: "🤖",
      difficulty: "Médio",
      category: "Funções"
    },
    {
      title: "Floresta das Decisões",
      description: "Explore uma floresta mágica usando condicionais para tomar decisões.",
      image: "🌳",
      difficulty: "Desafiador",
      category: "Condicionais"
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
              <GameCard {...game} />
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
