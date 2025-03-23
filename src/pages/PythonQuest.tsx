
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodingChallenge } from '@/components/CodingChallenge';
import { CodeOutput } from '@/components/CodeOutput';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayIcon, BookIcon, LightbulbIcon } from 'lucide-react';
import { toast } from 'sonner';

const PythonQuest = () => {
  const [code, setCode] = useState(`# Olá! Vamos começar com Python
# Este é um comentário

# Vamos criar uma variável
nome = "Aventureiro"

# E imprimir uma mensagem
print("Olá, " + nome + "!")

# Vamos fazer um loop
for i in range(3):
    print("Loop número " + str(i+1))
`);
  
  const [output, setOutput] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  
  const handleRunCode = () => {
    // Simulate Python execution
    const lines = [];
    
    try {
      // Very simple "interpreter" that looks for print statements
      const printRegex = /print\s*\(\s*["'](.+?)["']\s*\)/g;
      const printWithVarRegex = /print\s*\(\s*["'](.+?)["']\s*\+\s*(.+?)\s*\+?\s*.*?\)/g;
      
      // Handle print with variables (very simplified)
      let match;
      const matches = [];
      
      // First pass - extract simple print statements
      while ((match = printRegex.exec(code)) !== null) {
        if (!code.substring(match.index - 20, match.index).includes('+')) {
          matches.push(match[1]);
        }
      }
      
      // Second pass - look for prints with variables (VERY simplified)
      if (code.includes('nome = "Aventureiro"') && code.includes('print("Olá, " + nome + "!")')) {
        matches.push("Olá, Aventureiro!");
      }
      
      // Handle for loops (extremely simplified)
      if (code.includes('for i in range(3):') && code.includes('print("Loop número " + str(i+1))')) {
        matches.push("Loop número 1");
        matches.push("Loop número 2");
        matches.push("Loop número 3");
      }
      
      if (matches.length > 0) {
        lines.push(...matches);
      } else {
        // Default message if no prints found
        lines.push("Programa executado, mas nenhuma saída foi produzida.");
      }
      
      toast.success("Código executado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        lines.push(`Erro: ${error.message}`);
        toast.error(`Erro na execução: ${error.message}`);
      }
    }
    
    setOutput(lines);
  };
  
  const challenges = [
    {
      level: 1,
      title: "Olá, Python!",
      description: "Seu primeiro programa em Python. Vamos imprimir mensagens e usar variáveis.",
      code: `# Meu primeiro programa Python!
# Use a função print() para mostrar mensagens

# Sua tarefa: 
# 1. Crie uma variável chamada nome com seu nome
# 2. Use print() para dizer "Olá, [seu nome]!"

# Escreva seu código abaixo:

`,
      hints: [
        "Use a sintaxe: nome = \"Seu Nome\"",
        "Para imprimir, use: print(\"Olá, \" + nome + \"!\")",
      ]
    },
    {
      level: 2,
      title: "Loops Mágicos",
      description: "Aprenda a repetir ações com loops. Vamos criar um contador!",
      code: `# Vamos usar loops para repetir ações!

# Sua tarefa:
# 1. Crie um loop que conte de 1 até 5
# 2. Imprima cada número

# Dica: use a estrutura for com a função range()

# Escreva seu código abaixo:

`,
      hints: [
        "Use for i in range(5):",
        "Dentro do loop, use print(i+1)",
        "Lembre-se de adicionar indentação após os dois pontos"
      ]
    },
  ];
  
  const currentChallenge = challenges.find(c => c.level === currentLevel) || challenges[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
            Python Quest
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Embarque em uma jornada de aprendizado com Python. Resolva desafios e torne-se um mestre em programação!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <Card className="bg-white border-2 border-indigo-100 shadow-md mb-6">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-3 text-indigo-700">Nível {currentLevel}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenges.map((challenge) => (
                    <Badge 
                      key={challenge.level} 
                      variant={challenge.level === currentLevel ? "default" : "outline"}
                      className={challenge.level === currentLevel ? "bg-indigo-500" : "cursor-pointer hover:bg-indigo-100"}
                      onClick={() => setCurrentLevel(challenge.level)}
                    >
                      {challenge.level}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-indigo-700">{currentChallenge.title}</h3>
                    <p className="text-sm text-gray-600">{currentChallenge.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-700 flex items-center">
                      <LightbulbIcon className="h-4 w-4 mr-1" />
                      Dicas
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                      {currentChallenge.hints.map((hint, index) => (
                        <p key={index} className="ml-2">• {hint}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-indigo-100 shadow-md">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-3 text-indigo-700 flex items-center">
                  <BookIcon className="h-4 w-4 mr-1" />
                  Referência Rápida
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <code className="text-pink-600">print("texto")</code>
                    <p className="text-gray-600">Mostra texto na tela</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <code className="text-pink-600">variavel = valor</code>
                    <p className="text-gray-600">Cria uma variável</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <code className="text-pink-600">for i in range(n):</code>
                    <p className="text-gray-600">Repete n vezes</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <code className="text-pink-600">if condição:</code>
                    <p className="text-gray-600">Executa código se a condição for verdadeira</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-3/4">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="code" className="data-[state=active]:bg-indigo-500">Código</TabsTrigger>
                <TabsTrigger value="challenge" className="data-[state=active]:bg-indigo-500">Desafio</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="bg-white border-2 border-indigo-100 shadow-md">
                    <CardContent className="p-4">
                      <CodingChallenge
                        title="Seu Código Python"
                        description="Escreva e edite seu código Python aqui."
                        initialCode={code}
                        onCodeChange={handleCodeChange}
                        onSubmit={handleRunCode}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-2 border-indigo-100 shadow-md">
                    <CardContent className="p-4">
                      <h2 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                        <PlayIcon className="h-5 w-5 mr-2" />
                        Saída do Programa
                      </h2>
                      <CodeOutput output={output} />
                      <Button 
                        onClick={handleRunCode} 
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Executar Código
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="challenge">
                <Card className="bg-white border-2 border-indigo-100 shadow-md">
                  <CardContent className="p-4">
                    <CodingChallenge
                      title={currentChallenge.title}
                      description={currentChallenge.description}
                      initialCode={currentChallenge.code}
                      onCodeChange={handleCodeChange}
                      onSubmit={handleRunCode}
                    />
                    <div className="mt-4">
                      <Button 
                        onClick={handleRunCode} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Executar Desafio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonQuest;
