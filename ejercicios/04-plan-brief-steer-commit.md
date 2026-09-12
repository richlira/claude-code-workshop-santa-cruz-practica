# EJ 4 · Plan mode, Brief A, steer, commit (intermedio)

Bloque del deck: 3 · Enseñarle. Viene después de [DEMO 2](../demos/02-plan-brief-commit.md).

El ejercicio central del día: una feature de verdad (SC-102, `conciliar()`) con el loop
completo. El plan se lee. El diff se lee. El mensaje lo escribe él, el OK lo das vos.

## Antes

- EJ 2 hecho (SC-101 verde) y EJ 3 hecho (CLAUDE.md recortado).
- Rama de trabajo: `git checkout -b feat/curso` (main queda limpio).
- `Shift+Tab` hasta **plan**.

## Pasos

1. Pegá el **Brief A** en plan mode.
2. PAUSA: leé el plan. ¿Tiene 8 pasos o menos? ¿Toca solo `pagos` + tests? ¿Listo = `npm test`?
3. Aprobá → `Shift+Tab` hasta **acceptEdits**.
4. A los 2-3 pasos, pegá el **Steer S1**. Quien termina antes: Steer S2.
5. `npm test` verde · `git diff` · commit con el mensaje que propone. **Sin push.**

## Prompt exacto

Brief A:

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

Steer S2 (si terminaste antes):

```
Stop. Extract the date comparison in marcarPagado into a testable diaLocalLaPaz() helper. No new date library. Continue.
```

## Listo =

Plan de 8 pasos o menos aprobado, `npm test` verde, un commit en `feat/curso` con `conciliar()`,
`test/conciliar.test.ts` y un mensaje que explica el porqué. Sin push.

## Si te trabás

- Plan de 18 pasos: `Cortá a 6 pasos. v1 en 20 minutos.`
- "Migremos a Fastify + Postgres": `Stop. No cambies stack. Fix + conciliar(). Tests verdes.`
- Si pregunta de más: `Repo de curso, no producción. No agregues DB, auth, Docker ni frontend. Listo = npm test en verde y un commit en la rama actual.`
- Lo que corregiste dos veces va a `CLAUDE.md`, no al chat.
