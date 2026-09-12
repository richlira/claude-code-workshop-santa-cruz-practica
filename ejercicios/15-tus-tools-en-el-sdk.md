# EJ 15 · Tus tools en el SDK (avanzado)

Bloque del deck: 6 · Agent SDK. Viene después de [EJ 14](14-corre-el-agente-sdk.md).

Sacale las manos. Dale las tuyas. El agente deja de poder leer el disco: solo ve lo que tus
funciones le dan. Principio de mínimo privilegio, en serio. Es lo que le mostrás a seguridad
cuando un agente entra a producción.

## Antes

- EJ 14 hecho (`npm install` y key en la terminal).
- `claude` abierto en la raíz de sur-caja (para que edite `agent/triage.ts`).

## Pasos

1. Pegá el prompt en Claude Code.
2. Leé el diff de `agent/triage.ts`: dos tools nuevas en el mismo `createSdkMcpServer`, `allowedTools` sin `Read`, `Glob` ni `Grep`.
3. `cd agent && npm run triage`.
4. ¿Algún `→ tool Read` en el stream? No debería. Solo `mcp__surcaja__*`.

## Prompt exacto

```
En agent/triage.ts agregá dos tools al mismo createSdkMcpServer: listar_tickets() que devuelve las keys de tickets/*.md, y leer_ticket(key) que devuelve el markdown de tickets/<key>.md. Después cambiá allowedTools para que el agente SOLO pueda usar mcp__surcaja__listar_tickets, mcp__surcaja__leer_ticket y mcp__surcaja__registrar_triage (sin Read, Glob ni Grep). No toques src/ ni test/.
```

## Listo =

El mismo `out/triage.json`, y en el stream solo tools `mcp__surcaja__*`.

## Stretch

Un segundo `query()` con `resume: <session_id>` (el que imprimió EJ 14) y el prompt
`ordená el triage por severidad y explicá el primero en una línea`. O un hook `PreToolUse` en
el código que niegue `Bash` aunque alguien lo agregue a `allowedTools`.

## Si te trabás

- El agente "no encuentra" los tickets: el prompt le decía "tickets/ (SC-*.md)"; ahora tiene que
  llamar `listar_tickets` primero. Ajustá el prompt o el `append` del system prompt.
- Error de zod al llamar la tool: el schema de `leer_ticket` tiene que ser `{ key: z.string() }`.
