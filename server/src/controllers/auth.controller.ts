import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { users } from "../models/store";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role = "member" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name/email/password required" });
    }

    const normalizedRole = role === "admin" ? "admin" : "member";
    const user = await authService.registerUser(name, email, password, normalizedRole);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email/password required" });
    }
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export function me(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
}
