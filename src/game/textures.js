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
  graphics.clear();

  // Cerca
  graphics.fillStyle(0x7a4a24, 1);
  graphics.fillRect(0, 0, 16, 80);
  graphics.fillStyle(0x4f2f16, 1);
  graphics.fillRect(0, 8, 16, 6);
  graphics.fillRect(0, 34, 16, 6);
  graphics.fillRect(0, 60, 16, 6);
  graphics.generateTexture(TEXTURE_KEYS.fence, 16, 80);
  graphics.clear();

  // Mandarina
  graphics.fillStyle(0xf28c28, 1);
  graphics.fillCircle(12, 14, 10);
  graphics.fillStyle(0xffb347, 1);
  graphics.fillCircle(9, 10, 4);
  graphics.fillStyle(0x3f8f3a, 1);
  graphics.fillRect(13, 2, 8, 4);
  graphics.fillStyle(0x2f6f2a, 1);
  graphics.fillRect(15, 0, 3, 4);
  graphics.generateTexture(TEXTURE_KEYS.tangerine, 24, 24);
  graphics.clear();

  // Salida bloqueada
  graphics.fillStyle(0x5f5f5f, 1);
  graphics.fillRect(0, 0, 60, 80);
  graphics.fillStyle(0x8a8a8a, 1);
  graphics.fillRect(6, 6, 48, 68);
  graphics.fillStyle(0x3a3a3a, 1);
  graphics.fillRect(24, 36, 12, 6);
  graphics.generateTexture(TEXTURE_KEYS.exitLocked, 60, 80);
  graphics.clear();

  // Salida habilitada
  graphics.fillStyle(0x1f5c25, 1);
  graphics.fillRect(0, 0, 60, 80);
  graphics.fillStyle(0x4fbf55, 1);
  graphics.fillRect(6, 6, 48, 68);
  graphics.fillStyle(0xe8f5d0, 1);
  graphics.fillRect(24, 36, 12, 6);
  graphics.generateTexture(TEXTURE_KEYS.exitOpen, 60, 80);
  graphics.clear();

  // Vecino (provisional, distinto al jugador)
  graphics.fillStyle(0x8c3f2a, 1);
  graphics.fillRect(4, 14, 20, 18);
  graphics.fillStyle(0xf2c9a0, 1);
  graphics.fillCircle(14, 9, 8);
  graphics.fillStyle(0x4a2a1a, 1);
  graphics.fillRect(4, 32, 7, 8);
  graphics.fillRect(17, 32, 7, 8);
  graphics.fillStyle(0x1a1a1a, 1);
  graphics.fillCircle(18, 8, 2);
  graphics.fillStyle(0xf5d000, 1);
  graphics.fillRect(8, 7, 4, 2);
  graphics.fillRect(16, 7, 4, 2);
  graphics.generateTexture(TEXTURE_KEYS.neighbor, 28, 40);
  graphics.clear();

  graphics.destroy();
}
