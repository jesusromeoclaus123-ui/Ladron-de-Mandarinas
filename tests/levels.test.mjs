import assert from 'node:assert/strict';
import { test } from 'node:test';
import { LEVELS } from '../src/levels/index.js';
import { PLAYER, TEXTURE_KEYS } from '../src/game/constants.js';

const expectedCounts = [
  { platforms: 3, fences: 2, neighbors: 0, tangerines: 3 },
  { platforms: 7, fences: 3, neighbors: 1, tangerines: 5 },
  { platforms: 9, fences: 5, neighbors: 2, tangerines: 7 },
  { platforms: 11, fences: 6, neighbors: 3, tangerines: 8 },
  { platforms: 13, fences: 7, neighbors: 4, tangerines: 10 }
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
  const solids = [...level.ground, ...level.platforms, ...level.fences];

  test(`${id}: cantidades y progresión`, () => {
    assert.equal(level.platforms.length, expected.platforms);
    assert.equal(level.fences.length, expected.fences);
    assert.equal(neighbors.length, expected.neighbors);
    assert.equal(level.requiredTangerines, expected.tangerines);
    assert.equal(level.tangerines.length, expected.tangerines);
    assert.equal(level.nextLevelId, index === 4 ? null : `level${index + 2}`);
    assert.equal(Boolean(level.isFinal), index === 4);
  });

  test(`${id}: geometría y puntos de interés dentro del mundo`, () => {
    for (const block of solids) {
      assert.ok(block.width > 0 && block.height > 0);
      assert.ok(block.x >= 0 && block.x + block.width <= level.width);
      assert.ok(block.y >= 0 && block.y + block.height <= level.height);
    }

    for (const point of [level.playerStart, level.exit, ...level.tangerines]) {
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

  test(`${id}: patrullas sobre suelo continuo y separadas de cercas`, () => {
    for (const neighbor of neighbors) {
      assert.ok(neighbor.patrolLeft < neighbor.patrolRight);
      assert.ok(neighbor.x >= neighbor.patrolLeft && neighbor.x <= neighbor.patrolRight);
      assert.ok(level.ground.some((ground) =>
        neighbor.patrolLeft - 20 >= ground.x &&
        neighbor.patrolRight + 20 <= ground.x + ground.width &&
        Math.abs(neighbor.y + 20 - ground.y) <= 1
      ));
      assert.ok(!level.fences.some((fence) =>
        neighbor.patrolRight + 20 > fence.x &&
        neighbor.patrolLeft - 20 < fence.x + fence.width
      ));
    }
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
