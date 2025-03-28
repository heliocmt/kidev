
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  Menu, 
  X, 
  LogOut,
  UserCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/auth');
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  // Get initials from email for avatar
  const getInitials = () => {
    if (!user) return "?";
    const email = user.email || "";
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="font-bold text-white">CK</span>
          </div>
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CodeKidos
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Aprender
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li>
                      <Link to="/game">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">Primeiros Passos</div>
                          <p className="text-sm text-muted-foreground">
                            Aprenda conceitos básicos de programação de forma interativa.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/codepets">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">CodePets</div>
                          <p className="text-sm text-muted-foreground">
                            Crie e cuide de pets virtuais enquanto aprende a programar.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blockcoding">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-yellow-50 to-yellow-100 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">Programação em Blocos</div>
                          <p className="text-sm text-muted-foreground">
                            Monte sua própria aventura com blocos de código coloridos.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/pythonquest">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-50 to-purple-100 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">Python Quest</div>
                          <p className="text-sm text-muted-foreground">
                            Aventure-se no mundo do Python com desafios incríveis.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Trophy className="mr-2 h-4 w-4" />
                  Conquistas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <p className="text-sm text-muted-foreground mb-2">Disponível em breve!</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-500">Primeiro Código</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-500">Mestre dos Loops</span>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/sobre">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Users className="mr-2 h-4 w-4" />
                    Sobre Nós
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Button variant="outline" size="sm" onClick={handleLogin}>Entrar</Button>
              <Button size="sm" onClick={() => navigate('/auth')}>Registrar</Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t absolute w-full z-50">
          <nav className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-5 w-5" />
              <span>Início</span>
            </Link>
            <Link to="/game" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              <BookOpen className="h-5 w-5" />
              <span>Primeiros Passos</span>
            </Link>
            <Link to="/codepets" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              <BookOpen className="h-5 w-5" />
              <span>CodePets</span>
            </Link>
            <Link to="/blockcoding" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              <BookOpen className="h-5 w-5" />
              <span>Programação em Blocos</span>
            </Link>
            <Link to="/pythonquest" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              <BookOpen className="h-5 w-5" />
              <span>Python Quest</span>
            </Link>
          </nav>
          <div className="mt-4 flex gap-2">
            {!user ? (
              <>
                <Button variant="outline" className="flex-1" onClick={handleLogin}>Entrar</Button>
                <Button className="flex-1" onClick={handleLogin}>Registrar</Button>
              </>
            ) : (
              <Button variant="outline" className="flex-1" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
