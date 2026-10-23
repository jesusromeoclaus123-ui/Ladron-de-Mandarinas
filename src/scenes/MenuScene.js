import Phaser from 'phaser';
import { COLORS, SCENE_KEYS } from '../game/constants.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.menu);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(COLORS.menuBackground);

    this.add.text(width / 2, 150, 'Ladrón de Mandarinas', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '56px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#173d14',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 215, 'Recolectá mandarinas y escapá del patio', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#e8f5d0'
    }).setOrigin(0.5);

    this.createPlayButton(width / 2, 320);

    this.add.text(width / 2, 470, 'A / D o flechas: moverse     Espacio: saltar', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#d8e8c0'
    }).setOrigin(0.5);
  }

  createPlayButton(x, y) {
    const button = this.add.rectangle(x, y, 220, 64, 0xf28c28)
      .setStrokeStyle(4, 0x7a3e00)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, 'Jugar', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    button.on('pointerover', () => {
      button.setFillStyle(0xffa64d);
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xf28c28);
    });

    button.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.level, { levelId: 'level1' });
    });
  }
}
