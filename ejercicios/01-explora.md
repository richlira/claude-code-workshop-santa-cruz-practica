# EJ 1 · Explorá el repo (básico)

Bloque del deck: 2 · Fundamentos. Viene después de [DEMO 0](../demos/00-dos-puertas.md).

Preguntale al repo sin editar nada. La lección está en qué archivos abre y en qué orden.

## Antes

- `cd sur-caja && claude`. Aceptá el trust del folder (y la revisión de hooks si la pide).
- `Shift+Tab` hasta que diga **plan**: en plan mode no puede editar aunque quiera.

## Pasos

1. Pegá el prompt.
2. Mirá qué lee antes de responder: `package.json`, `src/`, `test/`, `CLAUDE.md`.
3. Leé la respuesta: ¿nombró el archivo del bug y el test rojo?
4. `! git status` → limpio.

## Prompt exacto

```
Estamos en sur-caja, un repo de curso. No es producción.
Explorá el repo. No edites nada todavía.
Quiero en pantalla, corto:
- qué hace
- dónde está el bug más probable
- qué test está rojo y por qué
No propongas un rewrite.
```

## Listo =

Nombró `src/pagos.ts` y el test rojo de SC-101 (compara el día en UTC), y `git status` sigue limpio.

## Si te trabás

- Si en dos minutos no hay un `Read` en pantalla, mano arriba: no debuggees solo.
- Si editó algo, no estabas en plan: `git checkout -- src test` y `Shift+Tab` hasta plan.
