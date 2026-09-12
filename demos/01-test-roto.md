# DEMO 1 · El test roto

Bloque del deck: 2 · Fundamentos. Va antes de [EJ 2](../ejercicios/02-arregla-el-test.md).

El loop completo en un solo prompt: leer, decidir, editar, correr tests, observar. Vos mirás el
diff; nadie commitea todavía.

## Antes

- `npm test` da 1 rojo (SC-101: creado 18:00 y pagado 22:00 en La Paz cuentan como el mismo día).
- `claude` en la raíz, permisos en **acceptEdits**.
- Corré `! npm test` dentro de la sesión primero: el rojo entra al contexto.

## Pasos

1. `! npm test`.
2. Pegá el prompt. Mirá qué archivos lee antes de tocar nada (`test/pagos.test.ts`, `src/pagos.ts`).
3. Esperado: compara el día en `America/La_Paz` (`Intl.DateTimeFormat` con `timeZone`), corre
   `npm test`, 3/3 verde.
4. Leé el diff en pantalla. **No commitees**: eso es DEMO 2.

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

`npm test` 3/3 verde, un diff chico en `src/pagos.ts`, ningún test borrado ni debilitado (el
segundo test de SC-101 existe justamente para que "arreglar" borrando el check no pase).

## Si te trabás

- Si "arregló" el test tocando `test/`, ese es el mejor ejemplo del día: `git checkout -- test` y
  agregá al prompt "Don't touch test/".
- Si no encuentra el bug, pedile `Read test/pagos.test.ts first and explain what it expects`.
