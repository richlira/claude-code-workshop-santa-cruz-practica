# sur-caja · la práctica del Workshop Claude Code · Santa Cruz

Repo de práctica del **Workshop Claude Code · AgenTICs 2026 · UPSA · Santa Cruz** (Claude
Community México · LatAm). `sur-caja` es una API ficticia de pedidos + pagos QR para un
comercio de Santa Cruz: TypeScript + `node:test`, cero framework, cero dependencias. Trae un
bug plantado (SC-101, timezone), una feature faltante (SC-102, `conciliar()`), un bug para
`/repro` (SC-103, doble pago) y dos tickets más (SC-104, SC-105) para que el triage tenga
cinco entradas. **El repo es disfraz; el músculo es el loop**: explorar → plan → implementar
→ verificar → commit, y después codificarlo.

**Empezá acá → abrí [`guia/index.html`](guia/index.html)** en tu navegador: el mapa de las
9 demos y los 16 ejercicios. O navegá [`demos/`](demos/) y [`ejercicios/`](ejercicios/):
cada archivo trae pasos, prompt exacto y criterio de listo.

## Requisitos

- **Claude Code** instalado y con login (`claude --version`; plan pago de Claude).
- **Node 22.18 o más nuevo** y git. `npm test` corre SIN `npm install` (type stripping nativo).
- Opcionales por ejercicio: `jq` (EJ 12), **Ollama** con un modelo chico (EJ 16), y una **API key
  de platform.claude.com** con unos dólares de crédito para el Agent SDK (EJ 14 y 15: el SDK no
  usa el login de claude.ai). El único `npm install` del kit es `cd agent && npm install`.

```
cd sur-caja && npm test     # 2 verdes, 1 rojo. El rojo es a propósito.
```

## Importante antes de empezar

1. Al abrir `claude` en este repo te va a pedir **confiar en el folder** y, cuando toque, revisar
   sus hooks y su MCP. Leélos y aceptá: ese diálogo es parte de la lección.
2. **Todo lo "sensible" es falso**: `.env`, los tickets, los montos. Son utilería.
3. `./reset-demo.sh` vuelve al estado inicial entre ejercicios (borra lo que generan las demos y
   los ejercicios, incluidos los worktrees del subagent). Conserva `agent/node_modules`.

## Qué hay

```
sur-caja/
├── CLAUDE.md                       incompleto a propósito (EJ 3 lo mejora)
├── src/   server.ts · tipos.ts · db.ts · pedidos.ts · pagos.ts (BUG SC-101)
├── test/  pedidos.test.ts (verde) · pagos.test.ts (1 rojo + 1 verde que impide "arreglar" borrando el check)
├── tickets/ SC-101 · SC-102 · SC-103 · SC-104 · SC-105      el "Jira" del curso
├── .env                            FALSO: utilería de DEMO 4 / EJ 9 (un hook impide leerlo)
├── .mcp.json → mcp/tickets_server.mjs   MCP stdio en Node, cero deps: list_tickets / get_ticket (EJ 10 agrega una)
├── .claude/
│   ├── skills/repro/SKILL.md       /repro: ticket → test que falla, sin fix
│   ├── commands/pr.md              stub; se completa en EJ 7
│   ├── rules/mcp.md                rule con paths: ["mcp/**"], entra sola al tocar el server
│   ├── settings.example.json       hook PostToolUse Edit|Write → hooks/tsc-check.sh (EJ 6, NO registrado)
│   └── settings.protect-env.json   hooks PreToolUse que bloquean .env (DEMO 4 por --settings, EJ 9)
├── hooks/tsc-check.sh
├── scripts/triage.sh + triage.schema.json   claude -p + --json-schema sobre tickets/ (DEMO 5 / EJ 12)
├── agent/  triage.ts · package.json · README.md   el mismo triage con el Claude Agent SDK (DEMO 7 / EJ 14-15)
├── demos/  00 … 08                 una por demo: prompt exacto y qué tiene que pasar
├── ejercicios/ 01 … 16             uno por ejercicio: pasos, prompt, listo =, stretch
├── guia/index.html                 el mapa visual
└── reset-demo.sh
```

## Mapa (mismo orden que el deck)

| Bloque del deck | Demos | Ejercicios |
|---|---|---|
| 2 · Fundamentos | [D0 dos puertas](demos/00-dos-puertas.md) · [D1 test roto](demos/01-test-roto.md) | [1 explorá](ejercicios/01-explora.md) · [2 arreglá el test](ejercicios/02-arregla-el-test.md) |
| 3 · Enseñarle | [D2 plan, brief, commit](demos/02-plan-brief-commit.md) | [3 /init y recortá](ejercicios/03-init-y-recorta.md) · [4 plan + brief + steer + commit](ejercicios/04-plan-brief-steer-commit.md) |
| 4 · Automatizar | [D3 skill por MCP + hook](demos/03-skill-mcp-hook.md) · [D4 deny gana](demos/04-deny-gana.md) | [5 /repro](ejercicios/05-repro.md) · [6 hook](ejercicios/06-hook-tsc.md) · [7 /pr](ejercicios/07-comando-pr.md) · [8 subagent Explore](ejercicios/08-subagent-explore.md) · [9 protegé .env](ejercicios/09-protege-env.md) · [10 tu tool en el MCP](ejercicios/10-tu-tool-en-el-mcp.md) |
| 5 · Paralelo y sin mirar | [D5 triage headless](demos/05-triage-headless.md) · [D6 subagent aislado](demos/06-subagent-aislado.md) | [11 tu skill](ejercicios/11-tu-skill.md) · [12 script headless](ejercicios/12-script-headless.md) · [13 subagent aislado y barato](ejercicios/13-subagent-aislado.md) |
| 6 · Agent SDK | [D7 triage embebido](demos/07-triage-sdk.md) | [14 corré el agente](ejercicios/14-corre-el-agente-sdk.md) · [15 tus tools en el SDK](ejercicios/15-tus-tools-en-el-sdk.md) |
| 7 · Local | [D8 contra un modelo local](demos/08-modelo-local.md) | [16 modelo local](ejercicios/16-modelo-local.md) |

Niveles: básico (1-3) = seguir un prompt y leer lo que pasa · intermedio (4-10) = escribir el
brief, aprobar un plan, registrar una pieza · avanzado (11-16) = diseñar una pieza propia, correr
Code sin UI, embeberlo, correrlo local. Nadie tiene que llegar al 16; todos tienen que pasar del 4.

## Correr la app (no hace falta para el workshop)

```
npm start       # http server en :3333
```

## Licencia

MIT. Usalo, forkealo, llevalo a tu equipo.

Proyecto de la Claude Community México. No es material oficial de Anthropic.
