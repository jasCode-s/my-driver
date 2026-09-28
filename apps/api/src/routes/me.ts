import { Router } from "express";
import { z } from "zod";
import { USER_ROLES } from "@my-driver/shared";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

export const meRouter = Router();

meRouter.use(requireAuth);

meRouter.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, active_role FROM users WHERE id = $1",
    [req.userId],
  );
  const user = result.rows[0];
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

const patchRoleSchema = z.object({ role: z.enum(USER_ROLES) });

meRouter.patch("/role", async (req, res) => {
  const parsed = patchRoleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  await pool.query("UPDATE users SET active_role = $1 WHERE id = $2", [
    parsed.data.role,
    req.userId,
  ]);
  res.json({ role: parsed.data.role });
});
