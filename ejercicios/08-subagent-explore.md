# EJ 8 · Subagent Explore + /context (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 3](../demos/03-skill-mcp-hook.md).

Que otro lea por vos. Un subagent tiene su propia ventana de contexto: lee cuarenta archivos y te
devuelve cinco líneas. Tu sesión principal no se ensucia. La lección está en el `/context` de
antes y el de después.

## Antes

- Una sesión con algo de historia (EJ 5 a 7 sirven).

## Pasos

1. `/context` antes: anotá cuánto ocupa.
2. Pegá el prompt con `@Explore`.
3. Mirá: el subagent lee, vos recibís un resumen.
4. `/context` después: casi igual que antes.

## Prompt exacto

```
@Explore mapeá sur-caja en 5 líneas: qué hace cada archivo de src/, qué cubre cada test, y qué ticket sigue abierto. No edites nada.
```

Después:

```
/context
```

## Listo =

Un mapa del repo de 5 líneas y tu contexto principal sin los cuarenta Reads.

## Stretch

Lanzá tres a la vez: `Lanzá 3 subagents Explore en paralelo: uno para src/, uno para test/ y
uno para tickets/. Cada uno me devuelve SOLO su mapa en 3 líneas.` Después preguntale al lead
algo que exija criterio sobre lo que volvió: `Con esos mapas, ¿qué ticket atacarías primero y por qué?`

## Si te trabás

- Si `@Explore` no autocompleta, escribí el prompt igual: Claude Code delega solo cuando la tarea es de exploración.
