import Phaser from 'phaser';
import { COLORS, LEVEL, SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { LEVELS } from '../levels/index.js';
import { Player } from '../entities/Player.js';
import { Tangerine } from '../entities/Tangerine.js';
import { Exit } from '../entities/Exit.js';
import { Neighbor } from '../entities/Neighbor.js';
import { TRANSLATION_KEYS } from '../services/translationKeys.js';
import { getPhrase } from '../services/translations.js';

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

    this.createDecorations(level.decorations ?? []);

    this.solids = this.physics.add.staticGroup();
    this.addSolids(level.ground, TEXTURE_KEYS.ground);
    this.addSolids(level.platforms, TEXTURE_KEYS.platform);
    this.addSolids(level.fences, TEXTURE_KEYS.fence);

    this.player = new Player(this, level.playerStart.x, level.playerStart.y);
    this.physics.add.collider(this.player, this.solids);

    this.neighbors = [];
    const neighborConfigs = level.neighbors ?? (level.neighbor ? [level.neighbor] : []);

    for (const config of neighborConfigs) {
      const neighbor = new Neighbor(
        this,
        config.x,
        config.y,
        config.patrolLeft,
        config.patrolRight
      );

      this.physics.add.collider(neighbor, this.solids);
      this.physics.add.overlap(this.player, neighbor, () => {
        this.triggerGameOver();
      });
      this.neighbors.push(neighbor);
    }

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

  createDecorations(decorations) {
    for (const decoration of decorations) {
      this.add.image(
        decoration.x,
        decoration.y,
        TEXTURE_KEYS[decoration.type]
      )
        .setOrigin(0.5, 1)
        .setDepth(decoration.type === 'house' ? -30 : -20)
        .setAlpha(0.75);
    }
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

    const levelNameKey = TRANSLATION_KEYS.level.names[this.levelId];

    this.add.text(20, 16, getPhrase(levelNameKey ?? this.level.name), textStyle)
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
      `${getPhrase(TRANSLATION_KEYS.level.tangerines)}: ` +
      `${this.collectedTangerines} / ${this.requiredTangerines}`
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
      this.scene.stop();
      this.scene.start(SCENE_KEYS.level, { levelId: this.level.nextLevelId });
      return;
    }

    if (this.level.isFinal) {
      this.scene.stop();
      this.scene.start(SCENE_KEYS.victory);
    }
  }

  triggerGameOver() {
    if (this.isRestarting || this.hasFinished) {
      return;
    }

    this.isRestarting = true;
    this.physics.pause();
    this.scene.stop();
    this.scene.start(SCENE_KEYS.gameOver, { levelId: this.levelId });
  }

  update() {
    this.player.update();

    for (const neighbor of this.neighbors) {
      neighbor.update();
    }

    if (
      !this.isRestarting &&
      this.player.y > this.level.height + LEVEL.fallMargin
    ) {
      this.triggerGameOver();
    }
  }
}
