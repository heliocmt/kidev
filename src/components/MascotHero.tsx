
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export const MascotHero = () => {
  const navigate = useNavigate();
  return <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.div initial={{
        opacity: 0,
        x: -50
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5
      }} className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Programe o Futuro!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Aprender a programar nunca foi tão divertido! Junte-se a milhares de crianças descobrindo o mundo da programação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" variant="outline" onClick={() => navigate('/game')} className="border-white hover:bg-white/20 text-lg px-8 py-6 text-purple-600">
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/blockcoding')} className="border-white hover:bg-white/20 text-lg px-8 py-6 text-purple-600">
              Explorar Jogos
            </Button>
          </div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white/30 rounded-full animate-pulse" style={{
            animationDelay: "300ms"
          }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl">
              🤖
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};
