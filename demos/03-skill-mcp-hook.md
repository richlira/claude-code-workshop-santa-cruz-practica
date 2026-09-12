# DEMO 3 · Una skill que usa un MCP, y un hook que corre siempre

Bloque del deck: 4 · Automatizar. Va antes de [EJ 5](../ejercicios/05-repro.md),
[EJ 6](../ejercicios/06-hook-tsc.md), [EJ 7](../ejercicios/07-comando-pr.md) y
[EJ 8](../ejercicios/08-subagent-explore.md).

Tres piezas del repo, no del prompt: `/repro` (skill) lee el ticket por MCP y escribe un test
que falla sin arreglarlo; el hook `tsc-check` corre `tsc --noEmit` después de cada Edit.

## Antes

- `.mcp.json` apunta a `mcp/tickets_server.mjs` (cero deps). La primera vez Claude Code pide
  confiar en el MCP del proyecto: aceptá.
- El hook NO está registrado todavía (`.claude/settings.json` no existe). Se registra en el paso 4.
- SC-102 ya cerrado por DEMO 2, por eso el ticket de esta demo es **SC-103**.

## Pasos

1. `/mcp` → `tickets` conectado, dos tools: `list_tickets`, `get_ticket`.
2. `/repro SC-103` → escribe `test/repro_sc-103.test.ts`, lo corre, falla, **no arregla**.
3. `! cat .claude/skills/repro/SKILL.md` → la skill es un playbook versionado, no magia.
4. Registrá el hook: `cp .claude/settings.example.json .claude/settings.json`, salí de `claude`,
   volvé a entrar (los hooks se cargan al arrancar), `/hooks` para verificar.
5. Un Edit chico para verlo disparar (prompt de abajo) → después del Edit aparece la salida de
   `tsc --noEmit`.
6. Si sobra: `@Explore mapeá el repo en 5 líneas` y `/context` antes y después.

## Prompt exacto

```
/repro SC-103
```

```
Add a one-line comment at the top of src/tipos.ts saying what the file is.
```

## Listo =

Un test rojo nuevo para SC-103 con `src/` intacto; `/hooks` lista el PostToolUse; después del
Edit se ve la corrida de `tsc`.

## Si te trabás

- `/repro` propone el fix: `No. The skill says no fix. Show the failing test and stop.`
- El hook no dispara: no reiniciaste la sesión después de copiar `settings.json`. Es el bug
  número uno de hooks.
- Sin MCP (o sin confiar en él) la skill igual funciona: lee `tickets/SC-103.md` del disco.
