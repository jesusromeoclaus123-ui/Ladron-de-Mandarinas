import { TEXTURE_KEYS } from './constants.js';

export function createSceneryTextures(scene) {
  const graphics = scene.add.graphics();

  // Casa de fondo: colores suaves y sin superficies de aspecto transitable.
  graphics.fillStyle(0xb5a18b, 1);
  graphics.fillRect(230, 24, 24, 64);
  graphics.fillStyle(0xe0cba9, 1);
  graphics.fillRect(40, 80, 240, 160);
  graphics.fillStyle(0xa56d59, 1);
  graphics.fillTriangle(16, 88, 160, 8, 304, 88);
  graphics.fillStyle(0x967c66, 1);
  graphics.fillRect(138, 160, 44, 80);
  graphics.fillStyle(0x94b9c5, 1);
  graphics.fillRect(70, 120, 44, 48);
  graphics.fillRect(206, 120, 44, 48);
  graphics.fillStyle(0xe9ddc5, 1);
  graphics.fillRect(90, 120, 4, 48);
  graphics.fillRect(226, 120, 4, 48);
  graphics.fillRect(70, 142, 44, 4);
  graphics.fillRect(206, 142, 44, 4);
  graphics.fillStyle(0xe9cf8b, 1);
  graphics.fillCircle(172, 202, 3);
  graphics.generateTexture(TEXTURE_KEYS.house, 320, 240);
  graphics.clear();

  // Árbol ornamental, sin frutas que puedan confundirse con las recolectables.
  graphics.fillStyle(0x967b5d, 1);
  graphics.fillRect(56, 82, 16, 110);
  graphics.fillRect(40, 106, 32, 10);
  graphics.fillStyle(0x719961, 1);
  graphics.fillCircle(64, 52, 46);
  graphics.fillCircle(35, 88, 33);
  graphics.fillCircle(94, 84, 32);
  graphics.fillStyle(0x88aa70, 1);
  graphics.fillCircle(48, 43, 25);
  graphics.generateTexture(TEXTURE_KEYS.tree, 128, 192);
  graphics.clear();

  // Arbusto de contorno redondeado, distinto del borde recto de las plataformas.
  graphics.fillStyle(0x77985d, 1);
  graphics.fillCircle(24, 42, 22);
  graphics.fillCircle(48, 30, 26);
  graphics.fillCircle(74, 44, 20);
  graphics.fillStyle(0x90ab70, 1);
  graphics.fillCircle(38, 29, 12);
  graphics.generateTexture(TEXTURE_KEYS.bush, 96, 64);
  graphics.clear();

  // Detalles bajos: permanecen detrás de todos los elementos jugables.
  graphics.fillStyle(0x77985d, 1);
  graphics.fillTriangle(2, 16, 6, 3, 11, 16);
  graphics.fillTriangle(10, 16, 15, 0, 20, 16);
  graphics.fillTriangle(19, 16, 27, 4, 30, 16);
  graphics.generateTexture(TEXTURE_KEYS.grass, 32, 16);
  graphics.clear();

  graphics.fillStyle(0x77985d, 1);
  graphics.fillRect(7, 7, 2, 9);
  graphics.fillRect(23, 8, 2, 8);
  graphics.fillStyle(0xf6e7cb, 1);
  graphics.fillCircle(8, 5, 4);
  graphics.fillCircle(24, 6, 4);
  graphics.fillStyle(0xc1a76d, 1);
  graphics.fillCircle(8, 5, 1.5);
  graphics.fillCircle(24, 6, 1.5);
  graphics.generateTexture(TEXTURE_KEYS.flowers, 32, 16);

  graphics.destroy();
}
