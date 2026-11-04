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

- **Vecino:** Aparece en los niveles 2, 3, 4 y 5. Patrulla horizontalmente entre **dos coordenadas definidas** en los datos del nivel, sin perseguir al jugador ni atacar. Cualquier contacto con el protagonista provoca la derrota. Debe permanecer dentro de su zona segura de patrullaje.
- **Obstáculos:** Se utilizarán suelo, plataformas y algunas cercas con colisión. Los pozos serán **huecos reales entre plataformas** y la detección de caída activa la derrota. Los árboles y otros elementos decorativos **no tendrán colisión**.
- **Construcción:** Los cinco niveles se construyen a partir de **objetos y datos de configuración** (JSON/objetos JS), **sin Tilemaps** en esta etapa, priorizando la reutilización con la misma lógica para todos.

## 5. Niveles y progresión

El juego completo tiene **cinco niveles** con dificultad progresiva, todos jugables.

| Nivel | Nombre | Objetivo y desafío |
| --- | --- | --- |
| 1 | La entrada al patio | Recolectar **3 mandarinas**. Aprender a moverse, saltar, superar obstáculos sencillos y llegar a la salida. |
| 2 | Cuidado con el vecino | Recolectar **5 mandarinas**. Recorrer un escenario con más obstáculos y evitar al vecino que patrulla. |
| 3 | Entre las cercas | Recolectar **7 mandarinas**. Saltos más exigentes y recorridos con espacios reducidos, cercas y dos vecinos. |
| 4 | La ronda del vecino | Recolectar **8 mandarinas**. Más zonas vigiladas por tres vecinos y obstáculos combinados. |
| 5 | La gran escapada | Recolectar **10 mandarinas** y escapar por la salida final, combinando todos los desafíos anteriores con cuatro vecinos. |

- **Nivel 1:** Sin vecino. Enfocado a aprendizaje de movimiento, salto, recolección y salida.
- **Nivel 2:** Más largo que el nivel 1, con más obstáculos, **5 mandarinas** y el vecino patrullando entre dos coordenadas.
- **Nivel 3:** Recorrido entre cercas con **7 mandarinas**, plataformas escalonadas, pozos y dos vecinos.
- **Nivel 4:** **8 mandarinas**, tres vecinos patrullando y una combinación distinta de plataformas, pozos y cercas.
- **Nivel 5:** **10 mandarinas**, cuatro vecinos y el recorrido más largo y exigente, con todas las mecánicas combinadas.

## 6. Victoria y derrota

- **Victoria del juego completo:** Se consigue al finalizar el **Nivel 5**.
- **Victoria del nivel:** Recolectar la cantidad requerida de mandarinas y llegar a la salida habilitada. Los niveles 1 a 4 avanzan automáticamente al siguiente nivel; el Nivel 5 muestra la pantalla de Victoria.
- **Pantalla de Victoria:** Mostrará el texto **«¡Escapaste con las mandarinas!»** y la opción de volver al menú principal.
- **Derrota:** Tocar a un vecino (niveles 2 a 5) o caer por un pozo provoca **Game Over**.
- **Pantalla de Game Over:** Ofrece las opciones **«Reintentar»** (reinicia completamente el nivel actual) y **«Volver al menú»**.

## 7. Flujo de juego

**Menú principal → Nivel 1 → Nivel 2 → Nivel 3 → Nivel 4 → Nivel 5 → Victoria → Menú principal**.

Si el jugador pierde en un nivel: **Game Over → Reintentar nivel / Volver al menú**.

## 8. Alcance visual y técnico

Se prioriza el funcionamiento por encima del acabado artístico. Se pueden utilizar gráficos provisionales o recursos gratuitos con licencias compatibles, manteniendo una estética coherente de patio, cercas, árboles y mandarinas. El juego completo, con sus cinco niveles, debe funcionar desde un enlace público desplegado en **Vercel**.
