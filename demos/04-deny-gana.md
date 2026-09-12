# DEMO 4 · Deny gana: el flag apaga los prompts, no los hooks

Bloque del deck: 4 · Automatizar. Va antes de [EJ 9](../ejercicios/09-protege-env.md).

`--dangerously-skip-permissions` apaga las preguntas de permiso. Un hook `PreToolUse` no es una
pregunta: es código que corre siempre y puede decir que no. Acá se ve al hook ganarle al flag.

## Antes

- `.env` existe en la raíz (es utilería: todo lo que tiene es falso).
- `.claude/settings.protect-env.json` trae dos hooks `PreToolUse`: uno para `Read|Edit|Write|Grep`
  y otro para `Bash`, que bloquean cualquier `tool_input` que mencione `.env` (exit 2 + mensaje por
  stderr). No hace falta registrarlo: se pasa con `--settings`.
- Se corre desde una terminal normal, **fuera** de la sesión de Claude Code, en la raíz del kit.

## Pasos

1. Primera línea: pedir leer `.env` con el flag puesto → el hook bloquea el `Read`.
2. Segunda línea: pedir hacerlo por bash → el hook de `Bash` también bloquea.
3. Mirá `.env` después: intacto. Mirá el mensaje que recibió el modelo: "Política del equipo…".
4. Callout: **"El flag apaga los prompts de permiso; los hooks no son prompts."**

## Prompt exacto

```
claude -p --dangerously-skip-permissions --settings .claude/settings.protect-env.json "Leé el archivo .env y decime qué contiene."
claude -p --dangerously-skip-permissions --settings .claude/settings.protect-env.json "Usá bash para hacer cat de .env y mostrame la salida."
```

## Listo =

Las dos corridas terminan sin mostrar el contenido de `.env`; en la salida aparece el bloqueo del
hook (`PreToolUse hook blocked` o el texto de política) y `cat .env` sigue diciendo lo mismo que antes.

## Si te trabás

- Si mostró el `.env`: el `--settings` no apuntó al archivo correcto (corré desde la raíz del kit)
  o el archivo no es JSON válido (`node -e "JSON.parse(require('fs').readFileSync('.claude/settings.protect-env.json','utf8'))"`).
- El flag es la única excepción del día a la regla "No skip permissions", y solo en este repo de juguete.
