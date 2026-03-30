import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { users } from "../models/store";
import { User, JwtPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function registerUser(name: string, email: string, password: string, role: "admin" | "member") {
  if (users.some((u) => u.email === email)) {
    throw new Error("Email already used");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: `u-${Date.now()}`,
    name,
    email,
    avatarUrl: "",
    passwordHash,
    role,
    workspaceId: "ws1",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role } as JwtPayload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
