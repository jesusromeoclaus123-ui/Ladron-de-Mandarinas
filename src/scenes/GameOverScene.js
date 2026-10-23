import Phaser from 'phaser';
import { COLORS, SCENE_KEYS } from '../game/constants.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.gameOver);
  }

  init(data) {
    this.levelId = data.levelId ?? 'level1';
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(COLORS.menuBackground);

    this.add.text(width / 2, 180, 'Game Over', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#5a1f1f',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 250, 'Te atraparon o caíste al pozo', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: '#f5d0d0'
    }).setOrigin(0.5);

    this.createButton(width / 2, 340, 'Reintentar', () => {
      this.scene.stop();
      this.scene.start(SCENE_KEYS.level, { levelId: this.levelId });
    });

    this.createButton(width / 2, 420, 'Volver al menú', () => {
      this.scene.stop();
      this.scene.start(SCENE_KEYS.menu);
    });
  }

  createButton(x, y, label, callback) {
    const button = this.add.rectangle(x, y, 280, 64, 0xf28c28)
      .setStrokeStyle(4, 0x7a3e00)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, label, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    button.on('pointerover', () => {
      button.setFillStyle(0xffa64d);
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xf28c28);
    });

    button.on('pointerdown', callback);
  }
}
