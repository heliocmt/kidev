
import React from 'react';

interface CodeOutputProps {
  output: string[];
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ output }) => {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-auto min-h-[200px] max-h-[300px]">
      {output.length === 0 ? (
        <div className="text-gray-500 italic">
          A saída do seu programa aparecerá aqui quando você executar o código.
        </div>
      ) : (
        <div className="space-y-1">
          {output.map((line, index) => (
            <div key={index} className="font-mono">
              <span className="text-gray-500 mr-2">&gt;</span> {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
