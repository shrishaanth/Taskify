import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as taskController from "../controllers/task.controller";

const router = Router();
router.use(requireAuth);

router.get("/", taskController.listTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
