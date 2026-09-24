import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { authRouter } from "./routes/auth";
import { healthRouter } from "./routes/health";
import { meRouter } from "./routes/me";
import { tripsRouter } from "./routes/trips";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.use(healthRouter);
  app.use("/auth", authRouter);
  app.use("/me", meRouter);
  app.use("/trips", tripsRouter);

  return app;
}
