import type { Server as HttpServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";
import { SOCKET_EVENTS, driverLocationEventSchema } from "@my-driver/shared";
import { env } from "../config/env";
import { verifyAuthToken } from "../lib/jwt";

export function createSocketServer(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: { origin: env.corsOrigin },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) {
      next(new Error("Missing auth token"));
      return;
    }
    try {
      const { userId } = verifyAuthToken(token);
      socket.data.userId = userId;
      next();
    } catch {
      next(new Error("Invalid auth token"));
    }
  });

  io.on("connection", (socket) => {
    // TODO(M2): mark driver online in Redis geo index, remove on disconnect.
    socket.on(SOCKET_EVENTS.DRIVER_LOCATION, (raw) => {
      const parsed = driverLocationEventSchema.safeParse(raw);
      if (!parsed.success) return;
      // TODO(M2): write parsed.data.location into the Redis geo set for socket.data.userId.
    });

    // TODO(M3): handle DRIVER_OFFER_RESPOND to accept/decline a trip offer.
  });

  return io;
}
