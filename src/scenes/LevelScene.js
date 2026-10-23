import Phaser from 'phaser';
import { COLORS, SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { LEVELS } from '../levels/index.js';
import { Player } from '../entities/Player.js';

export class LevelScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.level);
  }

  init(data) {
    this.levelId = data.levelId ?? 'level1';
  }

  create() {
    const level = LEVELS[this.levelId];

    if (!level) {
      throw new Error(`Nivel desconocido: ${this.levelId}`);
    }

    this.physics.world.setBounds(0, 0, level.width, level.height);
    this.cameras.main.setBounds(0, 0, level.width, level.height);
    this.cameras.main.setBackgroundColor(COLORS.sky);

    this.solids = this.physics.add.staticGroup();
    this.addSolids(level.ground, TEXTURE_KEYS.ground);
    this.addSolids(level.platforms, TEXTURE_KEYS.platform);

    this.player = new Player(this, level.playerStart.x, level.playerStart.y);
    this.physics.add.collider(this.player, this.solids);

    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
  }

  addSolids(blocks, texture) {
    for (const block of blocks) {
      const solid = this.solids.create(
        block.x + block.width / 2,
        block.y + block.height / 2,
        texture
      );

      solid.setDisplaySize(block.width, block.height);
      solid.refreshBody();
    }
  }

  update() {
    this.player.update();
  }
}
