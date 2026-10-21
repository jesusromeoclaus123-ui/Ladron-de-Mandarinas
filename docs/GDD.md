# GDD — Ladrón de Mandarinas

## 1. Concepto

**Ladrón de Mandarinas** es un videojuego de plataformas 2D, de tono humorístico, en el que un chico entra al patio de su vecino para llevarse mandarinas. Debe recorrer distintos sectores del terreno, recolectar las frutas necesarias y llegar a la salida sin caer en los obstáculos ni ser atrapado.

## 2. Género y plataforma

- **Género:** plataformas 2D / aventura.
- **Plataforma:** navegador web en computadora.
- **Motor:** Phaser con JavaScript.

## 3. Objetivo y mecánica principal

La mecánica principal es **recolectar mandarinas mientras se avanza por escenarios de plataformas**. Para completar un nivel, el jugador debe juntar todas las mandarinas requeridas y alcanzar la salida.

### Controles

- **A / flecha izquierda:** moverse a la izquierda.
- **D / flecha derecha:** moverse a la derecha.
- **Espacio:** saltar.

### Reglas de juego

- Las mandarinas se recogen automáticamente al tocarlas y desaparecen del escenario.
- En pantalla se muestra un contador con la cantidad recogida y la cantidad necesaria.
- La salida permite avanzar solo después de juntar la cantidad requerida.
- El personaje puede caminar y saltar sobre plataformas; las paredes y el suelo bloquean su movimiento.
- Tocar al vecino o caer en un pozo provoca la derrota y lleva a la pantalla de **Game Over**.
- Desde **Game Over** se puede reiniciar el nivel que se estaba jugando.
- No se utiliza un sistema de vidas, combate ni inventario en esta versión.

## 4. Enemigos y obstáculos

- **Vecino:** patrulla horizontalmente una zona fija y cambia de dirección en los extremos de su recorrido. El jugador debe evitar tocarlo.
- **Obstáculos:** pozos, cercas y plataformas colocadas para exigir saltos y recorridos cada vez más difíciles.

## 5. Niveles y progresión

El juego completo está pensado para **cinco niveles** con dificultad progresiva. La **preentrega** incluirá los **niveles 1 y 2 completamente jugables**, con el ciclo de partida cerrado.

| Nivel | Nombre | Objetivo y desafío |
| --- | --- | --- |
| 1 | La entrada al patio | Recolectar **3 mandarinas**. Aprender a moverse, saltar, superar obstáculos sencillos y llegar a la salida. |
| 2 | Cuidado con el vecino | Recolectar **5 mandarinas**. Recorrer un escenario con más obstáculos y evitar al vecino que patrulla. |
| 3 | Entre las cercas | Recolectar **6 mandarinas**. Saltos más exigentes y recorridos con espacios reducidos. **Planificado para después de la preentrega.** |
| 4 | La ronda del vecino | Recolectar **8 mandarinas**. Más zonas vigiladas y obstáculos combinados. **Planificado para después de la preentrega.** |
| 5 | La gran escapada | Recolectar **10 mandarinas** y escapar por la salida final, combinando todos los desafíos anteriores. **Planificado para después de la preentrega.** |

## 6. Victoria y derrota

- **Victoria del nivel:** recolectar la cantidad requerida de mandarinas y llegar a la salida. Si hay un nivel siguiente implementado, se carga automáticamente.
- **Victoria de la preentrega:** completar el nivel 2 muestra una pantalla de victoria con opción de volver al menú. En la versión final, esa pantalla aparecerá al completar el nivel 5.
- **Derrota:** tocar al vecino o caer en un pozo muestra **Game Over**, desde donde se puede reintentar el mismo nivel o volver al menú.

## 7. Flujo de juego

**Menú principal → Nivel 1 → Nivel 2 → Victoria → Menú principal**.

Si el jugador pierde en un nivel: **Game Over → Reintentar nivel / Volver al menú**.

## 8. Alcance visual y técnico

Para la preentrega se prioriza el funcionamiento por encima del acabado artístico. Se pueden utilizar gráficos provisionales o recursos gratuitos con licencias compatibles, manteniendo una estética coherente de patio, cercas, árboles y mandarinas. El juego debe funcionar desde un enlace público desplegado en **Vercel**.
