
import { CodePetGame } from '@/components/CodePetGame';

const CodePets = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">CodePets: Learn Python with Your Virtual Pet!</h1>
        <CodePetGame />
      </div>
    </div>
  );
};

export default CodePets;
