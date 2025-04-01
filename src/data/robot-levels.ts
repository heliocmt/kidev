
// Define an interface for level structure
interface Cell {
  type: 'empty' | 'wall' | 'goal' | 'obstacle' | 'collectible';
}

interface Level {
  id: number;
  title: string;
  description: string;
  objective: string;
  difficulty: 'easy' | 'medium' | 'hard';
  grid: Cell[][];
  startPosition: { x: number; y: number };
  startDirection: 'up' | 'right' | 'down' | 'left';
  availableBlocks: string[];
  requiredBlocks: string[];
  optimalSolution: number;
  executionTime: number;
  goalPosition?: { x: number; y: number };
}

// Create levels with progressively more complex challenges
export const levels: Level[] = [
  // Level 1: Introduction - Moving Forward
  {
    id: 1,
    title: "Primeiros Passos",
    description: "Bem-vindo ao Planeta Alfa! Vamos aprender a controlar nosso robô explorador.",
    objective: "Mova o robô até a meta verde usando o comando 'Andar'.",
    difficulty: "easy",
    grid: Array(5).fill(null).map(() => Array(5).fill({ type: 'empty' })),
    startPosition: { x: 1, y: 2 },
    startDirection: 'right',
    availableBlocks: ['move-forward'],
    requiredBlocks: ['move-forward'],
    optimalSolution: 3,
    executionTime: 2000,
    goalPosition: { x: 4, y: 2 }
  },
  
  // Level 2: Turning
  {
    id: 2,
    title: "Fazendo Curvas",
    description: "Nosso robô encontrou um caminho com obstáculos no Planeta Beta.",
    objective: "Dirija o robô até a meta verde, virando quando necessário.",
    difficulty: "easy",
    grid: Array(5).fill(null).map(() => Array(5).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left'],
    requiredBlocks: ['move-forward', 'turn-right'],
    optimalSolution: 5,
    executionTime: 3000,
    goalPosition: { x: 2, y: 2 }
  },
  
  // Level 3: Loops
  {
    id: 3,
    title: "Repetição",
    description: "No Planeta Gama, precisamos ser mais eficientes com nossos comandos.",
    objective: "Use o bloco de repetição para alcançar a meta com menos comandos.",
    difficulty: "medium",
    grid: Array(7).fill(null).map(() => Array(5).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 3 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'loop-start-3', 'loop-end'],
    requiredBlocks: ['move-forward', 'loop-start-3'],
    optimalSolution: 4,
    executionTime: 4000,
    goalPosition: { x: 6, y: 3 }
  },
  
  // Level 4: Collecting Items
  {
    id: 4,
    title: "Coletando Cristais",
    description: "O Planeta Delta contém valiosos cristais de energia que precisamos coletar.",
    objective: "Colete todos os cristais amarelos e chegue à meta verde.",
    difficulty: "medium",
    grid: Array(5).fill(null).map(() => Array(5).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'collect'],
    requiredBlocks: ['move-forward', 'collect'],
    optimalSolution: 8,
    executionTime: 5000,
    goalPosition: { x: 4, y: 2 }
  },
  
  // Level 5: Conditionals
  {
    id: 5,
    title: "Tomando Decisões",
    description: "O terreno acidentado do Planeta Ômega requer que nosso robô tome decisões inteligentes.",
    objective: "Use o bloco 'Se Caminho Livre' para desviar de obstáculos e chegar à meta.",
    difficulty: "hard",
    grid: Array(6).fill(null).map(() => Array(6).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'if-path'],
    requiredBlocks: ['if-path', 'move-forward'],
    optimalSolution: 10,
    executionTime: 6000,
    goalPosition: { x: 5, y: 4 }
  }
];

// Fill in level grid data with walls, goals, and collectibles
// Level 1: Simple path forward
levels[0].grid[2][4] = { type: 'goal' };

// Level 2: Path with turns
levels[1].grid[0][0] = { type: 'empty' };
levels[1].grid[0][1] = { type: 'empty' };
levels[1].grid[0][2] = { type: 'wall' };
levels[1].grid[1][0] = { type: 'wall' };
levels[1].grid[1][1] = { type: 'empty' };
levels[1].grid[1][2] = { type: 'empty' };
levels[1].grid[2][0] = { type: 'empty' };
levels[1].grid[2][1] = { type: 'empty' };
levels[1].grid[2][2] = { type: 'goal' };

// Level 3: Long path for loops
levels[2].grid[0][3] = { type: 'empty' };
levels[2].grid[1][3] = { type: 'empty' };
levels[2].grid[2][3] = { type: 'empty' };
levels[2].grid[3][3] = { type: 'empty' };
levels[2].grid[4][3] = { type: 'empty' };
levels[2].grid[5][3] = { type: 'empty' };
levels[2].grid[6][3] = { type: 'goal' };

// Level 4: Collectibles
levels[3].grid[0][0] = { type: 'empty' };
levels[3].grid[0][2] = { type: 'collectible' };
levels[3].grid[2][1] = { type: 'collectible' };
levels[3].grid[2][3] = { type: 'collectible' };
levels[3].grid[4][2] = { type: 'goal' };

// Level 5: Path with obstacles for conditionals
levels[4].grid[0][0] = { type: 'empty' };
levels[4].grid[0][1] = { type: 'empty' };
levels[4].grid[0][2] = { type: 'empty' };
levels[4].grid[0][3] = { type: 'empty' };
levels[4].grid[0][4] = { type: 'obstacle' };
levels[4].grid[1][0] = { type: 'empty' };
levels[4].grid[1][1] = { type: 'wall' };
levels[4].grid[1][2] = { type: 'wall' };
levels[4].grid[1][3] = { type: 'empty' };
levels[4].grid[1][4] = { type: 'empty' };
levels[4].grid[2][0] = { type: 'obstacle' };
levels[4].grid[2][1] = { type: 'empty' };
levels[4].grid[2][2] = { type: 'empty' };
levels[4].grid[2][3] = { type: 'empty' };
levels[4].grid[2][4] = { type: 'wall' };
levels[4].grid[3][0] = { type: 'empty' };
levels[4].grid[3][1] = { type: 'empty' };
levels[4].grid[3][2] = { type: 'wall' };
levels[4].grid[3][3] = { type: 'wall' };
levels[4].grid[3][4] = { type: 'empty' };
levels[4].grid[4][0] = { type: 'empty' };
levels[4].grid[4][1] = { type: 'wall' };
levels[4].grid[4][2] = { type: 'empty' };
levels[4].grid[4][3] = { type: 'empty' };
levels[4].grid[4][4] = { type: 'empty' };
levels[4].grid[5][4] = { type: 'goal' };
