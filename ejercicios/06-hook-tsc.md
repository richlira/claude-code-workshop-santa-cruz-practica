# EJ 6 · Registrá el hook (intermedio)

Bloque del deck: 4 · Automatizar. Viene después de [DEMO 3](../demos/03-skill-mcp-hook.md).

Un hook corre sin que se lo pidas y por fuera del modelo. Este corre `tsc --noEmit` después de
cada `Edit` o `Write`. El bug número uno de hooks: registrarlo y no reiniciar la sesión.

## Antes

- `hooks/tsc-check.sh` existe; `.claude/settings.example.json` lo registra como `PostToolUse`.
- Con red, una vez: `npx -y typescript@5 tsc --version` (para que no descargue nada en el momento).

## Pasos

1. `! cat .claude/settings.example.json`
2. `! cp .claude/settings.example.json .claude/settings.json`
3. Salí de `claude` y volvé a entrar. `/hooks` → tiene que listar el PostToolUse.
4. Pedí un Edit chico (abajo) y mirá qué aparece después del Edit.

## Prompt exacto

```
Add a one-line comment at the top of src/tipos.ts saying what the file is.
```

## Listo =

La salida de `tsc --noEmit` aparece después del Edit sin que la pidieras.

## Stretch

Rompé un tipo a propósito (`Add a property foo: number to Pago in src/tipos.ts and use it nowhere`,
o pedile que asigne un string a un number) y mirá cómo el hook le devuelve el error al modelo.

## Si te trabás

- No dispara: no reiniciaste la sesión. Los hooks se cargan al arrancar.
- `/hooks` no lo lista: el JSON está mal formado. `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8'))"`.
