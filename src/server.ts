import http from "node:http";
import { crearPedido, getPedido } from "./pedidos.ts";
import { crearPago, marcarPagado } from "./pagos.ts";

const server = http.createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  const url = new URL(req.url ?? "/", "http://localhost");

  try {
    if (req.method === "POST" && url.pathname === "/pedidos") {
      const body = await leer(req);
      const pedido = crearPedido(Number(body.totalBob));
      res.end(JSON.stringify(pedido));
      return;
    }
    if (req.method === "GET" && url.pathname.startsWith("/pedidos/")) {
      const id = url.pathname.split("/")[2];
      const pedido = getPedido(id);
      if (!pedido) { res.statusCode = 404; res.end(JSON.stringify({ error: "no_encontrado" })); return; }
      res.end(JSON.stringify(pedido));
      return;
    }
    if (req.method === "POST" && url.pathname === "/pagos") {
      const body = await leer(req);
      const pago = crearPago(String(body.pedidoId), Number(body.montoBob));
      res.end(JSON.stringify(pago));
      return;
    }
    if (req.method === "POST" && url.pathname.startsWith("/pagos/") && url.pathname.endsWith("/pagar")) {
      const id = url.pathname.split("/")[2];
      const body = await leer(req);
      const pago = marcarPagado(id, String(body.pagadoEn));
      res.end(JSON.stringify(pago));
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "ruta" }));
  } catch (e) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: String(e) }));
  }
});

function leer(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); }
      catch (e) { reject(e); }
    });
  });
}

if (process.argv[1]?.endsWith("server.ts")) {
  server.listen(3333, () => console.log("sur-caja :3333"));
}
