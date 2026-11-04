export const level1 = {
  name: 'Nivel 1 — La entrada al patio',
  width: 2500,
  height: 600,
  playerStart: { x: 100, y: 520 },
  decorations: [
    { type: 'house', x: 2080, y: 560 },
    { type: 'tree', x: 190, y: 560 },
    { type: 'tree', x: 940, y: 560 },
    { type: 'tree', x: 1550, y: 560 },
    { type: 'tree', x: 2360, y: 560 },
    { type: 'bush', x: 460, y: 560 },
    { type: 'bush', x: 1100, y: 560 },
    { type: 'bush', x: 1900, y: 560 },
    { type: 'grass', x: 720, y: 560 },
    { type: 'grass', x: 1640, y: 560 },
    { type: 'flowers', x: 60, y: 560 },
    { type: 'flowers', x: 2250, y: 560 }
  ],
  requiredTangerines: 3,
  nextLevelId: 'level2',
  ground: [
    { x: 0, y: 560, width: 520, height: 40 },
    { x: 650, y: 560, width: 530, height: 40 },
    { x: 1320, y: 560, width: 380, height: 40 },
    { x: 1830, y: 560, width: 670, height: 40 }
  ],
  platforms: [
    { x: 280, y: 450, width: 150, height: 24 },
    { x: 780, y: 450, width: 160, height: 24 },
    { x: 1430, y: 450, width: 150, height: 24 }
  ],
  fences: [
    { x: 150, y: 480, width: 16, height: 80 },
    { x: 2200, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 355, y: 424 },
    { x: 860, y: 424 },
    { x: 1505, y: 424 }
  ],
  exit: { x: 2470, y: 520 }
};
