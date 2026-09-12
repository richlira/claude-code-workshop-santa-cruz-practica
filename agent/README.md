# agent/ · Triage embebido con el Claude Agent SDK (DEMO 7 · EJ 14 · EJ 15)

El mismo harness de Claude Code como librería: `triage.ts` lee `../tickets/`, clasifica
cada ticket llamando una tool propia (`registrar_triage`, schema en zod) y deja
`out/triage.json`. Sin UI, sin sesión interactiva, sin manos (`Bash`/`Edit`/`Write` prohibidos).

## Correr

```bash
cd agent
npm install                       # una vez, con red (SDK + zod, ~30 s)
export ANTHROPIC_API_KEY=sk-ant-…  # key de platform.claude.com; NO es el login de claude.ai
npm run triage
```

Sale por pantalla cada mensaje del stream (`system/init`, `assistant`, `user`, `result`), las
tools que llama, el texto final y el costo. Al terminar: `out/triage.json` con un objeto por
ticket (`key`, `tipo`, `severidad`, `resumen`), ordenado por key. Con Haiku cuesta centavos.

Sin key: `npm run triage` avisa y sale con código 1. Mirás la demo y hacés pair con alguien
que tenga key. Los ejercicios están en `../ejercicios/14-*.md` y `15-*.md`.

## Qué mirar en `triage.ts`

- `allowedTools` / `disallowedTools` / `permissionMode: "dontAsk"`: las riendas, en código.
- `tool()` + zod + `createSdkMcpServer()`: tus tools, en el mismo proceso, nombradas `mcp__surcaja__*`.
- `hooks.PreToolUse`: el mismo contrato que un hook de `settings.json`, pero en una función.
- `settingSources: ["project"]`: carga `CLAUDE.md` y `.claude/` del repo.
- `maxTurns` / `maxBudgetUsd`: techos de vueltas y de gasto.

Requiere Node 22.18+ (corre el `.ts` sin build, igual que `npm test` en la raíz).
