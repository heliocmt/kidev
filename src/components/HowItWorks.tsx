
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CodeIcon, BookOpenIcon, TrophyIcon } from 'lucide-react';

interface StepCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-2 border-blue-100 bg-white h-full">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-purple-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-800">
        Como Funciona
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <StepCard
          title="Aprenda Brincando"
          description="Comece com desafios divertidos que ensinam conceitos básicos de programação."
          icon={<BookOpenIcon className="h-8 w-8" />}
          delay={0.1}
        />
        <StepCard
          title="Pratique Codificando"
          description="Use blocos visuais ou código para resolver quebra-cabeças e criar programas."
          icon={<CodeIcon className="h-8 w-8" />}
          delay={0.2}
        />
        <StepCard
          title="Ganhe Recompensas"
          description="Colete troféus, personalize seu avatar e desbloqueie novos desafios."
          icon={<TrophyIcon className="h-8 w-8" />}
          delay={0.3}
        />
      </div>
    </div>
  );
};
