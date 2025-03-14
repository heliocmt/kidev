
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/CodeBlock';
import { PlayIcon } from 'lucide-react';

interface CodingChallengeProps {
  title: string;
  description: string;
  initialCode: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
}

export const CodingChallenge: React.FC<CodingChallengeProps> = ({
  title,
  description,
  initialCode,
  onCodeChange,
  onSubmit,
}) => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <CodeBlock
        code={initialCode}
        onChange={onCodeChange}
        language="python"
        className="mb-4"
      />
      <Button onClick={onSubmit} className="w-full">
        <PlayIcon className="mr-2 h-4 w-4" />
        Executar Código
      </Button>
    </Card>
  );
};
