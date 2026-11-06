import Phaser from 'phaser';
import { SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { createScreenBackdrop, createScreenButton } from '../game/screenLayout.js';
import { TRANSLATION_KEYS } from '../services/translationKeys.js';
import { getPhrase } from '../services/translations.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.gameOver);
  }

  init(data) {
    this.levelId = data.levelId ?? 'level1';
  }

  create() {
    const width = this.scale.width;

    createScreenBackdrop(this, 'gameOver');
    this.add.ellipse(width / 2, 140, 100, 76, 0x3f4c48)
      .setStrokeStyle(2, 0x87947b);
    this.add.image(width / 2, 138, TEXTURE_KEYS.neighbor).setScale(1.5);

    this.add.text(width / 2, 218, getPhrase(TRANSLATION_KEYS.gameOver.title), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '60px',
      fontStyle: 'bold',
      color: '#ffe5be',
      stroke: '#101f26',
      strokeThickness: 5,
      align: 'center',
      wordWrap: { width: 540 }
    }).setOrigin(0.5);

    this.add.text(width / 2, 278, getPhrase(TRANSLATION_KEYS.gameOver.subtitle), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#c1ccc1',
      align: 'center',
      wordWrap: { width: 520 }
    }).setOrigin(0.5);

    createScreenButton(this, width / 2, 354, getPhrase(TRANSLATION_KEYS.gameOver.retry), () => {
      this.scene.start(SCENE_KEYS.level, { levelId: this.levelId });
    }, { width: 320, fontSize: 28 });

    createScreenButton(this, width / 2, 438, getPhrase(TRANSLATION_KEYS.gameOver.backToMenu), () => {
      this.scene.start(SCENE_KEYS.menu);
    }, { width: 320, fontSize: 24, secondary: true, dark: true });

    this.cameras.main.fadeIn(280);
  }
}
