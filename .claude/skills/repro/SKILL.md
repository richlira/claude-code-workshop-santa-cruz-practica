---
name: repro
description: Turn a bug report or ticket into ONE minimal failing test that reproduces it. Do NOT fix the bug.
---

## Steps
1. If $ARGUMENTS looks like a ticket key (SC-123), fetch it: use the `tickets` MCP tool
   `get_ticket` if it is connected; otherwise read `tickets/<KEY>.md`.
   If $ARGUMENTS is free text, use it as the report.
2. Extract three things: trigger input, expected output, actual output.
   Missing any of the three? Say which one and STOP.
3. Find the narrowest function under test in `src/`. Read it. Do not edit it.
4. Write ONE test in `test/repro_<slug>.test.ts` using `node:test` + `node:assert/strict`,
   inline fixtures, no new dependencies.
5. Run `npm test`. The new test MUST fail with the reported symptom.
   If it passes, the repro is wrong: delete it and rethink.
6. Show the test and the failing output. Do not propose a fix.

## Constraints
- NEVER edit `src/`. Tests only.
- One test, one assertion, under 25 lines.
- Test name: `repro <KEY>: <one-line symptom>`.

## References
- `test/pagos.test.ts` (style to imitate)
- `src/pagos.ts`
