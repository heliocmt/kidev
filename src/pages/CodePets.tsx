
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PetSelection } from '@/components/PetSelection';
import { CodingChallenge } from '@/components/CodingChallenge';
import { toast } from 'sonner';

const CodePets = () => {
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [code, setCode] = useState('# Digite seu código aqui\nnome = ""');

  const handlePetSelect = (pet: any) => {
    setSelectedPet(pet);
    toast.success(`Você escolheu ${pet.name}! Agora vamos começar a programar!`);
  };

  const handleCodeSubmit = () => {
    if (code.includes('nome =') && code.includes('"')) {
      toast.success('Muito bem! Você criou uma variável com o nome do seu pet!');
    } else {
      toast.error('Ops! Tente criar uma variável com o nome do seu pet usando nome = "nome_do_pet"');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CodePets
          </h1>
          <p className="text-lg text-muted-foreground">
            Aprenda Python criando seu próprio pet virtual!
          </p>
        </div>

        {!selectedPet ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Escolha seu Pet
            </h2>
            <PetSelection onSelectPet={handlePetSelect} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{selectedPet.emoji}</div>
              <h2 className="text-2xl font-bold">
                Primeiro Desafio com {selectedPet.name}
              </h2>
            </div>
            <CodingChallenge
              title="Dando um nome ao seu pet"
              description="Todo pet precisa de um nome! Crie uma variável chamada 'nome' e atribua o nome que você quer dar ao seu pet."
              initialCode={code}
              onCodeChange={setCode}
              onSubmit={handleCodeSubmit}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CodePets;
