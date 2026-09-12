# DEMO 0 · Dos puertas, la misma pregunta

Bloque del deck: 2 · Fundamentos. Va antes de [EJ 1](../ejercicios/01-explora.md).

La misma pregunta por dos puertas: una ventana de chat (claude.ai) y Claude Code parado en el
repo. La diferencia no es el modelo, es lo que puede leer.

## Antes

- Repo limpio (`./reset-demo.sh` si hace falta), `npm test` da 2 verdes y 1 rojo.
- `claude` en la raíz de `sur-caja`, permisos en **plan** (`Shift+Tab` hasta que diga plan).
- claude.ai abierto en otra pestaña.

## Pasos

1. En claude.ai, sin pegar nada: `¿qué hace este repo y dónde está el bug más probable?` → no
   puede saberlo; adivina o pide que le pegues archivos.
2. En Claude Code, el prompt de abajo. Mirá cómo lee `package.json`, `src/`, `test/` y corre lo
   que necesita antes de contestar.
3. Callout: **"No le pegamos el archivo. Él lo encontró."**

## Prompt exacto

```
Estamos en sur-caja, un repo de curso. No es producción.
Explorá el repo. No edites nada todavía.
Quiero en pantalla, corto:
- qué hace
- dónde está el bug más probable
- qué test está rojo y por qué
No propongas un rewrite.
```

## Listo =

Claude Code nombra `src/pagos.ts`, el test rojo de `test/pagos.test.ts` y por qué falla
(compara el día en UTC). `git status` sigue limpio: plan mode no edita.

## Si te trabás

- Si editó algo, no estabas en plan mode: `git checkout -- src test` y repetí con `Shift+Tab`.
- Si propone un rewrite, ignoralo: el prompt ya dijo que no. Es la primera lección de steering.
