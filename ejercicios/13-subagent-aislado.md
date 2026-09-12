# EJ 13 · Subagent aislado y barato (avanzado)

Bloque del deck: 5 · Paralelo y sin mirar. Viene después de [DEMO 6](../demos/06-subagent-aislado.md).

Diez líneas de markdown, un worker. `model: haiku` porque un rename no necesita al modelo
grande; `isolation: worktree` porque trabaja en una copia y tu carpeta no se mueve mientras tanto.

## Antes

- Repo commiteado, `git status` limpio (el worktree nace de git).
- Creá `.claude/agents/refactorizador.md`:

```markdown
---
name: refactorizador
description: Aplica refactors mecánicos en un worktree aislado, sin tocar tu working tree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: haiku
isolation: worktree
---

Aplicá el refactor pedido con cambios mínimos. No reformatees archivos completos.
Corré npm test al final. Reportá qué archivos tocaste, qué dio npm test y en qué rama/worktree quedó.
```

## Pasos

1. `claude` en la raíz (reiniciá si ya estaba abierto: los agents se cargan al arrancar).
2. Pegá el prompt con `@refactorizador`. Si pide aprobación para `npm test`, aprobá.
3. `! git worktree list` → aparece `.claude/worktrees/agent-<id>` con la rama `worktree-agent-<id>`.
   `! git status --short` → tu rama intacta.
4. Leé el reporte: ¿`npm test` verde en el worktree? Vos decidís si entra: `git diff main worktree-agent-<id>`.

## Prompt exacto

```
@refactorizador renombrá crearPago a iniciarPago en src/ y test/, actualizando todos los usos. Corré npm test y reportá.
```

## Listo =

Un worktree nuevo listado, `git status` limpio en tu rama, y el reporte del subagent con `npm test` verde.

## Stretch

Si tu cuenta tiene dynamic workflows:

```
use a workflow: revisá src/ en 3 dimensiones (correctness, seguridad, estilo) en paralelo y verificá cada hallazgo con un agente distinto
```

Mirá el script de orquestación que Claude escribe antes de correrlo. `/workflows` lo muestra.

## Si te trabás

- No aparece el worktree: cambios sin commitear, o el agent no cargó (reiniciá `claude`).
- `./reset-demo.sh` borra el worktree y su rama cuando termines.
