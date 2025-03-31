
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Crown, CreditCard, Star, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Payments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        // We would fetch prices from an edge function, but for now let's define it statically
        setPrices([
          {
            id: 'clube-kidev',
            name: 'Clube KiDev',
            description: 'Plano mensal de acesso a todos os conteúdos e jogos',
            features: [
              'Acesso a todos os jogos de programação',
              'Trilha de aprendizado completa',
              'Certificados de conclusão',
              'Suporte prioritário',
              'Projetos exclusivos para crianças',
            ],
            color: 'from-purple-500 to-pink-500',
            popular: true
          }
        ]);
      } catch (error) {
        console.error('Error fetching prices:', error);
        toast.error('Não foi possível carregar os planos. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const handleSelectPlan = async () => {
    try {
      setLoadingPlan(true);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          // Replace this with the actual price ID from your Stripe account
          priceId: 'price_1PfDV6I1q9Mtk3PrPYCLT8Rf',
          productId: 'prod_S2bPFyKAP7iitN'
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Erro ao processar pagamento. Por favor, tente novamente.');
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-pink-50">
      <Header />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Clube KiDev
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-6"
          >
            Desbloqueie todo o potencial criativo da criança com nosso clube exclusivo
          </motion.p>
          
          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-amber-800 max-w-xl mx-auto">
              <p className="flex items-center gap-2">
                <Trophy size={20} />
                <span>
                  Crie uma conta ou faça login para gerenciar suas assinaturas e acessar todos os benefícios!
                </span>
              </p>
            </div>
          )}
        </div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full overflow-hidden border-2 border-purple-300 shadow-xl">
              <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader className="pt-6">
                <Badge className="w-fit mx-auto bg-gradient-to-r from-purple-600 to-pink-500 mb-2 px-3">
                  Premium
                </Badge>
                <CardTitle className="text-2xl text-center">
                  <Crown size={20} className="inline mr-2 text-amber-500" />
                  Clube KiDev
                </CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">R$29,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Acesso a todos os jogos de programação</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Trilha de aprendizado completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Certificados de conclusão</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Projetos exclusivos para crianças</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={handleSelectPlan}
                  disabled={loadingPlan}
                >
                  {loadingPlan ? 'Processando...' : (
                    <>
                      <CreditCard className="mr-2" />
                      Assinar Agora
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-16 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-md">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/4 flex justify-center">
              <div className="rounded-full bg-purple-100 p-4">
                <Star size={48} className="text-purple-500" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-semibold mb-3">Garantia de satisfação 100%</h3>
              <p className="text-gray-700 mb-2">
                Se você não estiver completamente satisfeito com nossos planos, oferecemos reembolso total nos primeiros 7 dias. 
                Experimente sem compromisso!
              </p>
              <p className="text-gray-600 text-sm">
                * Sujeito aos termos e condições da plataforma.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
