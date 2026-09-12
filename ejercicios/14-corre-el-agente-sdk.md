# EJ 14 · Corré el agente del SDK y leé el stream (avanzado)

Bloque del deck: 6 · Agent SDK. Viene después de [DEMO 7](../demos/07-triage-sdk.md).

Claude Code adentro de tu proceso. `agent/triage.ts` hace el mismo triage que EJ 12, pero con
una tool propia tipada (zod es el contrato) y un hook en código. Hoy no escribís código: leés el
stream y contás el loop.

## Antes

- `cd agent && npm install` (una vez, con red; es el único `npm install` del kit).
- Una API key de platform.claude.com: `export ANTHROPIC_API_KEY=sk-ant-...` en ESTA terminal.
  El SDK no usa el login de claude.ai. Sin key: mirá la demo y hacé pair.
- Fuera de la sesión de Claude Code.

## Pasos

1. `npm run triage` dentro de `agent/`.
2. Mirá el stream: una línea por mensaje. `system/init` (session_id, tools), `assistant` (texto y
   `→ tool …`), `user` (los resultados que ejecutó el harness), `result`.
3. Contá los `assistant` y `user`: ese es el loop. Anotá el `session_id` para el stretch de EJ 15.
4. `cat out/triage.json`.

## Prompt exacto

```
cd agent && npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run triage
cat out/triage.json
```

## Listo =

`agent/out/triage.json` con 5 objetos y la línea final con `costo`, `turnos` y `session`.

## Stretch

Abrí `agent/triage.ts` y cambiá `maxTurns: 40` por `maxTurns: 3`. ¿Con qué `subtype` termina el
`result`? Volvé a dejarlo en 40.

## Si te trabás

- "Exportá ANTHROPIC_API_KEY": la key no está en esta terminal. Tiene que ser de la Console, con crédito.
- `npm install` falla: Node < 22.18 o sin red. `_preview/demo7-sdk-transcript.md` y pair.
- Termina con `budget_exhausted` o `max_turns`: subí `maxBudgetUsd` o `maxTurns` en el código y mirá cuánto costó igual.
