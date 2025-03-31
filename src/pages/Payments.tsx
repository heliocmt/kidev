
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Crown, Star, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "sonner";

const plans = [
  {
    id: 'basic',
    name: 'Plano Básico',
    priceId: 'price_1PjGbCJX1Z3Y2RVw1Z2VtFK4',  // Replace with your actual Price ID
    price: 'R$19,90',
    interval: 'mês',
    features: [
      'Acesso a todos os jogos de programação',
      'Trilha de aprendizado básica',
      'Suporte por e-mail',
    ],
    badge: '',
    color: 'from-blue-500 to-cyan-400',
    popular: false
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    priceId: 'price_1PjGbCJX1Z3Y2RVw1Z2VtFP7',  // Replace with your actual Price ID
    price: 'R$29,90',
    interval: 'mês',
    features: [
      'Tudo do plano básico',
      'Trilhas avançadas',
      'Projetos exclusivos',
      'Certificados de conclusão',
      'Suporte prioritário',
    ],
    badge: 'Popular',
    color: 'from-purple-500 to-pink-500',
    popular: true
  },
  {
    id: 'family',
    name: 'Plano Família',
    priceId: 'price_1PjGbCJX1Z3Y2RVw1Z2VtGK9',  // Replace with your actual Price ID
    price: 'R$49,90',
    interval: 'mês',
    features: [
      'Tudo do plano premium',
      'Até 4 perfis de usuários',
      'Acompanhamento de progresso',
      'Conteúdo adicional para pais',
      'Suporte VIP',
    ],
    badge: '',
    color: 'from-amber-500 to-orange-500',
    popular: false
  }
];

export default function Payments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const toast = useToast;

  const handleSelectPlan = async (plan) => {
    try {
      setLoadingPlan(plan.id);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: plan.priceId,
          planName: plan.name,
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
      setLoadingPlan(null);
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
            Escolha o Plano Ideal
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-6"
          >
            Desbloqueie todo o potencial criativo da criança com nossos planos acessíveis
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`h-full overflow-hidden border-2 ${plan.popular ? 'border-purple-300' : 'border-transparent'} ${plan.popular ? 'shadow-xl' : 'shadow-md'}`}>
                <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`}></div>
                <CardHeader className="pt-6">
                  {plan.badge && (
                    <Badge className="w-fit mx-auto bg-gradient-to-r from-purple-600 to-pink-500 mb-2 px-3">
                      {plan.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl text-center">
                    {plan.id === 'premium' && <Crown size={20} className="inline mr-2 text-amber-500" />}
                    {plan.name}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}`}
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? 'Processando...' : 'Assinar Agora'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
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
};
