# Recursos gráficos provisionales

Los recursos de esta mejora son dibujos originales creados para este proyecto mediante `Phaser.Graphics`. No se descargaron imágenes, no se usaron recursos de terceros y no necesitan atribución externa. Se distribuyen bajo la licencia ISC declarada en `package.json`, igual que el código del proyecto.

| Recurso | Tamaño en píxeles | Fuente | Uso |
| --- | --- | --- | --- |
| Casa | 320 × 240 | `src/game/sceneryTextures.js` | Fondo del patio. |
| Árbol | 128 × 192 | `src/game/sceneryTextures.js` | Vegetación ornamental sin frutas recolectables. |
| Arbusto | 96 × 64 | `src/game/sceneryTextures.js` | Vegetación baja de contorno redondeado. |
| Pasto | 32 × 16 | `src/game/sceneryTextures.js` | Detalles cerca del suelo. |
| Flores | 32 × 16 | `src/game/sceneryTextures.js` | Detalles claros, distintos de las mandarinas. |
| Paso 1 del protagonista | 28 × 40 | `src/game/textures.js` | Primer fotograma de movimiento. |
| Paso 2 del protagonista | 28 × 40 | `src/game/textures.js` | Segundo fotograma de movimiento. |

## Integración

- Las posiciones se definen en `decorations` dentro de los cinco archivos de `src/levels/`.
- Son imágenes sin cuerpo físico, con origen inferior central.
- La casa usa profundidad −30; la vegetación usa −20. Todos los elementos jugables quedan delante.
- Se dibujan con opacidad 0,75 para distinguirlas de los obstáculos y las frutas.
- No modifican plataformas, cercas, pozos, patrullas ni reglas de juego.
- El ciclo del protagonista se reproduce a 8 fotogramas por segundo únicamente al caminar por el suelo. Reposo, salto y caída conservan su textura original.

Estos gráficos son provisionales y conservan el estilo geométrico simple del juego.

## Composiciones de pantallas finales

- Fuente: `src/game/screenLayout.js`, dibujos originales con `Phaser.Graphics`, bajo la licencia ISC del proyecto.
- Tamaño lógico: 800 × 600 píxeles. Incluyen colinas, cielo, cerca decorativa, paneles y botones; Victoria añade banderines y confeti.
- Se reutilizan las texturas existentes del árbol, arbusto, flores, mandarina, vecino y protagonista. No se incorporan imágenes externas ni sprites nuevos.
- Todos estos elementos son decorativos, sin cuerpos físicos. Las animaciones pertenecen a cada escena y se eliminan al salir de ella.
