export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const SCENE_KEYS = {
  boot: 'BootScene',
  menu: 'MenuScene',
  level: 'LevelScene',
  gameOver: 'GameOverScene',
  victory: 'VictoryScene'
};

export const TEXTURE_KEYS = {
  player: 'player',
  ground: 'ground',
  platform: 'platform',
  fence: 'fence',
  tangerine: 'tangerine',
  exitLocked: 'exitLocked',
  exitOpen: 'exitOpen',
  neighbor: 'neighbor'
};

export const COLORS = {
  sky: 0x9fd3ff,
  menuBackground: 0x2d5a27
};

export const PLAYER = {
  speed: 220,
  jumpVelocity: -540
};

export const LEVEL = {
  fallMargin: 60
};
