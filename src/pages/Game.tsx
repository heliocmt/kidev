
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlayIcon, RefreshCw, CheckCircle } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { toast } from 'sonner';

const Game = () => {
  const [progress, setProgress] = useState(0);
  const [code, setCode] = useState('');

  const challenge = {
    title: 'Primeira Variável',
    description: 'Crie uma variável chamada "nome" com seu nome.',
    expectedOutput: 'nome = "seu_nome"',
    tip: 'Em Python, usamos o sinal de = para criar variáveis!'
  };

  const checkAnswer = () => {
    if (code.includes('nome =')) {
      toast.success('Parabéns! Você completou o desafio!');
      setProgress(100);
    } else {
      toast.error('Tente novamente! Dica: use "nome = " para criar a variável');
    }
  };

  const resetGame = () => {
    setCode('');
    setProgress(0);
    toast.info('Jogo reiniciado!');
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Desafio Python</h1>
          <Progress value={progress} className="w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
            <p className="text-muted-foreground mb-4">{challenge.description}</p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="text-sm font-mono">💡 {challenge.tip}</p>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <ScrollArea className="h-[300px]">
              <CodeBlock
                code={code}
                onChange={setCode}
                language="python"
                className="min-h-[200px]"
              />
            </ScrollArea>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={checkAnswer} className="w-32">
            <PlayIcon className="mr-2 h-4 w-4" />
            Executar
          </Button>
          <Button onClick={resetGame} variant="outline" className="w-32">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Game;
