
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LearningPath } from "@/components/LearningPath";
import {
  BookOpen,
  Award,
  Settings,
  UserCircle,
  Code,
  ChevronRight,
  Gamepad,
  History,
  Star,
  Brain,
  Rocket
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleGameStart = (gameRoute: string) => {
    navigate(gameRoute);
    toast.success("Jogo carregado! Divirta-se!");
  };

  // Get first letter of username/email for avatar
  const getInitial = () => {
    if (!user || !user.email) return "K";
    return user.email.charAt(0).toUpperCase();
  };

  // Last activities - would come from a database in a real app
  const lastActivities = [
    { id: 1, name: "Aventura do Robô Explorador", progress: 60, route: "/game" },
    { id: 2, name: "Dance do Robô!", progress: 30, route: "/blockcoding" },
    { id: 3, name: "Python Quest", progress: 10, route: "/pythonquest" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold">
                {getInitial()}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Olá, {user?.email?.split('@')[0] || "Explorador"}!
                </h1>
                <p className="text-white/80">
                  Continue sua aventura de programação!
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/game")}
                className="border-white text-white hover:bg-white/20"
              >
                Continuar Aprendendo
              </Button>
              <Button 
                variant="default"
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => {}}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Meu Perfil
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Learning Path and Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Section */}
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-purple-800 flex items-center">
                    <History className="mr-2 h-5 w-5" />
                    Continue de onde parou
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/game")}>
                    Ver tudo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {lastActivities.map((activity) => (
                    <motion.div 
                      key={activity.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm cursor-pointer"
                      onClick={() => handleGameStart(activity.route)}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{activity.name}</h3>
                        <span className="text-sm text-purple-600">{activity.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                          style={{ width: `${activity.progress}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Learning Path */}
            <div>
              <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <Rocket className="mr-2 h-5 w-5" />
                Sua Trilha de Aprendizado
              </h2>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-purple-100 overflow-hidden">
                <div className="p-2">
                  <LearningPath />
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar with Quick Access and Achievements */}
          <div className="space-y-6">
            {/* Quick Access */}
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Gamepad className="mr-2 h-5 w-5" />
                  Acesso Rápido
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col items-center justify-center py-4 border-purple-100"
                    onClick={() => navigate("/game")}
                  >
                    <BookOpen className="h-8 w-8 mb-2 text-purple-600" />
                    <span>Aprender</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col items-center justify-center py-4 border-purple-100"
                    onClick={() => navigate("/codepets")}
                  >
                    <Code className="h-8 w-8 mb-2 text-pink-600" />
                    <span>CodePets</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col items-center justify-center py-4 border-purple-100"
                    onClick={() => navigate("/blockcoding")}
                  >
                    <Brain className="h-8 w-8 mb-2 text-blue-600" />
                    <span>Blocos</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col items-center justify-center py-4 border-purple-100"
                    onClick={() => navigate("/pythonquest")}
                  >
                    <Rocket className="h-8 w-8 mb-2 text-green-600" />
                    <span>Python</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Achievements */}
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Conquistas Recentes
                </h2>
                
                <div className="space-y-3">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white">
                      <Star className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">Primeira Missão!</h3>
                      <p className="text-xs text-gray-500">Completou seu primeiro exercício</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white">
                      <Code className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">Programador Iniciante</h3>
                      <p className="text-xs text-gray-500">Escreveu seu primeiro código</p>
                    </div>
                  </motion.div>
                  
                  <div className="text-center pt-2">
                    <Button variant="ghost" size="sm" className="text-purple-600">
                      Ver todas as conquistas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Settings Quick Access */}
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Configurações
                </h2>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <UserCircle className="mr-2 h-5 w-5" />
                    Perfil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-5 w-5" />
                    Preferências
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
