import Phaser from 'phaser';
import { COLORS, LEVEL, SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { LEVELS } from '../levels/index.js';
import { Player } from '../entities/Player.js';
import { Tangerine } from '../entities/Tangerine.js';
import { Exit } from '../entities/Exit.js';

export class LevelScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.level);
  }

  init(data) {
    this.levelId = data.levelId ?? 'level1';
    this.collectedTangerines = 0;
    this.isRestarting = false;
    this.hasFinished = false;
  }

  create() {
    const level = LEVELS[this.levelId];

    if (!level) {
      throw new Error(`Nivel desconocido: ${this.levelId}`);
    }

    this.level = level;
    this.requiredTangerines = level.requiredTangerines;

    this.physics.world.setBounds(
      0,
      0,
      level.width,
      level.height + LEVEL.fallMargin * 4
    );
    this.cameras.main.setBounds(0, 0, level.width, level.height);
    this.cameras.main.setBackgroundColor(COLORS.sky);

    this.solids = this.physics.add.staticGroup();
    this.addSolids(level.ground, TEXTURE_KEYS.ground);
    this.addSolids(level.platforms, TEXTURE_KEYS.platform);
    this.addSolids(level.fences, TEXTURE_KEYS.fence);

    this.player = new Player(this, level.playerStart.x, level.playerStart.y);
    this.physics.add.collider(this.player, this.solids);

    this.tangerines = this.add.group();
    for (const position of level.tangerines) {
      this.tangerines.add(new Tangerine(this, position.x, position.y));
    }

    this.physics.add.overlap(this.player, this.tangerines, (_player, tangerine) => {
      this.collectTangerine(tangerine);
    });

    this.exit = new Exit(this, level.exit.x, level.exit.y);
    this.exitCollider = this.physics.add.collider(this.player, this.exit);
    this.physics.add.overlap(this.player, this.exit, () => {
      this.tryExit();
    });

    if (this.collectedTangerines >= this.requiredTangerines) {
      this.openExit();
    }

    this.createHud();
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

  createHud() {
    this.counterText = null;

    const textStyle = {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#173d14',
      strokeThickness: 5
    };

    this.add.text(20, 16, this.level.name, textStyle)
      .setScrollFactor(0)
      .setDepth(100);

    if (this.requiredTangerines === 0) {
      return;
    }

    this.counterText = this.add.text(20, 52, '', textStyle)
      .setScrollFactor(0)
      .setDepth(100);

    this.updateCounter();
  }

  updateCounter() {
    this.counterText.setText(
      `Mandarinas: ${this.collectedTangerines} / ${this.requiredTangerines}`
    );
  }

  collectTangerine(tangerine) {
    if (!tangerine.collect()) {
      return;
    }

    this.collectedTangerines += 1;
    this.updateCounter();

    if (this.collectedTangerines >= this.requiredTangerines) {
      this.openExit();
    }
  }

  openExit() {
    if (this.exit.isOpen) {
      return;
    }

    this.exit.open();
    this.exitCollider.destroy();
  }

  tryExit() {
    if (!this.exit.isOpen || this.hasFinished) {
      return;
    }

    this.hasFinished = true;

    if (this.level.nextLevelId) {
      this.scene.start(SCENE_KEYS.level, { levelId: this.level.nextLevelId });
    }
  }

  update() {
    this.player.update();

    if (
      !this.isRestarting &&
      this.player.y > this.level.height + LEVEL.fallMargin
    ) {
      this.isRestarting = true;
      this.scene.restart({ levelId: this.levelId });
    }
  }
}
