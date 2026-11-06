import Phaser from 'phaser';
import { SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { createScreenBackdrop, createScreenButton } from '../game/screenLayout.js';
import { TRANSLATION_KEYS } from '../services/translationKeys.js';
import { getPhrase } from '../services/translations.js';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.victory);
  }

  create() {
    const width = this.scale.width;

    createScreenBackdrop(this, 'victory');
    this.add.text(width / 2, 168, getPhrase(TRANSLATION_KEYS.victory.title), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '44px',
      fontStyle: 'bold',
      color: '#23472d',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 590 }
    }).setOrigin(0.5);

    this.add.text(width / 2, 260, getPhrase(TRANSLATION_KEYS.victory.subtitle), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '23px',
      color: '#50634b',
      align: 'center',
      wordWrap: { width: 580 }
    }).setOrigin(0.5);

    this.add.ellipse(width / 2, 386, 184, 20, 0xd4d6ab);
    const player = this.add.image(width / 2, 340, TEXTURE_KEYS.player).setScale(2.2);
    this.tweens.add({ targets: player, y: 332, duration: 850, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    for (const [index, x] of [274, 320, 480, 526].entries()) {
      const fruit = this.add.image(x, index % 2 === 0 ? 340 : 364, TEXTURE_KEYS.tangerine)
        .setScale(1.4).setAngle(index % 2 === 0 ? -15 : 15);
      this.tweens.add({ targets: fruit, y: fruit.y - 7, duration: 950, delay: index * 130, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }

    createScreenButton(this, width / 2, 456, getPhrase(TRANSLATION_KEYS.victory.backToMenu), () => {
      this.scene.start(SCENE_KEYS.menu);
    }, { width: 330, fontSize: 26 });

    this.cameras.main.fadeIn(350);
  }
}
