# EJ 3 · /init y recortá (básico)

Bloque del deck: 3 · Enseñarle. Viene después de [DEMO 2](../demos/02-plan-brief-commit.md).

El entregable es el archivo, no el código: un `CLAUDE.md` que un compañero use el lunes.
Cada línea tiene que pasar el test de poda: si la saco, ¿se equivoca? Si no, afuera.

## Antes

- `claude` en la raíz. El `CLAUDE.md` del kit está incompleto a propósito.

## Pasos

1. `/init` y leé lo que propone.
2. Pegá el prompt de recorte.
3. `! wc -l CLAUDE.md` → menos de 80.
4. `/context` → confirmá que cargó.

## Prompt exacto

```
/init
```

Después:

```
Recortá CLAUDE.md a menos de 80 líneas. Tiene que incluir: stack, npm test,
"don't change the stack", timezone America/La_Paz para la caja diaria,
y "don't edit src/pagos.ts unless a test in test/ is red first".
Sacá frases vacías. En inglés. No toques src/.
```

## Listo =

`CLAUDE.md` de menos de 80 líneas con stack, `npm test`, timezone `America/La_Paz` y "don't
change the stack". Sin "clean code" ni "best practices": eso es prosa, no reglas.

## Stretch

Por cada línea que quede, agregale su porqué en media frase. Una instrucción con porqué se puede
borrar mañana cuando la razón desaparezca; una sin porqué queda para siempre.

## Si te trabás

- Si `/init` escribió un wiki de 200 líneas, está bien: el ejercicio es recortarlo.
- `/memory` abre el archivo desde la sesión si preferís editar a mano.
