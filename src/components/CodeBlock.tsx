
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeBlockProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  onChange,
  language,
  className
}) => {
  return (
    <div className={className}>
      <div className="bg-slate-800 text-slate-400 px-4 py-2 rounded-t-md text-sm">
        {language}
      </div>
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-sm bg-slate-900 text-slate-100 rounded-t-none min-h-[200px]"
        placeholder="Digite seu código aqui..."
      />
    </div>
  );
};
