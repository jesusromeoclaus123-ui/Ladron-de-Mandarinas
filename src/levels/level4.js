export const level4 = {
  name: 'Nivel 4 — La ronda del vecino',
  width: 3700,
  height: 600,
  playerStart: { x: 100, y: 520 },
  decorations: [
    { type: 'house', x: 3290, y: 560 },
    { type: 'tree', x: 120, y: 560 },
    { type: 'tree', x: 530, y: 560 },
    { type: 'tree', x: 1010, y: 560 },
    { type: 'tree', x: 1880, y: 560 },
    { type: 'tree', x: 2740, y: 560 },
    { type: 'bush', x: 340, y: 560 },
    { type: 'bush', x: 1450, y: 560 },
    { type: 'bush', x: 2260, y: 560 },
    { type: 'bush', x: 3530, y: 560 },
    { type: 'grass', x: 860, y: 560 },
    { type: 'grass', x: 3070, y: 560 },
    { type: 'flowers', x: 2040, y: 560 },
    { type: 'flowers', x: 3610, y: 560 }
  ],
  requiredTangerines: 8,
  nextLevelId: 'level5',
  ground: [
    { x: 0, y: 560, width: 680, height: 40 },
    { x: 820, y: 560, width: 740, height: 40 },
    { x: 1710, y: 560, width: 670, height: 40 },
    { x: 2520, y: 560, width: 1180, height: 40 }
  ],
  platforms: [
    { x: 180, y: 460, width: 140, height: 24 },
    { x: 400, y: 380, width: 130, height: 24 },
    { x: 900, y: 450, width: 170, height: 24 },
    { x: 1150, y: 360, width: 140, height: 24 },
    { x: 1350, y: 360, width: 130, height: 24 },
    { x: 1780, y: 440, width: 150, height: 24 },
    { x: 2000, y: 350, width: 140, height: 24 },
    { x: 2180, y: 390, width: 120, height: 24 },
    { x: 2600, y: 450, width: 160, height: 24 },
    { x: 2830, y: 370, width: 150, height: 24 },
    { x: 3220, y: 450, width: 160, height: 24 }
  ],
  fences: [
    { x: 580, y: 480, width: 16, height: 80 },
    { x: 1480, y: 480, width: 16, height: 80 },
    { x: 2300, y: 480, width: 16, height: 80 },
    { x: 3150, y: 480, width: 16, height: 80 },
    { x: 3450, y: 480, width: 16, height: 80 },
    { x: 3550, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 250, y: 434 },
    { x: 465, y: 354 },
    { x: 985, y: 424 },
    { x: 1220, y: 334 },
    { x: 1855, y: 414 },
    { x: 2070, y: 324 },
    { x: 2680, y: 424 },
    { x: 2905, y: 344 }
  ],
  exit: { x: 3650, y: 520 },
  neighbors: [
    { x: 1000, y: 539, patrolLeft: 860, patrolRight: 1400 },
    { x: 1950, y: 539, patrolLeft: 1770, patrolRight: 2180 },
    { x: 2900, y: 539, patrolLeft: 2700, patrolRight: 3080 }
  ]
};
