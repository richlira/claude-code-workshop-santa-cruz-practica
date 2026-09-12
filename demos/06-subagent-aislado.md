# DEMO 6 · Un subagent aislado y barato

Bloque del deck: 5 · Paralelo y sin mirar. Va antes de [EJ 13](../ejercicios/13-subagent-aislado.md).

Un subagent con `isolation: worktree` trabaja en su propia carpeta y rama: tu working tree no se
mueve mientras él edita. Con `model: haiku` el refactor mecánico cuesta centavos. El lead mira el
resultado como un diff más.

## Antes

- Repo commiteado (el worktree nace de git). `git status` limpio en `main` o `feat/curso`.
- `.claude/agents/refactorizador.md` con este frontmatter y cuerpo:

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

1. `claude` en la raíz. Pegá el prompt.
2. Si pide aprobación para `npm test` (Bash), aprobá: en acceptEdits los comandos preguntan.
3. Mientras corre, en otra terminal: `git worktree list` (aparece `.claude/worktrees/agent-<id>`
   con la rama `worktree-agent-<id>`) y `git status` (tu rama intacta).
4. Leé el reporte: archivos tocados (`src/pagos.ts`, `src/server.ts`, `test/pagos.test.ts`), `npm test`, rama.
5. Vos decidís si entra: `git diff main worktree-agent-<id>`; mergear o borrar.

## Prompt exacto

```
@refactorizador renombrá crearPago a iniciarPago en src/ y test/, actualizando todos los usos. Corré npm test y reportá.
```

## Listo =

`git worktree list` muestra `.claude/worktrees/agent-<id>`, `git status` en tu rama no cambió, y
`npm test` está verde adentro del worktree (ensayo 2026-09-12: 3 archivos tocados, 2 pass / 1 fail
igual que main porque SC-101 sigue abierto en ese ensayo). `./reset-demo.sh` lo limpia después.

## Si te trabás

- "not a git repository" o el worktree no aparece: hay cambios sin commitear o no estás en la raíz.
- Si el subagent no corrió `npm test`, pedíselo en el mismo hilo: el lead le reenvía la orden.
- Stretch (si tu cuenta tiene dynamic workflows): `use a workflow: revisá src/ en 3 dimensiones (correctness, seguridad, estilo) en paralelo y verificá cada hallazgo con un agente distinto`.
