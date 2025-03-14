
import React from 'react';
import { JavaScriptPetGame } from '@/components/JavaScriptPetGame';

const JsCodePets = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">CodePets - Aventura dos Algoritmos</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Ensine seu pet virtual a se comportar programando em JavaScript!
        </p>
        <JavaScriptPetGame />
      </div>
    </div>
  );
};

export default JsCodePets;
