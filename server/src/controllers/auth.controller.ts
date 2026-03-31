import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { UserModel } from "../models/user.model";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role = "member" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name/email/password required" });
    }
    const normalizedRole = role === "admin" ? "admin" : "member";
    const user = await authService.registerUser(name, email, password, normalizedRole);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error: any) {
    if (error.message === "Email already used") {
      return res.status(409).json({ message: error.message });
    }
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
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    const userDoc = await UserModel.findById(userId).select("-passwordHash").lean();
    if (!userDoc) return res.status(404).json({ message: "User not found" });
    res.json({ id: (userDoc as any)._id.toString(), name: userDoc.name, email: userDoc.email, role: userDoc.role, avatarUrl: userDoc.avatarUrl });
  } catch (error) {
    next(error);
  }
}
