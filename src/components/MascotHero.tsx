
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const MascotHero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Função para verificar a assinatura e redirecionar o usuário
  const handleNavigation = async (destination: string) => {
    setIsLoading(true);

    // Se o usuário não estiver logado, redireciona para autenticação
    if (!user) {
      setIsLoading(false);
      navigate("/auth");
      return;
    }
    try {
      // Verificar status de assinatura através da edge function
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        body: {}
      });
      if (error) throw error;

      // Redireciona com base no status da assinatura
      if (data?.subscribed) {
        navigate("/dashboard");
      } else {
        // Se não tem assinatura, redireciona para pagamentos
        navigate("/payments");
      }
    } catch (error) {
      console.error("Erro ao verificar assinatura:", error);
      toast.error("Não foi possível verificar sua assinatura. Redirecionando para o dashboard.");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
          className="md:w-1/2 flex justify-center order-2 md:order-1"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <div
              className="absolute inset-4 bg-white/30 rounded-full animate-pulse"
              style={{
                animationDelay: "300ms"
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/lovable-uploads/ff4494f6-4e60-40c7-afc6-416b0efeef5f.png"
                alt="Pink programmer bird mascot with glasses"
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: -50
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.5
          }}
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 order-1 md:order-2"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Programe o Futuro!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Aprender a programar nunca foi tão divertido! Junte-se a milhares de crianças descobrindo o mundo da programação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {user ? (
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigation("/dashboard")}
                disabled={isLoading}
                className="border-white hover:bg-white/20 text-lg px-8 py-6 text-violet-600"
              >
                {isLoading ? "Carregando..." : "Meu Dashboard"}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigation("/game")}
                className="border-white hover:bg-white/20 text-lg px-8 py-6 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Começar Agora"}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/robo")}
              className="border-white hover:bg-white/20 text-lg px-8 py-6 text-violet-600"
            >
              Aventura do Robô
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavigation("/blockcoding")}
              disabled={isLoading}
              className="border-white hover:bg-white/20 text-lg px-8 py-6 text-violet-600"
            >
              {isLoading ? "Carregando..." : "Explorar Jogos"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
