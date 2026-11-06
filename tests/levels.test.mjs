import assert from 'node:assert/strict';
import { test } from 'node:test';
import { LEVELS } from '../src/levels/index.js';
import { PLAYER, TEXTURE_KEYS } from '../src/game/constants.js';

const expectedCounts = [
  { platforms: 3, fences: 2, neighbors: 0, elevated: 0, tangerines: 3 },
  { platforms: 7, fences: 3, neighbors: 1, elevated: 0, tangerines: 5 },
  { platforms: 11, fences: 7, neighbors: 3, elevated: 1, tangerines: 7 },
  { platforms: 12, fences: 9, neighbors: 4, elevated: 2, tangerines: 8 },
  { platforms: 14, fences: 11, neighbors: 5, elevated: 2, tangerines: 10 }
];
const decorationSizes = {
  house: [320, 240],
  tree: [128, 192],
  bush: [96, 64],
  grass: [32, 16],
  flowers: [32, 16]
};

test('Se conservan la velocidad y el salto simple del jugador', () => {
  assert.deepEqual(PLAYER, { speed: 220, jumpVelocity: -540 });
});

for (const [index, [id, level]] of Object.entries(LEVELS).entries()) {
  const expected = expectedCounts[index];
  const neighbors = level.neighbors ?? (level.neighbor ? [level.neighbor] : []);
  const supports = [...level.ground, ...level.platforms];
  const solids = [...supports, ...level.fences];

  test(`${id}: cantidades y progresión`, () => {
    assert.equal(level.platforms.length, expected.platforms);
    assert.equal(level.fences.length, expected.fences);
    assert.equal(neighbors.length, expected.neighbors);
    assert.equal(level.requiredTangerines, expected.tangerines);
    assert.equal(level.tangerines.length, expected.tangerines);
    assert.equal(level.nextLevelId, index === 4 ? null : `level${index + 2}`);
    assert.equal(Boolean(level.isFinal), index === 4);
    if (index >= 2) {
      const previous = Object.values(LEVELS)[index - 1];
      assert.ok(level.platforms.length > previous.platforms.length);
      assert.ok(level.fences.length > previous.fences.length);
      assert.ok(level.width > previous.width);
    }
  });

  test(`${id}: geometría y puntos de interés dentro del mundo`, () => {
    for (const block of solids) {
      assert.ok(block.width > 0 && block.height > 0);
      assert.ok(block.x >= 0 && block.x + block.width <= level.width);
      assert.ok(block.y >= 0 && block.y + block.height <= level.height);
    }

    for (const point of [level.playerStart, level.exit, ...level.tangerines, ...neighbors]) {
      assert.ok(point.x >= 0 && point.x <= level.width);
      assert.ok(point.y >= 0 && point.y <= level.height);
    }

    for (const tangerine of level.tangerines) {
      assert.ok(!solids.some((block) =>
        tangerine.x + 12 > block.x && tangerine.x - 12 < block.x + block.width &&
        tangerine.y + 12 > block.y && tangerine.y - 12 < block.y + block.height
      ), 'La mandarina no debe quedar incrustada en un sólido');
    }
  });

  test(`${id}: patrullas apoyadas y libres de obstáculos a su altura`, () => {
    let elevated = 0;
    for (const neighbor of neighbors) {
      assert.ok(neighbor.patrolLeft < neighbor.patrolRight);
      assert.ok(neighbor.x >= neighbor.patrolLeft && neighbor.x <= neighbor.patrolRight);
      const support = supports.find((block) =>
        neighbor.patrolLeft - 20 >= block.x &&
        neighbor.patrolRight + 20 <= block.x + block.width &&
        Math.abs(neighbor.y + 20 - block.y) <= 1
      );
      assert.ok(support, 'Toda la patrulla debe tener apoyo continuo bajo los pies');
      assert.ok(!solids.some((block) =>
        neighbor.patrolRight + 20 > block.x &&
        neighbor.patrolLeft - 20 < block.x + block.width &&
        neighbor.y + 20 > block.y && neighbor.y - 20 < block.y + block.height
      ), 'La patrulla no debe atravesar sólidos a su misma altura');

      if (level.platforms.includes(support)) {
        elevated++;
        assert.equal(neighbor.y + 20, support.y, 'El vecino elevado debe apoyar exactamente los pies');
        assert.ok(neighbor.patrolLeft - support.x >= 70, 'Debe haber espacio seguro de espera a la izquierda');
        assert.ok(support.x + support.width - neighbor.patrolRight >= 70, 'Debe haber espacio seguro de espera a la derecha');
        assert.ok(neighbor.patrolRight - neighbor.patrolLeft <= 150, 'La patrulla elevada debe poder superarse con salto simple');
      }
    }
    assert.equal(elevated, expected.elevated);
  });

  test(`${id}: decoración válida y distinta de las texturas jugables`, () => {
    assert.ok(level.decorations.length > 0);
    assert.equal(level.decorations.filter((item) => item.type === 'house').length, 1);

    for (const decoration of level.decorations) {
      assert.ok(Object.hasOwn(decorationSizes, decoration.type));
      assert.ok(Object.hasOwn(TEXTURE_KEYS, decoration.type));
      const [width, height] = decorationSizes[decoration.type];
      assert.ok(decoration.x - width / 2 >= 0);
      assert.ok(decoration.x + width / 2 <= level.width);
      assert.ok(decoration.y - height >= 0 && decoration.y <= level.height);
    }
  });
}
