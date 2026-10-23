import { TEXTURE_KEYS } from './constants.js';

export function createPlaceholderTextures(scene) {
  const graphics = scene.add.graphics();

  // Jugador
  graphics.fillStyle(0x2f6fbf, 1);
  graphics.fillRect(4, 14, 20, 18);
  graphics.fillStyle(0xf2c9a0, 1);
  graphics.fillCircle(14, 9, 8);
  graphics.fillStyle(0x3a2a1a, 1);
  graphics.fillRect(4, 32, 7, 8);
  graphics.fillRect(17, 32, 7, 8);
  graphics.fillStyle(0x1a1a1a, 1);
  graphics.fillCircle(18, 8, 2);
  graphics.generateTexture(TEXTURE_KEYS.player, 28, 40);
  graphics.clear();

  // Suelo
  graphics.fillStyle(0x6b4a2b, 1);
  graphics.fillRect(0, 0, 40, 40);
  graphics.fillStyle(0x3f8f3a, 1);
  graphics.fillRect(0, 0, 40, 7);
  graphics.fillStyle(0x4f3520, 1);
  graphics.fillRect(0, 18, 40, 3);
  graphics.generateTexture(TEXTURE_KEYS.ground, 40, 40);
  graphics.clear();

  // Plataforma
  graphics.fillStyle(0x8b5e3c, 1);
  graphics.fillRect(0, 0, 40, 24);
  graphics.fillStyle(0x4f9e45, 1);
  graphics.fillRect(0, 0, 40, 5);
  graphics.generateTexture(TEXTURE_KEYS.platform, 40, 24);
  graphics.destroy();
}
