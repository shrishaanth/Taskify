import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import * as projectController from "../controllers/project.controller";

const router = Router();
router.use(requireAuth);

router.get("/", projectController.listProjects);
router.get("/:id", projectController.getProject);
router.post("/", requireAdmin, projectController.createProject);
router.put("/:id", requireAdmin, projectController.updateProject);
router.delete("/:id", requireAdmin, projectController.deleteProject);

export default router;
