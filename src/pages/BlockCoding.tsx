
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlockCodeEditor } from '@/components/BlockCodeEditor';
import { CodePlayground } from '@/components/CodePlayground';

const BlockCoding = () => {
  const [runningCode, setRunningCode] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState<string[]>([]);

  const handleRunCode = () => {
    setRunningCode(true);
    setTimeout(() => setRunningCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            Programação em Blocos
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Arraste e solte blocos para criar seu programa. Veja o resultado instantaneamente!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 bg-white border-2 border-purple-100 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-purple-700 flex items-center">
              <span className="bg-purple-100 text-purple-700 p-1 rounded mr-2 text-sm">1</span>
              Blocos de Código
            </h2>
            <BlockCodeEditor 
              onUpdateBlocks={setCodeBlocks} 
              blocks={codeBlocks} 
            />
          </Card>

          <Card className="p-4 bg-white border-2 border-blue-100 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
              <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2 text-sm">2</span>
              Playground
            </h2>
            <CodePlayground 
              codeBlocks={codeBlocks} 
              isRunning={runningCode} 
            />
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={handleRunCode} 
                className="bg-green-500 hover:bg-green-600 text-white px-8"
                disabled={codeBlocks.length === 0 || runningCode}
              >
                {runningCode ? "Executando..." : "Executar Programa"}
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-4 bg-white border-2 border-yellow-100 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-yellow-700">Missões</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.03 }} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800">Missão 1</h3>
                <p className="text-sm text-gray-600">Faça o personagem andar para a direita.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800">Missão 2</h3>
                <p className="text-sm text-gray-600">Colete 3 moedas usando um loop.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800">Missão 3</h3>
                <p className="text-sm text-gray-600">Desvie dos obstáculos usando condicionais.</p>
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlockCoding;
