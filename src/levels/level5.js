export const level5 = {
  name: 'Nivel 5 — La gran escapada',
  width: 4200,
  height: 600,
  playerStart: { x: 100, y: 520 },
  requiredTangerines: 10,
  nextLevelId: null,
  isFinal: true,
  ground: [
    { x: 0, y: 560, width: 620, height: 40 },
    { x: 770, y: 560, width: 630, height: 40 },
    { x: 1560, y: 560, width: 680, height: 40 },
    { x: 2390, y: 560, width: 730, height: 40 },
    { x: 3280, y: 560, width: 920, height: 40 }
  ],
  platforms: [
    { x: 160, y: 460, width: 140, height: 24 },
    { x: 390, y: 370, width: 130, height: 24 },
    { x: 600, y: 280, width: 120, height: 24 },
    { x: 820, y: 450, width: 160, height: 24 },
    { x: 1050, y: 360, width: 140, height: 24 },
    { x: 1620, y: 440, width: 150, height: 24 },
    { x: 1850, y: 350, width: 140, height: 24 },
    { x: 2450, y: 450, width: 160, height: 24 },
    { x: 2680, y: 360, width: 150, height: 24 },
    { x: 2900, y: 270, width: 130, height: 24 }
  ],
  fences: [
    { x: 500, y: 480, width: 16, height: 80 },
    { x: 1300, y: 480, width: 16, height: 80 },
    { x: 2120, y: 480, width: 16, height: 80 },
    { x: 3000, y: 480, width: 16, height: 80 },
    { x: 3900, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 230, y: 434 },
    { x: 455, y: 344 },
    { x: 660, y: 254 },
    { x: 900, y: 424 },
    { x: 1120, y: 334 },
    { x: 1695, y: 414 },
    { x: 1920, y: 324 },
    { x: 2530, y: 424 },
    { x: 2755, y: 334 },
    { x: 2965, y: 244 }
  ],
  exit: { x: 4150, y: 520 },
  neighbors: [
    { x: 1050, y: 539, patrolLeft: 850, patrolRight: 1250 },
    { x: 1900, y: 539, patrolLeft: 1700, patrolRight: 2050 },
    { x: 3600, y: 539, patrolLeft: 3350, patrolRight: 3850 }
  ]
};
