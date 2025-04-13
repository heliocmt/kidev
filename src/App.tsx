
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/game" element={<Game />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/codepets" element={
              <ProtectedRoute>
                <CodePets />
              </ProtectedRoute>
            } />
            <Route path="/jscodepets" element={
              <ProtectedRoute>
                <JsCodePets />
              </ProtectedRoute>
            } />
            <Route path="/blockcoding" element={
              <ProtectedRoute>
                <BlockCoding />
              </ProtectedRoute>
            } />
            <Route path="/pythonquest" element={
              <ProtectedRoute>
                <PythonQuest />
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/robo" element={
              <ProtectedRoute>
                <Robo />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
