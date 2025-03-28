
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="font-bold text-white text-xs">KD</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                KiDev
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Transformando o aprendizado de programação em diversão para as crianças do Brasil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/game" className="text-gray-600 hover:text-purple-600 text-sm">
                  Primeiros Passos
                </Link>
              </li>
              <li>
                <Link to="/codepets" className="text-gray-600 hover:text-purple-600 text-sm">
                  CodePets
                </Link>
              </li>
              <li>
                <Link to="/blockcoding" className="text-gray-600 hover:text-purple-600 text-sm">
                  Programação em Blocos
                </Link>
              </li>
              <li>
                <Link to="/pythonquest" className="text-gray-600 hover:text-purple-600 text-sm">
                  Python Quest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Guia para Pais
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Materiais para Educadores
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Blog de Programação
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-purple-500 mt-0.5" />
                <span className="text-sm text-gray-600">
                  contato@kidev.com.br
                </span>
              </li>
              <li>
                <form>
                  <label className="block text-sm text-gray-600 mb-2">
                    Inscreva-se na nossa newsletter:
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Seu e-mail" 
                      className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} KiDev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
