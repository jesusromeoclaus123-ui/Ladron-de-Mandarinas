import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.text(width / 2, height / 2, 'Ladrón de Mandarinas', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
