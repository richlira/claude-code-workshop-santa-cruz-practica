# EJ 10 · Tu tool en el MCP (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 4](../demos/04-deny-gana.md).

Un MCP server no es magia: es un programa que lista funciones (`tools/list`) y las ejecuta
(`tools/call`) por JSON-RPC. El del kit tiene 60 líneas, cero dependencias y dos tools. Le
agregás una tercera. De paso vas a ver una rule con `paths` entrar sola al contexto.

## Antes

- `! cat mcp/tickets_server.mjs`: dos tools (`list_tickets`, `get_ticket`), un patrón.
- `.claude/rules/mcp.md` tiene `paths: ["mcp/**"]`: solo entra al contexto cuando Claude toca esa carpeta.

## Pasos

1. Pegá el prompt.
2. `/context`: la rule de `mcp/**` apareció sola.
3. `/mcp` → reconectar `tickets` (o salí y volvé a entrar): las tools se listan al conectar.
4. Preguntá usando el MCP.

## Prompt exacto

```
Agregá una tool search_tickets(query) a mcp/tickets_server.mjs: busca la query (sin importar mayúsculas) en el título y el cuerpo de cada ticket de tickets/ y devuelve "SC-NNN: título" por línea, o "sin resultados". Seguí el patrón de las dos tools que ya existen. Cero dependencias. No toques src/ ni test/.
```

Después de reconectar:

```
Usando el MCP tickets, ¿qué tickets hablan de QR?
```

Por fuera, para verificar que el server la lista:

```
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node mcp/tickets_server.mjs
```

## Listo =

`/mcp` muestra tres tools y la respuesta cita tickets por key (SC-101 y SC-103 hablan de pagos QR).

## Stretch

Agregá `count_by_severity()` que lea la línea `**Severidad:**` de cada ticket y devuelva el conteo.
Después pedile a Claude que la use para un resumen de una línea.

## Si te trabás

- La tool nueva no aparece: no reconectaste. `/mcp` → tickets → reconnect, o reiniciá la sesión.
- El server rompe al arrancar: probá `node mcp/tickets_server.mjs` a mano y leé el error; casi siempre es una coma.
