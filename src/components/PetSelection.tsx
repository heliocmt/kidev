
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type Pet = {
  id: string;
  name: string;
  description: string;
  emoji: string;
};

const pets: Pet[] = [
  {
    id: 'cat',
    name: 'Gatinho',
    description: 'Um gatinho esperto e curioso',
    emoji: '🐱',
  },
  {
    id: 'dog',
    name: 'Cachorrinho',
    description: 'Um cachorrinho alegre e brincalhão',
    emoji: '🐶',
  },
  {
    id: 'dragon',
    name: 'Dragãozinho',
    description: 'Um dragão bebê mágico e amigável',
    emoji: '🐲',
  },
];

interface PetSelectionProps {
  onSelectPet: (pet: Pet) => void;
}

export const PetSelection: React.FC<PetSelectionProps> = ({ onSelectPet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pets.map((pet, index) => (
        <motion.div
          key={pet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/50 backdrop-blur-sm">
            <div className="text-6xl mb-4 text-center">{pet.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-center">{pet.name}</h3>
            <p className="text-muted-foreground text-center mb-4">{pet.description}</p>
            <Button 
              className="w-full"
              onClick={() => onSelectPet(pet)}
            >
              Escolher {pet.name}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
