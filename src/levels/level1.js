export const level1 = {
  name: 'Nivel 1 — La entrada al patio',
  width: 2500,
  height: 600,
  playerStart: { x: 100, y: 520 },
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
    { x: 200, y: 480, width: 16, height: 80 },
    { x: 2200, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 355, y: 424 },
    { x: 860, y: 424 },
    { x: 1505, y: 424 }
  ],
  exit: { x: 2470, y: 520 }
};
