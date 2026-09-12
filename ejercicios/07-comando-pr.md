# EJ 7 · Tu primer comando: /pr (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 3](../demos/03-skill-mcp-hook.md).

Un prompt con nombre. Un archivo markdown en `.claude/commands/`, cero frontmatter, y ya tenés
`/pr`. Es el más chico de los ejercicios y el que más vas a usar el lunes.

## Antes

- `.claude/commands/pr.md` es un stub: `! cat .claude/commands/pr.md`.

## Pasos

1. Pegá el prompt: que complete el archivo y lo ejecute.
2. Leé lo que escribió en `pr.md`.
3. Corré `/pr` vos también.
4. Leé el mensaje de commit propuesto. No pushees.

## Prompt exacto

```
Completá .claude/commands/pr.md. El comando /pr debe:
1. correr npm test
2. si falla, no armar commit y listar los tests rojos
3. si pasa, mostrar git diff --stat y un mensaje de commit propuesto
4. NO hacer push
Dejalo versionado. Después ejecutá /pr.
```

## Listo =

`/pr` corre `npm test`, muestra `git diff --stat` y propone un mensaje. No pushea.

## Stretch

Convertilo en skill: `.claude/skills/pr/SKILL.md` con frontmatter (`name`, `description`) y las
mismas reglas como Steps y Constraints. ¿Cuándo conviene una skill y cuándo alcanza un command?

## Si te trabás

- Si `/pr` no aparece en el autocompletado, el archivo no está en `.claude/commands/` o la sesión
  no se reinició.
