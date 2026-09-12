# EJ 2 · Arreglá el test (básico)

Bloque del deck: 2 · Fundamentos. Viene después de [DEMO 1](../demos/01-test-roto.md).

El test rojo es el contrato. Vos no le explicás el bug: le das el rojo y lo lee solo.

## Antes

- `Shift+Tab` hasta **acceptEdits** (edita solo, pregunta por comandos).
- `! npm test` dentro de la sesión → 1 rojo (SC-101).

## Pasos

1. Pegá el prompt y callate.
2. Mirá: `Read` del test, `Read` de `src/pagos.ts`, un `Edit`, `npm test` de nuevo.
3. Leé el diff en pantalla. **No commitees**: eso es EJ 4.

## Prompt exacto

```
npm test is failing. Figure out why and fix it.
Don't add features. Don't change the stack.
```

Si propone una librería de fechas:

```
Stop. No new libs. Fix marcarPagado only.
```

## Listo =

`npm test` con 3 verdes y el diff visible en pantalla. Sin commit.

## Si te trabás

- Si lo "arregló" borrando o debilitando el test: no lo escondas, es el mejor ejemplo del día.
  `git checkout -- test` y agregá al prompt `Don't touch test/`.
- Si no encuentra el bug: `Read test/pagos.test.ts first and explain what it expects.`
