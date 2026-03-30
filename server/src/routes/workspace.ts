import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import * as workspaceController from "../controllers/workspace.controller";

const router = Router();
router.use(requireAuth);

router.get("/", workspaceController.listWorkspaces);
router.get("/:id", workspaceController.getWorkspace);
router.post("/", requireAdmin, workspaceController.createWorkspace);
router.put("/:id", requireAdmin, workspaceController.updateWorkspace);
router.delete("/:id", requireAdmin, workspaceController.deleteWorkspace);

export default router;
