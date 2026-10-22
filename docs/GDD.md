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

- **Física:** Se utilizará `Phaser.Physics.Arcade`. Movimiento horizontal con A/D o flechas, salto simple con Espacio. Sin doble salto, coyote time ni habilidades adicionales.
- Las mandarinas se recogen automáticamente al tocarlas y desaparecen del escenario.
- En pantalla se muestra un contador con la cantidad recogida y la cantidad necesaria.
- **Salida:** La salida comienza bloqueada y solo permite avanzar después de juntar la cantidad requerida. Al alcanzar la cantidad requerida de mandarinas, se habilita y **cambia de color** para indicar que es transitable.
- El personaje puede caminar y saltar sobre plataformas; las paredes y el suelo bloquean su movimiento.
- Tocar al vecino o caer en un pozo provoca la derrota y lleva a la pantalla de **Game Over**.
- Desde **Game Over** se puede reiniciar el nivel que se estaba jugando.
- No se utiliza un sistema de vidas, combate ni inventario en esta versión.
- **Reinicio:** Al reiniciar un nivel desde Game Over, se restablece completamente su estado (mandarinas, contador, posición del jugador, vecino a su posición inicial y salida bloqueada).

## 4. Enemigos y obstáculos

- **Vecino:** Aparece únicamente en el **Nivel 2**. Patrulla horizontalmente entre **dos coordenadas definidas** en los datos del nivel, sin perseguir al jugador ni atacar. Cualquier contacto con el protagonista provoca la derrota. Debe permanecer dentro de su zona segura de patrullaje.
- **Obstáculos:** Se utilizarán suelo, plataformas y algunas cercas con colisión. Los pozos serán **huecos reales entre plataformas** y la detección de caída activa la derrota. Los árboles y otros elementos decorativos **no tendrán colisión**.
- **Construcción:** Los niveles 1 y 2 se construirán a partir de **objetos y datos de configuración** (JSON/objetos JS), **sin Tilemaps** en esta etapa, priorizando la reutilización con la misma lógica para ambos.

## 5. Niveles y progresión

El juego completo está pensado para **cinco niveles** con dificultad progresiva. La **preentrega** incluirá los **niveles 1 y 2 completamente jugables**, con el ciclo de partida cerrado.

| Nivel | Nombre | Objetivo y desafío |
| --- | --- | --- |
| 1 | La entrada al patio | Recolectar **3 mandarinas**. Aprender a moverse, saltar, superar obstáculos sencillos y llegar a la salida. |
| 2 | Cuidado con el vecino | Recolectar **5 mandarinas**. Recorrer un escenario con más obstáculos y evitar al vecino que patrulla. |
| 3 | Entre las cercas | Recolectar **6 mandarinas**. Saltos más exigentes y recorridos con espacios reducidos. **Planificado para después de la preentrega.** |
| 4 | La ronda del vecino | Recolectar **8 mandarinas**. Más zonas vigiladas y obstáculos combinados. **Planificado para después de la preentrega.** |
| 5 | La gran escapada | Recolectar **10 mandarinas** y escapar por la salida final, combinando todos los desafíos anteriores. **Planificado para después de la preentrega.** |

- **Nivel 1:** Sin vecino. Enfocado a aprendizaje de movimiento, salto, recolección y salida.
- **Nivel 2:** Más largo que el nivel 1, con más obstáculos, **5 mandarinas** y el vecino patrullando entre dos coordenadas.

## 6. Victoria y derrota

- **Victoria del juego completo:** Se conseguirá al finalizar el **nivel 5**. Para la **preentrega**, la pantalla de victoria aparecerá al completar el **nivel 2**.
- **Victoria del nivel:** Recolectar la cantidad requerida de mandarinas y llegar a la salida habilitada. Nivel 1 → Nivel 2 (automático). Nivel 2 → Pantalla de Victoria.
- **Pantalla de Victoria:** Mostrará el texto **«¡Escapaste con las mandarinas!»** y la opción de volver al menú principal.
- **Derrota:** Tocar al vecino (solo Nivel 2) o caer por un pozo provoca **Game Over**.
- **Pantalla de Game Over:** Ofrece las opciones **«Reintentar»** (reinicia completamente el nivel actual) y **«Volver al menú»**.
- **Alcance preentrega:** Completar el Nivel 2 muestra la pantalla de Victoria tal como se indica arriba.

## 7. Flujo de juego

**Menú principal → Nivel 1 → Nivel 2 → Victoria → Menú principal**.

Si el jugador pierde en un nivel: **Game Over → Reintentar nivel / Volver al menú**.

## 8. Alcance visual y técnico

Para la preentrega se prioriza el funcionamiento por encima del acabado artístico. Se pueden utilizar gráficos provisionales o recursos gratuitos con licencias compatibles, manteniendo una estética coherente de patio, cercas, árboles y mandarinas. El juego debe funcionar desde un enlace público desplegado en **Vercel**.
