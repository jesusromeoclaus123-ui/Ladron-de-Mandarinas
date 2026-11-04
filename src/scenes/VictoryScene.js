import Phaser from 'phaser';
import { COLORS, SCENE_KEYS } from '../game/constants.js';
import { TRANSLATION_KEYS } from '../services/translationKeys.js';
import { getPhrase } from '../services/translations.js';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.victory);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(COLORS.menuBackground);

    this.add.text(width / 2, 200, getPhrase(TRANSLATION_KEYS.victory.title), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#173d14',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 270, getPhrase(TRANSLATION_KEYS.victory.subtitle), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: '#e8f5d0'
    }).setOrigin(0.5);

    this.createButton(width / 2, 380, getPhrase(TRANSLATION_KEYS.victory.backToMenu), () => {
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
