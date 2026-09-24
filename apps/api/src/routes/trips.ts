import { Router } from "express";
import { requireAuth } from "../middleware/auth";

export const tripsRouter = Router();

tripsRouter.use(requireAuth);

// TODO(M3): implement rider trip creation + nearest-driver matching (see plan).
tripsRouter.post("/", (_req, res) => {
  res.status(501).json({ error: "Trip creation is not implemented yet" });
});

// TODO(M4): implement trip lookup once trips are persisted.
tripsRouter.get("/:id", (_req, res) => {
  res.status(501).json({ error: "Trip lookup is not implemented yet" });
});

tripsRouter.get("/active", (_req, res) => {
  res.status(501).json({ error: "Active trip lookup is not implemented yet" });
});

// TODO(M5): implement post-trip rating.
tripsRouter.post("/:id/rate", (_req, res) => {
  res.status(501).json({ error: "Trip rating is not implemented yet" });
});
