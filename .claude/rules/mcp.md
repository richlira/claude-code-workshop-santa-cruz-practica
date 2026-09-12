---
paths:
  - "mcp/**"
---

- El MCP server de tickets es JSON-RPC por stdin/stdout, con **cero dependencias**: no agregues paquetes.
- Cada tool va en el array `tools` con `name`, `description` e `inputSchema` (JSON Schema), y su lógica en `call()`.
- Seguí el patrón de `list_tickets` / `get_ticket`: leer de `../tickets/`, devolver texto plano.
- Después de editar el server, reconectalo con `/mcp` en Claude Code: los cambios no se ven hasta reiniciar.
