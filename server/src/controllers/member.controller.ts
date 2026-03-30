import { Request, Response } from "express";
import * as userService from "../services/user.service";

export function listMembers(req: Request, res: Response) {
  res.json(userService.getAllUsers());
}

export function getMember(req: Request, res: Response) {
  const member = userService.getUserById(req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });
  const { passwordHash, ...safeMember } = member;
  res.json(safeMember);
}

export function updateMember(req: Request, res: Response) {
  const member = userService.updateUser(req.params.id, req.body);
  if (!member) return res.status(404).json({ message: "Member not found" });
  res.json({ message: "Updated" });
}

export function deleteMember(req: Request, res: Response) {
  const deleted = userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Member not found" });
  res.status(204).end();
}
