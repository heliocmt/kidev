
import { motion } from "framer-motion";
import { LevelCard } from "@/components/LevelCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleStartLevel = (level: number) => {
    if (level === 1) {
      navigate('/game');
    } else {
      toast.info(`Em breve: Nível ${level}!`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Python para Crianças
          </h1>
          <p className="text-lg text-muted-foreground">
            Aprenda Python de forma divertida e interativa!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <LevelCard
              title="Introdução"
              description="Aprenda os conceitos básicos de Python e como funciona a programação."
              level={1}
              onStart={() => handleStartLevel(1)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LevelCard
              title="Variáveis"
              description="Descubra como guardar informações no seu programa."
              level={2}
              onStart={() => handleStartLevel(2)}
              isLocked
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <LevelCard
              title="Loops"
              description="Aprenda a fazer o computador repetir tarefas automaticamente."
              level={3}
              onStart={() => handleStartLevel(3)}
              isLocked
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
