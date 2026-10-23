import Phaser from 'phaser';
import { TEXTURE_KEYS } from '../game/constants.js';

export class Exit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, TEXTURE_KEYS.exitLocked);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.isOpen = false;
  }

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.setTexture(TEXTURE_KEYS.exitOpen);
    this.refreshBody();
  }
}
