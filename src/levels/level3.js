export const level3 = {
  name: 'Nivel 3 — Entre las cercas',
  width: 3300,
  height: 600,
  playerStart: { x: 100, y: 520 },
  decorations: [
    { type: 'house', x: 2870, y: 560 },
    { type: 'tree', x: 170, y: 560 },
    { type: 'tree', x: 650, y: 560 },
    { type: 'tree', x: 1180, y: 560 },
    { type: 'tree', x: 1870, y: 560 },
    { type: 'tree', x: 2550, y: 560 },
    { type: 'bush', x: 380, y: 560 },
    { type: 'bush', x: 1400, y: 560 },
    { type: 'bush', x: 2170, y: 560 },
    { type: 'grass', x: 980, y: 560 },
    { type: 'grass', x: 3080, y: 560 },
    { type: 'flowers', x: 70, y: 560 },
    { type: 'flowers', x: 2710, y: 560 }
  ],
  requiredTangerines: 7,
  nextLevelId: 'level4',
  ground: [
    { x: 0, y: 560, width: 760, height: 40 },
    { x: 880, y: 560, width: 620, height: 40 },
    { x: 1630, y: 560, width: 640, height: 40 },
    { x: 2400, y: 560, width: 900, height: 40 }
  ],
  platforms: [
    { x: 260, y: 450, width: 170, height: 24 },
    { x: 520, y: 380, width: 150, height: 24 },
    { x: 930, y: 450, width: 160, height: 24 },
    { x: 1180, y: 370, width: 150, height: 24 },
    { x: 1710, y: 450, width: 160, height: 24 },
    { x: 1950, y: 380, width: 150, height: 24 },
    { x: 2440, y: 450, width: 170, height: 24 },
    { x: 2680, y: 370, width: 150, height: 24 },
    { x: 2880, y: 450, width: 160, height: 24 }
  ],
  fences: [
    { x: 620, y: 480, width: 16, height: 80 },
    { x: 1420, y: 480, width: 16, height: 80 },
    { x: 2160, y: 480, width: 16, height: 80 },
    { x: 2760, y: 480, width: 16, height: 80 },
    { x: 3050, y: 480, width: 16, height: 80 }
  ],
  tangerines: [
    { x: 345, y: 424 },
    { x: 595, y: 354 },
    { x: 1010, y: 424 },
    { x: 1255, y: 344 },
    { x: 1790, y: 424 },
    { x: 2025, y: 354 },
    { x: 2960, y: 424 }
  ],
  exit: { x: 3250, y: 520 },
  neighbors: [
    { x: 1120, y: 539, patrolLeft: 960, patrolRight: 1340 },
    { x: 2550, y: 539, patrolLeft: 2490, patrolRight: 2690 }
  ]
};
