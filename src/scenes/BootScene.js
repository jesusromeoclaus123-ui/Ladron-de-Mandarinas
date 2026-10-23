import Phaser from 'phaser';
import { SCENE_KEYS } from '../game/constants.js';
import { createPlaceholderTextures } from '../game/textures.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.boot);
  }

  create() {
    createPlaceholderTextures(this);
    this.scene.start(SCENE_KEYS.menu);
  }
}
