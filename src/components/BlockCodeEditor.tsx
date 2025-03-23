
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, RotateCwIcon, ArrowUpIcon, BeakerIcon, RepeatIcon, SplitIcon } from 'lucide-react';

interface BlockCodeEditorProps {
  onUpdateBlocks: (blocks: string[]) => void;
  blocks: string[];
}

export const BlockCodeEditor: React.FC<BlockCodeEditorProps> = ({ onUpdateBlocks, blocks }) => {
  const availableBlocks = [
    { id: 'move-right', label: 'Mover Direita', color: 'bg-blue-500', icon: <ArrowRightIcon className="h-4 w-4" /> },
    { id: 'move-up', label: 'Mover Cima', color: 'bg-green-500', icon: <ArrowUpIcon className="h-4 w-4" /> },
    { id: 'rotate', label: 'Girar', color: 'bg-yellow-500', icon: <RotateCwIcon className="h-4 w-4" /> },
    { id: 'collect', label: 'Coletar', color: 'bg-purple-500', icon: <BeakerIcon className="h-4 w-4" /> },
    { id: 'repeat', label: 'Repetir 3x', color: 'bg-red-500', icon: <RepeatIcon className="h-4 w-4" /> },
    { id: 'if', label: 'Se caminho livre', color: 'bg-indigo-500', icon: <SplitIcon className="h-4 w-4" /> },
  ];

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
    const block = availableBlocks.find(b => b.id === blockId);
    return {
      color: block?.color || 'bg-gray-500',
      label: block?.label || 'Bloco',
      icon: block?.icon
    };
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-3 text-gray-700">Blocos Disponíveis</h3>
        <div className="flex flex-wrap gap-2">
          {availableBlocks.map((block) => (
            <motion.div
              key={block.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addBlock(block.id)}
              className={`${block.color} text-white px-3 py-2 rounded-md cursor-pointer flex items-center shadow-sm`}
            >
              {block.icon && <span className="mr-2">{block.icon}</span>}
              {block.label}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-gray-700">Seu Programa</h3>
          {blocks.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearBlocks}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              Limpar
            </Button>
          )}
        </div>
        
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-center">
            Arraste blocos para criar seu programa
          </div>
        ) : (
          <div className="space-y-2">
            {blocks.map((blockId, index) => {
              const { color, label, icon } = getBlockStyle(blockId);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`${color} text-white px-3 py-2 rounded-md flex items-center justify-between`}
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
    </div>
  );
};
