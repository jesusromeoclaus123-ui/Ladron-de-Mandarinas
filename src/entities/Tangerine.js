import Phaser from 'phaser';
import { TEXTURE_KEYS } from '../game/constants.js';

export class Tangerine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, TEXTURE_KEYS.tangerine);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.collected = false;
  }

  collect() {
    if (this.collected) {
      return false;
    }

    this.collected = true;
    this.disableBody(true, true);
    return true;
  }
}
