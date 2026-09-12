export type EstadoPedido = "abierto" | "cobrado" | "cancelado";
export type EstadoPago = "pendiente" | "pagado" | "fallido";

export interface Pedido {
  id: string;
  totalBob: number;
  estado: EstadoPedido;
  creadoEn: string;
}

export interface Pago {
  id: string;
  pedidoId: string;
  montoBob: number;
  estado: EstadoPago;
  creadoEn: string;
  pagadoEn: string | null;
}
