import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export async function listMembers(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.getAllUsers());
  } catch (error) { next(error); }
}

export async function getMember(req: Request, res: Response, next: NextFunction) {
  try {
    const member = await userService.getUserById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (error) { next(error); }
}

export async function updateMember(req: Request, res: Response, next: NextFunction) {
  try {
    const member = await userService.updateUser(req.params.id, req.body);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (error) { next(error); }
}

export async function deleteMember(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Member not found" });
    res.status(204).end();
  } catch (error) { next(error); }
}
