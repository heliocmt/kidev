
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRightIcon, 
  RotateCcwIcon, 
  RotateCwIcon, 
  CircleIcon, 
  RepeatIcon, 
  SplitIcon, 
  Trash2Icon,
  PlayIcon
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BlockCodeEditorProps {
  onUpdateBlocks: (blocks: string[]) => void;
  blocks: string[];
  availableBlocks?: string[];
  onRunCode?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
  success?: boolean | null;
}

export const BlockCodeEditor: React.FC<BlockCodeEditorProps> = ({ 
  onUpdateBlocks, 
  blocks,
  availableBlocks = ['move-forward', 'turn-left', 'turn-right', 'collect', 'loop-start-3', 'loop-end', 'if-path'],
  onRunCode,
  onReset,
  isRunning,
  success
}) => {
  const allBlocks = [
    { 
      id: 'move-forward', 
      label: 'Andar', 
      color: 'bg-blue-500', 
      icon: <ArrowRightIcon className="h-4 w-4" /> 
    },
    { 
      id: 'turn-left', 
      label: 'Virar à Esquerda', 
      color: 'bg-green-500', 
      icon: <RotateCcwIcon className="h-4 w-4" /> 
    },
    { 
      id: 'turn-right', 
      label: 'Virar à Direita', 
      color: 'bg-green-500', 
      icon: <RotateCwIcon className="h-4 w-4" /> 
    },
    { 
      id: 'collect', 
      label: 'Coletar', 
      color: 'bg-purple-500', 
      icon: <CircleIcon className="h-4 w-4" /> 
    },
    { 
      id: 'loop-start-3', 
      label: 'Repetir 3x', 
      color: 'bg-red-500', 
      icon: <RepeatIcon className="h-4 w-4" /> 
    },
    { 
      id: 'loop-end', 
      label: 'Fim Repetição', 
      color: 'bg-red-500',
      isEndBlock: true,
    },
    { 
      id: 'if-path', 
      label: 'Se Caminho Livre', 
      color: 'bg-yellow-500', 
      icon: <SplitIcon className="h-4 w-4" /> 
    },
  ];

  const filteredBlocks = allBlocks.filter(block => 
    availableBlocks.includes(block.id)
  );

  const addBlock = (blockId: string) => {
    onUpdateBlocks([...blocks, blockId]);
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    onUpdateBlocks(newBlocks);
  };

  const clearBlocks = () => {
    onUpdateBlocks([]);
  };

  const getBlockStyle = (blockId: string) => {
    const block = allBlocks.find(b => b.id === blockId);
    return {
      color: block?.color || 'bg-gray-500',
      label: block?.label || 'Bloco',
      icon: block?.icon,
      isEndBlock: block?.isEndBlock,
    };
  };

  const getIndentation = (index: number): number => {
    let indentLevel = 0;
    
    for (let i = 0; i < index; i++) {
      if (blocks[i] === 'loop-start-3' || blocks[i] === 'if-path') {
        indentLevel++;
      } else if (blocks[i] === 'loop-end') {
        indentLevel = Math.max(0, indentLevel - 1);
      }
    }
    
    return indentLevel;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Comandos Disponíveis */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg overflow-hidden">
        <h3 className="font-bold mb-3 text-gray-700">Comandos Disponíveis</h3>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {filteredBlocks.map((block) => (
            <motion.div
              key={block.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addBlock(block.id)}
              className={`${block.color} text-white px-3 py-2 rounded-md cursor-pointer flex items-center shadow-sm flex-shrink-0`}
            >
              {block.icon && <span className="mr-2">{block.icon}</span>}
              {block.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sequência de Comandos - Área com altura fixa e overflow controlado */}
      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col overflow-hidden" style={{ maxHeight: '360px', minHeight: '360px' }}>
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-gray-700">Sequência de Comandos</h3>
          {blocks.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearBlocks}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <Trash2Icon className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
        
        {/* Área rolável para comandos com altura calculada */}
        <div className="overflow-y-auto flex-1 mb-1 pr-1" style={{ maxHeight: 'calc(100% - 80px)' }}>
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-center">
              Arraste comandos para programar seu robô
            </div>
          ) : (
            <div className="space-y-2">
              {blocks.map((blockId, index) => {
                const { color, label, icon, isEndBlock } = getBlockStyle(blockId);
                const indent = getIndentation(index);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`${color} text-white px-3 py-2 rounded-md flex items-center justify-between`}
                    style={{ marginLeft: `${indent * 20}px` }}
                  >
                    <div className="flex items-center">
                      {icon && <span className="mr-2">{icon}</span>}
                      <span>{label}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeBlock(index)}
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      ✕
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Botões de ação separados por um divisor */}
        {onRunCode && onReset && (
          <>
            <Separator className="my-1" />
            <div className="flex justify-center gap-4 py-2 mt-auto">
              <Button 
                onClick={onReset}
                variant="outline" 
                className="border-red-300 text-red-600 hover:bg-red-50"
                disabled={isRunning || blocks.length === 0}
              >
                <RotateCcwIcon className="mr-2 h-4 w-4" />
                Limpar Código
              </Button>
              <Button 
                onClick={onRunCode} 
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isRunning || blocks.length === 0}
              >
                <PlayIcon className="mr-2 h-4 w-4" />
                Executar Missão
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
