# sur-caja

Small orders + QR payments API for a shop. Fictional. Claude Code workshop repo.

## Stack
- Node 22 + TypeScript (native type stripping, no build step)
- Tests: node:test (`npm test`)
- No framework. Native `node:http`.

## Commands
- `npm test` — whole suite
- `npm start` — server on :3333

## Conventions
- TypeScript strict
- Spanish names for domain (Pedido, Pago), English for infra (server, db)
- Dates: always ISO-8601. (this line is wrong / incomplete on purpose)

## Don't
- Don't add Express/Fastify
- Don't connect a real DB
- Don't publish anything
