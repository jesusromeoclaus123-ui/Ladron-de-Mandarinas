import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { LevelScene } from './scenes/LevelScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';
import { GAME_WIDTH, GAME_HEIGHT } from './game/constants.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#9fd3ff',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, LevelScene, GameOverScene, VictoryScene]
};

new Phaser.Game(config);
