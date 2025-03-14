
import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Pet {
  x: number;
  y: number;
  sprite: string;
}

export const JavaScriptPetGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [code, setCode] = useState<string>('// Exemplos de comandos:\n// alimentar();\n// brincar();\n// ensinarTruque();');
  const [pet, setPet] = useState<Pet>({ x: 200, y: 150, sprite: "🐶" });

  const desenharPet = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillText(pet.sprite, pet.x, pet.y);
  };

  useEffect(() => {
    desenharPet();
  }, [pet]);

  const alimentar = () => {
    setPet(prev => ({ ...prev, sprite: "🍖🐶" }));
    toast.success("Seu pet foi alimentado!");
  };

  const brincar = () => {
    setPet(prev => ({ ...prev, sprite: "⚽🐶", x: prev.x + 20 }));
    toast.success("Seu pet está brincando!");
  };

  const ensinarTruque = () => {
    setPet(prev => ({ ...prev, sprite: "🤹🐶" }));
    toast.success("Seu pet aprendeu um novo truque!");
  };

  const executarCodigo = () => {
    try {
      // Create a safe context for evaluation
      const context = {
        alimentar,
        brincar,
        ensinarTruque,
      };
      
      // Execute the code in the context
      new Function(...Object.keys(context), code)(...Object.values(context));
      toast.success("Comando executado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className="w-full bg-[#d4e157] border-2 border-black rounded-lg"
        />
      </Card>
      
      <Card className="p-4 flex flex-col gap-4">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Digite seu código aqui..."
        />
        <Button onClick={executarCodigo} className="w-full">
          <PlayIcon className="mr-2 h-4 w-4" />
          Executar Código
        </Button>
      </Card>
    </div>
  );
};
