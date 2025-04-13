
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Game from "./pages/Game";
import CodePets from "./pages/CodePets";
import JsCodePets from "./pages/JsCodePets";
import BlockCoding from "./pages/BlockCoding";
import PythonQuest from "./pages/PythonQuest";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSuccess";
import Robo from "./pages/Robo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game" element={<Game />} />
            <Route path="/codepets" element={<CodePets />} />
            <Route path="/jscodepets" element={<JsCodePets />} />
            <Route path="/blockcoding" element={<BlockCoding />} />
            <Route path="/pythonquest" element={<PythonQuest />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/robo" element={<Robo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
