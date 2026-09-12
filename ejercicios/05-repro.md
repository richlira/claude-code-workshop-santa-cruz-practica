# EJ 5 · /repro SC-103 (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 3](../demos/03-skill-mcp-hook.md).

Una skill que no arregla: lee el ticket (por MCP o del disco), escribe UN test que falla y para.
La skill es un contrato de salida: cada vez que corre, ya sabés cómo va a ser el resultado.

## Antes

- `/mcp` → ¿está `tickets` conectado? Si no, la skill igual lee `tickets/SC-103.md`.
- SC-102 ya está cerrado por EJ 4; por eso el ticket es **SC-103** (un pedido cobrado acepta un segundo pago).

## Pasos

1. `/repro SC-103` y silencio.
2. `! cat .claude/skills/repro/SKILL.md`: 25 líneas de markdown, frontmatter + pasos + constraints.
3. Leé el test que escribió y su salida: tiene que fallar con `pedido_ya_cobrado`.

## Prompt exacto

```
/repro SC-103
```

Si propone el fix:

```
No. The skill says no fix. Show the failing test and stop.
```

## Listo =

Un `test/repro_sc-103.test.ts` nuevo que falla, y `src/` intacto.

## Stretch

Corré `/repro SC-104`. Es una feature, no un bug: ¿qué hace la skill cuando falta el "actual"?
(Pista: el paso 2 dice STOP.)

## Si te trabás

- Sin confiar en el MCP del proyecto, Claude Code no lo conecta: `/mcp` y aceptá.
- Si escribió dos tests o más de 25 líneas, recordale las constraints de la skill.
