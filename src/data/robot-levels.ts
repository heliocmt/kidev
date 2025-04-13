
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
  hint?: string; // Added the hint property as optional
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
    executionTime: 10000, // Aumentado para 10 segundos
    goalPosition: { x: 4, y: 2 },
    hint: "Use o bloco 'Andar' para mover o robô para frente. Você precisará de 3 blocos para alcançar a meta."
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
    executionTime: 12000, // Aumentado para 12 segundos
    goalPosition: { x: 2, y: 2 },
    hint: "Você precisará virar para navegar pelo caminho. Use 'Virar à direita' e 'Andar' para alcançar a meta."
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
    executionTime: 15000, // Aumentado para 15 segundos
    goalPosition: { x: 6, y: 3 },
    hint: "Use o bloco 'Repetir 3 vezes' com o comando 'Andar' dentro dele para mover o robô de forma eficiente."
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
    executionTime: 20000, // Aumentado para 20 segundos
    goalPosition: { x: 4, y: 2 },
    hint: "Planeje seu caminho para passar por todos os cristais. Use o comando 'Coletar' quando estiver na mesma posição do cristal."
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
    executionTime: 30000, // Aumentado para 30 segundos
    goalPosition: { x: 5, y: 4 },
    hint: "Use 'Se Caminho Livre' para verificar se há obstáculos e tomar decisões sobre quando virar ou seguir em frente."
  },
  
  // NOVOS NÍVEIS
  
  // Level 6: Nested Loops
  {
    id: 6,
    title: "Laços Aninhados",
    description: "Na Lua de Xenon, precisamos usar repetições dentro de repetições para explorar padrões complexos.",
    objective: "Use laços aninhados para traçar um caminho eficiente até a meta.",
    difficulty: "medium",
    grid: Array(7).fill(null).map(() => Array(7).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'loop-start-2', 'loop-end', 'loop-start-3'],
    requiredBlocks: ['loop-start-2', 'loop-start-3', 'move-forward'],
    optimalSolution: 7,
    executionTime: 25000,
    goalPosition: { x: 6, y: 6 },
    hint: "Experimente usar um laço dentro de outro para criar padrões de movimento complexos. Por exemplo, repita 2 vezes: (andar e dentro disso repita 3 vezes: virar)."
  },
  
  // Level 7: Multiple Goals
  {
    id: 7,
    title: "Múltiplos Objetivos",
    description: "As ruínas de Zeta Prime contêm múltiplos postos de pesquisa que precisam ser visitados.",
    objective: "Visite todos os objetivos verdes na ordem correta usando o comando 'Marcar'.",
    difficulty: "hard",
    grid: Array(6).fill(null).map(() => Array(6).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'mark-checkpoint'],
    requiredBlocks: ['move-forward', 'mark-checkpoint'],
    optimalSolution: 12,
    executionTime: 35000,
    goalPosition: { x: 5, y: 5 },
    hint: "Você precisa visitar todos os pontos verdes e usar o comando 'Marcar' em cada um deles antes de seguir para o próximo. A ordem é importante!"
  },
  
  // Level 8: Teleporters
  {
    id: 8,
    title: "Teletransporte",
    description: "No campo de antigravidade do Planeta Tau, existem portais de teletransporte.",
    objective: "Use os portais para navegar pelo mapa e alcançar a meta de forma eficiente.",
    difficulty: "hard",
    grid: Array(7).fill(null).map(() => Array(7).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'activate-teleport'],
    requiredBlocks: ['move-forward', 'activate-teleport'],
    optimalSolution: 9,
    executionTime: 30000,
    goalPosition: { x: 6, y: 6 },
    hint: "Quando você encontrar um portal (marcado em roxo), use o comando 'Ativar Teletransporte' para ser transportado para outro local do mapa. Planeje sua rota com cuidado!"
  },
  
  // Level 9: Sensors and Logic
  {
    id: 9,
    title: "Sensores Avançados",
    description: "As tempestades elétricas de Éter exigem o uso de sensores avançados.",
    objective: "Use os comandos 'Se Cristal' e 'Se Obstáculo' para navegar com segurança.",
    difficulty: "hard",
    grid: Array(8).fill(null).map(() => Array(8).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: ['move-forward', 'turn-right', 'turn-left', 'if-crystal', 'if-obstacle', 'collect'],
    requiredBlocks: ['if-crystal', 'if-obstacle', 'move-forward'],
    optimalSolution: 14,
    executionTime: 40000,
    goalPosition: { x: 7, y: 7 },
    hint: "Use 'Se Cristal' para detectar e coletar cristais próximos, e 'Se Obstáculo' para desviar de perigos. Combine estes comandos para criar uma lógica de navegação adaptativa."
  },
  
  // Level 10: Final Challenge
  {
    id: 10,
    title: "Desafio Final",
    description: "O núcleo do planeta Ômega contém o tesouro final, mas o caminho é extremamente perigoso.",
    objective: "Combine todos os comandos aprendidos para superar o labirinto final e alcançar o tesouro.",
    difficulty: "hard",
    grid: Array(10).fill(null).map(() => Array(10).fill({ type: 'empty' })),
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    availableBlocks: [
      'move-forward', 'turn-right', 'turn-left', 
      'loop-start-2', 'loop-start-3', 'loop-end', 
      'if-path', 'if-crystal', 'if-obstacle',
      'collect', 'mark-checkpoint', 'activate-teleport'
    ],
    requiredBlocks: ['move-forward', 'if-path', 'loop-start-2'],
    optimalSolution: 20,
    executionTime: 60000,
    goalPosition: { x: 9, y: 9 },
    hint: "Este é o desafio definitivo! Combine repetições, condicionais e todos os comandos especiais que você aprendeu. Planeje sua estratégia cuidadosamente e adapte-se aos obstáculos do caminho."
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

// NOVOS NÍVEIS - Configuraçõe das grades

// Level 6: Nested Loops - Spiral pattern
levels[5].grid[0][0] = { type: 'empty' };
levels[5].grid[1][0] = { type: 'empty' };
levels[5].grid[2][0] = { type: 'empty' };
levels[5].grid[3][0] = { type: 'empty' };
levels[5].grid[4][0] = { type: 'empty' };
levels[5].grid[5][0] = { type: 'empty' };
levels[5].grid[6][0] = { type: 'wall' };
levels[5].grid[0][1] = { type: 'empty' };
levels[5].grid[1][1] = { type: 'wall' };
levels[5].grid[2][1] = { type: 'wall' };
levels[5].grid[3][1] = { type: 'wall' };
levels[5].grid[4][1] = { type: 'wall' };
levels[5].grid[5][1] = { type: 'empty' };
levels[5].grid[6][1] = { type: 'wall' };
levels[5].grid[0][2] = { type: 'empty' };
levels[5].grid[1][2] = { type: 'wall' };
levels[5].grid[2][2] = { type: 'empty' };
levels[5].grid[3][2] = { type: 'empty' };
levels[5].grid[4][2] = { type: 'wall' };
levels[5].grid[5][2] = { type: 'empty' };
levels[5].grid[6][2] = { type: 'wall' };
levels[5].grid[0][3] = { type: 'empty' };
levels[5].grid[1][3] = { type: 'wall' };
levels[5].grid[2][3] = { type: 'wall' };
levels[5].grid[3][3] = { type: 'empty' };
levels[5].grid[4][3] = { type: 'wall' };
levels[5].grid[5][3] = { type: 'empty' };
levels[5].grid[6][3] = { type: 'empty' };
levels[5].grid[0][4] = { type: 'wall' };
levels[5].grid[1][4] = { type: 'wall' };
levels[5].grid[2][4] = { type: 'empty' };
levels[5].grid[3][4] = { type: 'empty' };
levels[5].grid[4][4] = { type: 'wall' };
levels[5].grid[5][4] = { type: 'wall' };
levels[5].grid[6][4] = { type: 'empty' };
levels[5].grid[0][5] = { type: 'empty' };
levels[5].grid[1][5] = { type: 'empty' };
levels[5].grid[2][5] = { type: 'empty' };
levels[5].grid[3][5] = { type: 'empty' };
levels[5].grid[4][5] = { type: 'empty' };
levels[5].grid[5][5] = { type: 'empty' };
levels[5].grid[6][5] = { type: 'empty' };
levels[5].grid[0][6] = { type: 'empty' };
levels[5].grid[1][6] = { type: 'empty' };
levels[5].grid[2][6] = { type: 'wall' };
levels[5].grid[3][6] = { type: 'wall' };
levels[5].grid[4][6] = { type: 'wall' };
levels[5].grid[5][6] = { type: 'empty' };
levels[5].grid[6][6] = { type: 'goal' };

// Level 7: Multiple Goals - Checkpoints
levels[6].grid[0][0] = { type: 'empty' };
levels[6].grid[1][1] = { type: 'goal' }; // Primeiro ponto de verificação
levels[6].grid[4][1] = { type: 'goal' }; // Segundo ponto de verificação
levels[6].grid[1][4] = { type: 'goal' }; // Terceiro ponto de verificação
levels[6].grid[5][5] = { type: 'goal' }; // Objetivo final
levels[6].grid[2][2] = { type: 'wall' };
levels[6].grid[2][3] = { type: 'wall' };
levels[6].grid[3][2] = { type: 'wall' };
levels[6].grid[3][3] = { type: 'obstacle' };

// Level 8: Teleporters
levels[7].grid[0][0] = { type: 'empty' };
levels[7].grid[2][2] = { type: 'collectible' }; // Teleporter source 1
levels[7].grid[2][2].type = 'collectible'; // Marcamos como collectible mas interpretamos como teleporter
levels[7].grid[5][1] = { type: 'collectible' }; // Teleporter destination 1
levels[7].grid[4][4] = { type: 'collectible' }; // Teleporter source 2
levels[7].grid[1][5] = { type: 'collectible' }; // Teleporter destination 2
levels[7].grid[6][6] = { type: 'goal' };
// Adicionando obstáculos e paredes
for (let i = 0; i < 3; i++) {
    levels[7].grid[3][i] = { type: 'wall' };
    levels[7].grid[i][3] = { type: 'wall' };
}
levels[7].grid[5][5] = { type: 'obstacle' };
levels[7].grid[6][5] = { type: 'obstacle' };
levels[7].grid[5][6] = { type: 'obstacle' };

// Level 9: Sensors and Logic
levels[8].grid[0][0] = { type: 'empty' };
// Adicionar cristais espalhados
levels[8].grid[1][1] = { type: 'collectible' };
levels[8].grid[3][2] = { type: 'collectible' };
levels[8].grid[2][4] = { type: 'collectible' };
levels[8].grid[5][3] = { type: 'collectible' };
levels[8].grid[4][6] = { type: 'collectible' };
// Adicionar obstáculos espalhados
levels[8].grid[2][1] = { type: 'obstacle' };
levels[8].grid[1][3] = { type: 'obstacle' };
levels[8].grid[4][2] = { type: 'obstacle' };
levels[8].grid[3][5] = { type: 'obstacle' };
levels[8].grid[6][4] = { type: 'obstacle' };
// Paredes formando um caminho complexo
levels[8].grid[1][4] = { type: 'wall' };
levels[8].grid[1][5] = { type: 'wall' };
levels[8].grid[1][6] = { type: 'wall' };
levels[8].grid[3][3] = { type: 'wall' };
levels[8].grid[3][4] = { type: 'wall' };
levels[8].grid[5][1] = { type: 'wall' };
levels[8].grid[5][2] = { type: 'wall' };
levels[8].grid[5][5] = { type: 'wall' };
levels[8].grid[5][6] = { type: 'wall' };
levels[8].grid[5][7] = { type: 'wall' };
levels[8].grid[6][5] = { type: 'wall' };
levels[8].grid[7][7] = { type: 'goal' };

// Level 10: Final Challenge - Complex maze
// Definindo o objetivo final
levels[9].grid[9][9] = { type: 'goal' };

// Adicionando paredes para formar um labirinto complexo
for (let i = 0; i < 8; i++) {
    if (i !== 2) levels[9].grid[i][1] = { type: 'wall' }; // Parede vertical com abertura
}
for (let i = 1; i < 8; i++) {
    if (i !== 4) levels[9].grid[2][i] = { type: 'wall' }; // Parede horizontal com abertura
}
for (let i = 3; i < 10; i++) {
    if (i !== 6) levels[9].grid[i][3] = { type: 'wall' }; // Parede vertical com abertura
}
for (let i = 3; i < 8; i++) {
    if (i !== 5) levels[9].grid[4][i] = { type: 'wall' }; // Parede horizontal com abertura
}
for (let i = 5; i < 10; i++) {
    if (i !== 7) levels[9].grid[i][5] = { type: 'wall' }; // Parede vertical com abertura
}
for (let i = 5; i < 10; i++) {
    if (i !== 8) levels[9].grid[6][i] = { type: 'wall' }; // Parede horizontal com abertura
}
for (let i = 0; i < 6; i++) {
    if (i !== 3) levels[9].grid[i][7] = { type: 'wall' }; // Parede vertical com abertura
}
for (let i = 7; i < 10; i++) {
    if (i !== 8) levels[9].grid[8][i] = { type: 'wall' }; // Parede horizontal com abertura
}

// Adicionando obstáculos em posições estratégicas
levels[9].grid[1][3] = { type: 'obstacle' };
levels[9].grid[3][5] = { type: 'obstacle' };
levels[9].grid[5][1] = { type: 'obstacle' };
levels[9].grid[7][7] = { type: 'obstacle' };

// Adicionando cristais para coletar
levels[9].grid[1][2] = { type: 'collectible' };
levels[9].grid[3][6] = { type: 'collectible' };
levels[9].grid[5][4] = { type: 'collectible' };
levels[9].grid[7][2] = { type: 'collectible' };
levels[9].grid[8][8] = { type: 'collectible' };

// Teleporters (interpretados como collectibles)
levels[9].grid[2][7] = { type: 'collectible' };
levels[9].grid[7][4] = { type: 'collectible' };
