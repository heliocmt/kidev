
import React, { useState } from 'react';
import { CodingChallenge } from './CodingChallenge';
import { PetScene } from './PetScene';
import { Card } from './ui/card';
import { toast } from 'sonner';

const INITIAL_CODE = `# Write Python code to make your pet move!
# Available commands:
# pet.walk()  - Makes the pet walk forward
# pet.jump()  - Makes the pet jump
# pet.rotate() - Makes the pet turn around

pet.walk()`;

export const CodePetGame: React.FC = () => {
  const [animation, setAnimation] = useState<string>();

  const handleCodeSubmit = () => {
    // Simple animation sequence for demonstration
    setAnimation('walk');
    setTimeout(() => setAnimation('jump'), 1000);
    setTimeout(() => setAnimation('rotate'), 2000);
    toast.success('Code executed successfully!');
  };

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <CodingChallenge
          title="Make Your Pet Move!"
          description="Write Python code to control your pet's movements. Try using different commands to see what happens!"
          initialCode={INITIAL_CODE}
          onCodeChange={() => {}}
          onSubmit={handleCodeSubmit}
        />
      </Card>
      
      <Card className="p-4">
        <PetScene petType="dog" animation={animation} />
      </Card>
    </div>
  );
};
