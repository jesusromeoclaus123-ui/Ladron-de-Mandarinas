export const level2 = {
  name: 'Nivel 2 — Cuidado con el vecino',
  width: 2800,
  height: 600,
  playerStart: { x: 100, y: 520 },
  requiredTangerines: 5,
  nextLevelId: null,
  ground: [
    { x: 0, y: 560, width: 600, height: 40 },
    { x: 720, y: 560, width: 520, height: 40 },
    { x: 1360, y: 560, width: 560, height: 40 },
    { x: 2020, y: 560, width: 780, height: 40 }
  ],
  platforms: [
    { x: 340, y: 460, width: 170, height: 24 },
    { x: 820, y: 440, width: 150, height: 24 },
    { x: 980, y: 380, width: 140, height: 24 },
    { x: 1460, y: 460, width: 160, height: 24 },
    { x: 1640, y: 380, width: 150, height: 24 },
    { x: 2120, y: 450, width: 170, height: 24 },
    { x: 2340, y: 380, width: 150, height: 24 }
  ],
  fences: [
    { x: 820, y: 480, width: 16, height: 80 },
    { x: 2055, y: 480, width: 16, height: 80 },
    { x: 2200, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 425, y: 434 },
    { x: 1050, y: 354 },
    { x: 1535, y: 434 },
    { x: 1710, y: 354 },
    { x: 2410, y: 354 }
  ],
  exit: { x: 2755, y: 520 },
  neighbor: {
    x: 1700,
    y: 539,
    patrolLeft: 1420,
    patrolRight: 1880
  }
};
