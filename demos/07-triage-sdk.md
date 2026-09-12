# DEMO 7 · El mismo triage, embebido con el Agent SDK

Bloque del deck: 6 · Agent SDK. Va antes de [EJ 14](../ejercicios/14-corre-el-agente-sdk.md) y
[EJ 15](../ejercicios/15-tus-tools-en-el-sdk.md).

Todo lo que usaste hasta acá (el loop, Read/Grep, permisos, hooks, subagents) es una librería
que se importa. `agent/triage.ts` es un agente de triage de treinta líneas sobre
`@anthropic-ai/claude-agent-sdk`: lee `tickets/` con tools de solo lectura, registra cada
clasificación por una tool propia (zod es el contrato), y un hook en el código le niega cualquier
tool que toque `.env`.

## Antes

- `cd agent && npm install` (una vez, con red). Es el único `npm install` del kit.
- Una API key de platform.claude.com exportada en esa terminal: `export ANTHROPIC_API_KEY=...`.
  El SDK **no usa el login de claude.ai**; sin key no arranca.
- Se corre fuera de la sesión de Claude Code.

## Pasos

1. `npm run triage` dentro de `agent/`.
2. Mirá el stream: una línea por mensaje (`system/init` con el `session_id`, `assistant` con texto
   y `tool_use`, `user` con los resultados de tools, `result` al final).
3. Fijate en los `tool_use`: `Glob`/`Read` sobre `tickets/` y `mcp__surcaja__registrar_triage`
   una vez por ticket. Ningún `Bash`, ningún `Edit`.
4. Al final: `total_cost_usd`, `num_turns`, `session_id`, y `agent/out/triage.json` escrito
   por el código, no por el modelo.

## Prompt exacto

```
cd agent
npm install
export ANTHROPIC_API_KEY=<tu key de platform.claude.com>
npm run triage
```

## Listo =

`agent/out/triage.json` con cinco objetos (`key`, `tipo`, `severidad`, `resumen`), el costo
impreso y `git status` limpio en el resto del repo.

## Si te trabás

- Error de autenticación: la key no está exportada en ESTA terminal, o es del plan de claude.ai
  (no sirve): tiene que ser una key de la Console con crédito.
- `npm install` falla: Node < 22.18 o sin red. Mirá `_preview/demo7-sdk-transcript.md` y hacé pair.
- Sin key: mirá la demo, hacé pair, y hacé EJ 15 con el compañero.
