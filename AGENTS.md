# AGENTS.md — Ladrón de Mandarinas

Instrucciones para agentes de IA y personas que colaboran en este repositorio.

## 1. Idioma

- Responder **siempre en español**: chat, explicaciones, mensajes de commit, mensajes de PR y documentación.
- Comentarios de código y textos visibles del juego en español.
- Los identificadores de código (clases, funciones, variables) se escriben en inglés, siguiendo la convención del motor y del framework.

## 2. Fuente de verdad: el GDD

- **Antes de implementar cualquier funcionalidad, leer `docs/GDD.md`** y contrastar la tarea con lo que el GDD define: mecánicas, controles, reglas de victoria/derrota, flujo de niveles y alcance de la preentrega.
- El GDD manda sobre la implementación. Si una petición del usuario contradice el GDD, **preguntar**; no resolver el conflicto por cuenta propia.
- **No modificar `docs/GDD.md` de forma automática.** Si una implementación requiere cambiar una regla del GDD, **consultar y esperar autorización explícita** antes de editar el documento.
- Respetar el alcance del GDD: la preentrega cubre los **niveles 1 y 2**. No implementar niveles 3–5, vidas, combate ni inventario salvo pedido explícito.

## 3. Preguntar ante ambigüedades

- Ante dudas sobre reglas de juego, alcance, valores de diseño, arquitectura o estructura de carpetas: **preguntar** en lugar de suponer.
- Consultar antes de escribir una implementación grande o difícil de revertir.
- **No inventar** rutas, archivos, assets, librerías, comandos ni endpoints. Antes de referenciar algo en código o documentación, verificar que existe en el repositorio.

## 4. Stack y estructura

- **Stack acordado:** Vite + **Phaser 4** en JavaScript con módulos ES. El juego corre en el navegador; el build de producción es estático y se despliega en **Vercel**.
- **Antes de crear el proyecto o de agregar dependencias, verificar cuál es la última versión estable disponible** consultando el registro oficial (`npm view <paquete> version`) o la documentación oficial del paquete. No asumir números de versión de memoria ni copiar versiones de tutoriales o documentación desactualizada.
- Layout acordado para el proyecto. Los archivos se crean a medida que se implementen las funcionalidades:

```text
src/
  game/        arranque del juego, configuración y constantes
  scenes/      escenas de Phaser (menú, nivel, Game Over, victoria)
  entities/    clases de gameplay (Jugador, Mandarina, Vecino, Pozo, Salida)
  levels/      datos y construcción de los niveles
public/        recursos estáticos: sprites, imágenes y audio
docs/          documentación; docs/GDD.md es la fuente de verdad
```

- `docs/GDD.md` es el único archivo de documentación que existe hoy. No referenciar rutas de `src/` ni de `public/` como si ya tuvieran contenido.

## 5. Código

- **Programación orientada a objetos cuando corresponda.** Modelar el juego con clases y responsabilidades separadas en lugar de lógica procedural monolítica:
  - Las escenas extienden `Phaser.Scene`.
  - Las entidades extienden la clase de Phaser que corresponda (`Phaser.GameObjects.Sprite`, `Phaser.Physics.Arcade.Sprite`, etc.) y concentran su propio comportamiento.
  - No imponer POO donde no aporta: funciones puras y utilidades quedan como funciones.
- Priorizar **código reutilizable**. Los niveles son **datos, no código**: los niveles 1 a 5 se construyen con una misma parametrización, sin duplicar lógica.
- **Evitar complejidad innecesaria.** La solución más simple que cumpla el GDD. Sin abstracciones prematuras, sin dependencias que no justifiquen su costo, sin capas de indirección por hermosura.
- Respetar el estilo del código existente (indentación, comillas, punto y coma, naming) al modificar archivos.
- Nada de código muerto, TODOs olvidados ni funcionalidad "por las dudas": si no se usa, no se escribe.

## 6. Recursos gráficos y de audio

- **Consultar antes de incorporar recursos gráficos**: describir qué se necesita, de qué tamaño y para qué, y esperar aprobación explícita.
- Solo usar recursos **libres con licencia compatible** (CC0, CC-BY, dominio público) o gráficos provisionales. Registrar **fuente y licencia** de cada recurso en `docs/`.
- Mantener la coherencia estética definida en el GDD: patio, cercas, árboles, mandarinas.
- El GDD prioriza el funcionamiento sobre el acabado artístico: ante la duda, elegir la opción simple.

## 7. Flujo de trabajo con Git

- `main` es la rama estable. El trabajo diario se hace en ramas de desarrollo; **nunca commitear ni push directo a `main`**.
- **Única excepción:** se permite un commit inicial en `main` para establecer la base del proyecto. A partir de ese commit, toda implementación se realiza en ramas `feature/*` o `fix/*`.
- Convención de ramas: `feature/<descripcion>`, `fix/<descripcion>`, `chore/<descripcion>`. Cada rama parte de `main` actualizado y contiene un único objetivo.
- **Verificar antes de commitear**: correr el build, las pruebas existentes y una comprobación manual de la funcionalidad tocada. Revisar `git status` y `git diff` para confirmar que no se cuelan archivos ajenos al cambio.
- **Pedir autorización explícita antes de `git commit` y antes de `git push`**, por separado. Autorizar un commit no autoriza el push, ni viceversa.
- No reescribir historia publicada (`rebase`, `reset --hard`, `force-push`) sin autorización explícita.

## 8. Preservación de archivos

- **No borrar, sobrescribir, renombrar ni mover archivos existentes sin autorización explícita.** Ante la duda, preferí crear un archivo nuevo.
- No eliminar ni vaciar `docs/GDD.md`; es la fuente de verdad del proyecto.
- No modificar a mano archivos generados o de terceros: `package-lock.json`, `node_modules/`, builds de producción.
- No usar comandos destructivos (`git clean`, `git reset --hard`, `git checkout --`) sobre cambios ajenos o trabajo sin commitear.
- Si un cambio requiere tocar un archivo existente, mostrar el diff propuesto antes de aplicarlo.

## 9. Verificación

- Antes de dar por terminada una tarea, comprobarla de verdad: `npm run build` debe pasar y hay que recorrer en `npm run dev` el flujo afectado (menú → nivel → victoria, y derrota → Game Over → reintento).
- Reportar qué se verificó y qué quedó sin verificar. No declarar una tarea como completa si la verificación falló.
