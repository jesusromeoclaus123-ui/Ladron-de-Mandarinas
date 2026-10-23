import Phaser from 'phaser';
import { TEXTURE_KEYS } from '../game/constants.js';

export class Neighbor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, patrolLeft, patrolRight) {
    super(scene, x, y, TEXTURE_KEYS.neighbor);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.body.setSize(22, 38).setOffset(3, 2);
    this.setImmovable(true);
    this.body.setAllowGravity(false);
    this.setDepth(10);

    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.direction = 1;
    this.speed = 115;
    this.setVelocityX(this.speed);
    this.setFlipX(false);

    this.createAnimations(scene);
    if (scene.anims.exists('neighbor_walk')) {
      this.play('neighbor_walk');
    }
  }

  createAnimations(scene) {
    if (scene.anims.exists('neighbor_walk')) {
      return;
    }

    const frames = [];
    const frame1 = scene.add.graphics();
    frame1.fillStyle(0x8c3f2a, 1);
    frame1.fillRect(4, 14, 20, 18);
    frame1.fillStyle(0xf2c9a0, 1);
    frame1.fillCircle(14, 9, 8);
    frame1.fillStyle(0x4a2a1a, 1);
    frame1.fillRect(4, 32, 6, 8);
    frame1.fillRect(18, 32, 6, 8);
    frame1.fillStyle(0x1a1a1a, 1);
    frame1.fillCircle(18, 8, 2);
    frame1.fillStyle(0xf5d000, 1);
    frame1.fillRect(8, 7, 4, 2);
    frame1.fillRect(16, 7, 4, 2);
    frame1.generateTexture(TEXTURE_KEYS.neighbor + '_walk1', 28, 40);
    frame1.clear();
    frame1.destroy();

    const frame2 = scene.add.graphics();
    frame2.fillStyle(0x8c3f2a, 1);
    frame2.fillRect(4, 14, 20, 18);
    frame2.fillStyle(0xf2c9a0, 1);
    frame2.fillCircle(14, 9, 8);
    frame2.fillStyle(0x4a2a1a, 1);
    frame2.fillRect(6, 32, 6, 8);
    frame2.fillRect(16, 32, 6, 8);
    frame2.fillStyle(0x1a1a1a, 1);
    frame2.fillCircle(18, 8, 2);
    frame2.fillStyle(0xf5d000, 1);
    frame2.fillRect(8, 7, 4, 2);
    frame2.fillRect(16, 7, 4, 2);
    frame2.generateTexture(TEXTURE_KEYS.neighbor + '_walk2', 28, 40);
    frame2.clear();
    frame2.destroy();

    scene.anims.create({
      key: 'neighbor_walk',
      frames: [
        { key: TEXTURE_KEYS.neighbor + '_walk1' },
        { key: TEXTURE_KEYS.neighbor + '_walk2' }
      ],
      frameRate: 8,
      repeat: -1
    });
  }

  update() {
    if (this.x <= this.patrolLeft) {
      this.direction = 1;
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else if (this.x >= this.patrolRight) {
      this.direction = -1;
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    }
  }
}
