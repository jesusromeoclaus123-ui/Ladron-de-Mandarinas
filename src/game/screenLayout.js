import { TEXTURE_KEYS } from './constants.js';

// Composiciones de 800 × 600 con las texturas originales, sin cuerpos físicos.
export function createScreenBackdrop(scene, variant) {
  const dark = variant === 'gameOver';
  const festive = variant === 'victory';
  scene.cameras.main.setBackgroundColor(dark ? 0x142832 : 0xc5e4da);
  const graphics = scene.add.graphics();

  graphics.fillStyle(dark ? 0x1d3740 : 0xe2efcf);
  graphics.fillEllipse(160, 420, 700, 310);
  graphics.fillStyle(dark ? 0x25443f : 0x93b782);
  graphics.fillEllipse(690, 470, 860, 320);
  graphics.fillStyle(dark ? 0xc8d9be : 0xffdf8c);
  graphics.fillCircle(686, 82, dark ? 27 : 49);

  if (dark) {
    graphics.fillStyle(0x142832);
    graphics.fillCircle(675, 70, 26);
    graphics.fillStyle(0xb9c9bc, 0.65);
    for (const [x, y] of [[67, 64], [174, 38], [298, 62], [580, 40], [754, 172]]) {
      graphics.fillCircle(x, y, 2);
    }
  } else {
    graphics.fillStyle(0xffffff, 0.4);
    graphics.fillEllipse(102, 80, 160, 34);
    graphics.fillEllipse(572, 42, 142, 28);
  }

  // Cerca de fondo: deliberadamente decorativa, fuera de las acciones.
  graphics.fillStyle(dark ? 0x334637 : 0xa98a5e);
  graphics.fillRect(0, 458, 800, 12);
  graphics.fillRect(0, 500, 800, 10);
  for (let x = 12; x < 800; x += 44) {
    graphics.fillRoundedRect(x, 433, 17, 119, 4);
  }
  graphics.fillStyle(dark ? 0x203b31 : 0x648654);
  graphics.fillRect(0, 548, 800, 52);
  graphics.fillStyle(dark ? 0x192e29 : 0x527346);
  graphics.fillEllipse(400, 596, 1000, 57);

  scene.add.image(42, 553, TEXTURE_KEYS.tree).setOrigin(0.5, 1)
    .setScale(1.3).setTint(dark ? 0x526e68 : 0xffffff);
  scene.add.image(765, 558, TEXTURE_KEYS.tree).setOrigin(0.5, 1)
    .setScale(1.6).setTint(dark ? 0x526e68 : 0xffffff);
  scene.add.image(83, 567, TEXTURE_KEYS.bush).setScale(1.4)
    .setTint(dark ? 0x526e68 : 0xffffff);
  scene.add.image(704, 570, TEXTURE_KEYS.bush).setScale(1.5)
    .setTint(dark ? 0x526e68 : 0xffffff);

  const panel = scene.add.graphics();
  const x = dark ? 100 : 64;
  const y = dark ? 86 : 66;
  const width = dark ? 600 : 672;
  const height = dark ? 422 : 464;
  panel.fillStyle(0x10251e, 0.23);
  panel.fillRoundedRect(x + 7, y + 10, width, height, 28);
  panel.fillStyle(dark ? 0x20333b : 0xfff6df, 0.98);
  panel.fillRoundedRect(x, y, width, height, 28);
  panel.lineStyle(2, dark ? 0x667b70 : 0xc7ba8a);
  panel.strokeRoundedRect(x + 7, y + 7, width - 14, height - 14, 22);

  if (festive) {
    const celebration = scene.add.graphics();
    const colors = [0xf29a38, 0x5e995d, 0xe7be54, 0x7ca8b5];
    celebration.lineStyle(2, 0x6b7855);
    celebration.lineBetween(58, 26, 742, 26);
    for (let index = 0; index < 12; index++) {
      const flagX = 72 + index * 57;
      celebration.fillStyle(colors[index % colors.length]);
      celebration.fillTriangle(flagX, 27, flagX + 33, 27, flagX + 16, 55);
    }
    for (let index = 0; index < 22; index++) {
      const confettiX = index % 2 === 0 ? 88 + (index * 13) % 94 : 620 + (index * 17) % 90;
      const confettiY = 108 + (index * 43) % 293;
      celebration.fillStyle(colors[index % colors.length], 0.7);
      celebration.fillRect(confettiX, confettiY, 5, 10);
    }
    scene.tweens.add({ targets: celebration, y: 5, duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  } else if (!dark) {
    panel.lineStyle(2, 0xd9cfaa);
    panel.lineBetween(270, 363, 530, 363);
    panel.lineBetween(140, 446, 660, 446);
  }

  if (!dark) {
    for (const flowerX of [28, 158, 635, 780]) {
      scene.add.image(flowerX, 574, TEXTURE_KEYS.flowers).setScale(1.3);
    }
  }
}

export function createScreenButton(scene, x, y, label, callback, options = {}) {
  const { width = 280, height = 60, fontSize = 26, secondary = false, dark = false } = options;
  const button = scene.add.container(x, y);
  const graphics = scene.add.graphics();
  const text = scene.add.text(0, -2, label, {
    fontFamily: 'Arial, sans-serif',
    fontSize: `${fontSize}px`,
    fontStyle: 'bold',
    color: dark || !secondary ? '#fff9e9' : '#34523b',
    align: 'center'
  }).setOrigin(0.5);
  button.add([graphics, text]);
  button.setSize(width, height).setInteractive({ useHandCursor: true });

  let selected = false;
  let hovered = false;
  let pressed = false;
  const redraw = () => {
    const primary = !secondary || selected;
    const fill = primary ? (hovered ? 0xeaa047 : 0xd58126)
      : dark ? (hovered ? 0x3d5359 : 0x2b424a)
        : (hovered ? 0xe4e9ce : 0xeee8d0);
    graphics.clear();
    graphics.fillStyle(primary ? 0x91511f : dark ? 0x14262c : 0xb5ba97);
    graphics.fillRoundedRect(-width / 2, -height / 2 + 5, width, height, 13);
    graphics.fillStyle(fill);
    graphics.fillRoundedRect(-width / 2, -height / 2, width, height - 2, 13);
    graphics.lineStyle(2, primary ? 0xffcf82 : dark ? 0x758a80 : 0xa6b18b);
    graphics.strokeRoundedRect(-width / 2 + 3, -height / 2 + 3, width - 6, height - 8, 10);
    text.setColor(primary || dark ? '#fff9e9' : '#34523b');
  };

  button.on('pointerover', () => { hovered = true; redraw(); });
  button.on('pointerout', () => { hovered = false; pressed = false; button.setScale(1); redraw(); });
  button.on('pointerdown', () => { pressed = true; button.setScale(0.97); });
  button.on('pointerup', () => {
    if (!pressed) {
      return;
    }
    pressed = false;
    button.setScale(1);
    callback();
  });
  redraw();

  return {
    button,
    text,
    setSelected(value) { selected = value; redraw(); }
  };
}
