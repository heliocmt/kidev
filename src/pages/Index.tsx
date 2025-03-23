
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MascotHero } from "@/components/MascotHero";
import { Testimonial } from "@/components/Testimonial";
import { FeaturedGames } from "@/components/FeaturedGames";
import { HowItWorks } from "@/components/HowItWorks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LearningPath } from "@/components/LearningPath";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <MascotHero />
        
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Aprenda a Programar Brincando!
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Embarque em uma aventura divertida e educativa onde você aprenderá a criar seus próprios jogos e aplicativos!
              </p>
            </motion.div>

            <HowItWorks />
            
            <div className="mb-20">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-purple-800">
                Trilha de Aprendizado
              </h2>
              
              {/* Learning Path */}
              <LearningPath />
            </div>
            
            <FeaturedGames />
            
            <div className="py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-800">
                Categorias de Aprendizado
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                <CategoryBadge title="Algoritmos" color="bg-blue-100 text-blue-700" />
                <CategoryBadge title="Variáveis" color="bg-green-100 text-green-700" />
                <CategoryBadge title="Loops" color="bg-yellow-100 text-yellow-700" />
                <CategoryBadge title="Funções" color="bg-purple-100 text-purple-700" />
                <CategoryBadge title="Condicionais" color="bg-pink-100 text-pink-700" />
                <CategoryBadge title="Jogos" color="bg-indigo-100 text-indigo-700" />
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-800">
                O Que Dizem Nossos Pequenos Programadores
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Testimonial 
                  quote="Aprendi a fazer meu próprio jogo! É muito legal ver meu personagem se movendo na tela!"
                  author="Lucas, 8 anos"
                  avatar="/placeholder.svg"
                />
                <Testimonial 
                  quote="Eu adoro cuidar do meu CodePet e ensinar ele a fazer truques com código!"
                  author="Maria, 10 anos"
                  avatar="/placeholder.svg"
                />
                <Testimonial 
                  quote="As missões são divertidas e os robôs me ajudam quando eu não entendo algo."
                  author="Pedro, 9 anos"
                  avatar="/placeholder.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
