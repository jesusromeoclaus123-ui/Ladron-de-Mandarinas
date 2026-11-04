import Phaser from 'phaser';
import { PLAYER, TEXTURE_KEYS } from '../game/constants.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, TEXTURE_KEYS.player);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.body.setSize(22, 38).setOffset(3, 2);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    if (!scene.anims.exists('player_walk')) {
      scene.anims.create({
        key: 'player_walk',
        frames: [
          { key: TEXTURE_KEYS.playerWalk1 },
          { key: TEXTURE_KEYS.playerWalk2 }
        ],
        frameRate: 8,
        repeat: -1
      });
    }
  }

  update() {
    const movingLeft = this.cursors.left.isDown || this.leftKey.isDown;
    const movingRight = this.cursors.right.isDown || this.rightKey.isDown;

    if (movingLeft === movingRight) {
      this.setVelocityX(0);
    } else if (movingLeft) {
      this.setVelocityX(-PLAYER.speed);
      this.setFlipX(true);
    } else {
      this.setVelocityX(PLAYER.speed);
      this.setFlipX(false);
    }

    const isGrounded = this.body.blocked.down || this.body.touching.down;

    if (isGrounded && Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.setVelocityY(PLAYER.jumpVelocity);
    }

    if (isGrounded && this.body.velocity.y >= 0 && this.body.velocity.x !== 0) {
      this.play('player_walk', true);
    } else {
      this.anims.stop();
      this.setTexture(TEXTURE_KEYS.player);
    }
  }
}
