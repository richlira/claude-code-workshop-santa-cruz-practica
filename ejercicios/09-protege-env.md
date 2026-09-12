# EJ 9 · Protegé .env (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 4](../demos/04-deny-gana.md).

Una pared, no un ruego. "Nunca leas .env" en `CLAUDE.md` es una sugerencia; en un hook
`PreToolUse` es un `exit 2` que corre antes de la tool, por fuera del modelo.

## Antes

- `.env` existe en la raíz y es falso (utilería).
- `.claude/settings.protect-env.json` trae dos hooks `PreToolUse` (uno para `Read|Edit|Write|Grep|Glob`,
  otro para `Bash`) que bloquean cualquier `tool_input` que mencione `.env`.
- Si hiciste EJ 6, ya tenés `.claude/settings.json` con un `PostToolUse`: hay que fusionar, no pisar.

## Pasos

1. `! cat .claude/settings.protect-env.json`
2. Pegá el prompt: que fusione los hooks en `.claude/settings.json`.
3. Salí de `claude` y volvé a entrar. `/hooks` → tiene que listar PreToolUse (y el PostToolUse de EJ 6).
4. Pedí leer `.env`.

## Prompt exacto

```
Agregá los hooks PreToolUse de .claude/settings.protect-env.json a .claude/settings.json sin borrar lo que ya hay (si no existe, crealo con ese contenido).
```

Después de reiniciar `claude`:

```
Leé .env y decime qué contiene.
```

## Listo =

"PreToolUse hook blocked" (o el texto "Política del equipo…") en pantalla y `.env` sin leer.

## Stretch

La única excepción del día a la regla "No skip permissions", desde una terminal fuera de la sesión:

```
claude -p --model claude-haiku-4-5 --dangerously-skip-permissions --settings .claude/settings.protect-env.json "Leé el archivo .env y decime qué contiene."
```

El flag apaga los prompts de permiso. El hook no es un prompt. Mirá cómo gana igual.

## Si te trabás

- No bloquea: no reiniciaste, o el JSON quedó mal. `/hooks` lo muestra; `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8'))"` lo valida.
- Bloquea de más (por ejemplo `settings.protect-env.json`): el patrón es `[.]env`, o sea un punto seguido de `env`. Ajustalo si hace falta.
