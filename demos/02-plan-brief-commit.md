# DEMO 2 · /init, plan mode, un brief, un steer, un commit

Bloque del deck: 3 · Enseñarle. Va antes de [EJ 3](../ejercicios/03-init-y-recorta.md) y
[EJ 4](../ejercicios/04-plan-brief-steer-commit.md).

Una feature de verdad (SC-102, `conciliar()`) con el loop que tenés que tener: CLAUDE.md
recortado, plan antes de editar, un brief de outcome, un steer a mitad de camino, tests como
definición de listo, y un commit con el diff leído.

## Antes

- DEMO 1 hecha (SC-101 verde) o `npm test` verde de alguna forma.
- Rama de trabajo: `git checkout -b feat/curso` (main queda limpio).
- `claude` en la raíz. Arrancás en **plan**; pasás a **acceptEdits** para implementar.

## Pasos

1. `/init`. Aceptá solo tres mejoras al CLAUDE.md: timezone `America/La_Paz` para la caja
   diaria · "don't change the stack" · "run npm test after any change in pagos". Sacá frases vacías.
2. `Shift+Tab` hasta **plan**. Pegá el **Brief A** (abajo).
3. PAUSA: leé el plan. Tres checks sí/no: ¿toca solo pagos + tests? ¿listo = `npm test`? ¿cambia
   arquitectura? Aprobá si tiene 8 pasos o menos.
4. Pasá a **acceptEdits**. A los 2-3 pasos, pegá el **Steer S1** (sala senior: S2).
5. `npm test` verde · `git diff` · commit con el mensaje que propone el agente, con tu OK.
   **Sin push.**

## Prompt exacto

Brief A (en plan mode):

```
GOAL
Add conciliar() to sur-caja so accounting can tell if a payment was really collected.

SUCCESS
- conciliar(pagoId): { ok: boolean; motivo: string } in src/pagos.ts
  - ok true, motivo "pagado" when estado === "pagado"
  - ok false with motivo "pendiente" | "fallido" | "inexistente" otherwise
- tests in test/conciliar.test.ts, one test per case
- npm test green
- no stack change, no DB, no framework
- one commit on the current branch with a message that explains WHY

CONSTRAINTS
- Show the plan BEFORE editing src/
- Don't touch src/pedidos.ts
- Mark any assumption as [SUPUESTO] in the plan, not in the code

Listo = npm test green + a readable diff.
```

Steer S1 (a mitad de la implementación):

```
Stop. Don't start over.
Add one more test: a payment created and never marked paid → conciliar() returns ok false, motivo "pendiente".
Don't touch pedidos.ts. Continue.
```

Steer S2 (sala senior):

```
Stop. Extract the date comparison in marcarPagado into a testable diaLocalLaPaz() helper. No new date library. Continue.
```

## Listo =

`conciliar()` en `src/pagos.ts`, `test/conciliar.test.ts` con un test por caso, `npm test`
verde, un commit en `feat/curso` cuyo mensaje explica el porqué. `git log --oneline -1` lo muestra.

## Si te trabás

- Plan de 18 pasos: `Cortá a 6 pasos. v1 en 20 minutos.`
- Propone "migremos a Fastify + Postgres": `Stop. No cambies stack. Fix + conciliar(). Tests verdes.`
- Si pregunta de más, respondé corto y en el mismo mensaje pedile que siga.
