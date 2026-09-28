import bcrypt from "bcrypt";
import { Router } from "express";
import { loginRequestSchema, signupRequestSchema } from "@my-driver/shared";
import { pool } from "../db/pool";
import { signAuthToken } from "../lib/jwt";

export const authRouter = Router();

const BCRYPT_ROUNDS = 12;

authRouter.post("/signup", async (req, res) => {
  const parsed = signupRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { name, email, password } = parsed.data;

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rowCount) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const result = await pool.query<{ id: string }>(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
    [name, email, passwordHash],
  );
  const userId = result.rows[0].id;

  const token = signAuthToken({ userId });
  res.status(201).json({ token, user: { id: userId, name, email } });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { email, password } = parsed.data;

  const result = await pool.query<{ id: string; name: string; email: string; password_hash: string }>(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1",
    [email],
  );
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = signAuthToken({ userId: user.id });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});
