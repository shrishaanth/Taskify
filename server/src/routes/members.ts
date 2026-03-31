import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import * as memberController from "../controllers/member.controller";

const router = Router();
router.use(requireAuth);

router.get("/", memberController.listMembers);
router.get("/:id", memberController.getMember);
router.put("/:id", requireAdmin, memberController.updateMember);
router.delete("/:id", requireAdmin, memberController.deleteMember);

export default router;
