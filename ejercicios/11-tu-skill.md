# EJ 11 · Escribí tu propia skill (avanzado)

Bloque del deck: 5 · Paralelo y sin mirar. Viene después de [DEMO 5](../demos/05-triage-headless.md).

Acá ya no seguís un prompt: diseñás un contrato de salida. La prueba es correrla dos veces y que
el reporte tenga la misma forma. Si cambia de forma, la skill está floja.

## Antes

- `.claude/skills/repro/SKILL.md` como modelo: frontmatter corto, Steps, Constraints.
- EJ 4 hecho (`conciliar()` existe). Si no, apuntá la skill a `marcarPagado` y `test/pagos.test.ts`.

## Pasos

1. Pegá el prompt: que escriba la skill, no el reporte.
2. `! cat .claude/skills/conciliar-report/SKILL.md`: ¿frontmatter, pasos, constraints, menos de 30 líneas?
3. Reiniciá `claude` y corré `/conciliar-report`.
4. Corrélo otra vez. ¿`REPORTE.md` tiene la misma forma?

## Prompt exacto

```
Creá .claude/skills/conciliar-report/SKILL.md.
Cuando se invoque, la skill tiene que:
1. correr npm test y abortar si hay rojos
2. leer src/pagos.ts y test/conciliar.test.ts
3. escribir REPORTE.md con EXACTAMENTE tres secciones:
   ## Estados posibles (tabla estado → ok/motivo)
   ## Casos cubiertos por tests
   ## Casos sin cubrir (o "ninguno")
Constraints: nunca editar src/ ni test/. Menos de 30 líneas.
Escribí solo la skill. No la ejecutes todavía.
```

## Listo =

Una `SKILL.md` nueva con frontmatter, pasos y constraints, y una corrida que deja `REPORTE.md`
con las tres secciones. Dos corridas, misma forma.

## Stretch

Agregale `disable-model-invocation: true` al frontmatter (solo manual) y `allowed-tools` con lo
mínimo (`Read`, `Bash(npm test)`, `Write`). ¿Qué cambia cuando la skill no puede usar Edit?

## Si te trabás

- Ejecutó la skill en vez de escribirla: `No. Write only the SKILL.md file. Don't run it.`
- El reporte cambia de forma entre corridas: falta un constraint sobre la forma exacta de cada sección.
