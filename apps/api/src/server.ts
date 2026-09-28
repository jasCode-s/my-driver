import { createServer } from "node:http";
import { createApp } from "./app";
import { env } from "./config/env";
import { createSocketServer } from "./ws";

const app = createApp();
const httpServer = createServer(app);
createSocketServer(httpServer);

httpServer.listen(env.port, () => {
  console.log(`my-driver API listening on port ${env.port}`);
});
