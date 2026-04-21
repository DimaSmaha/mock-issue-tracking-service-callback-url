import { Router } from "express";
import { getTask, createTask } from "../controllers/task.controller";

const router = Router();

router.get("/:id", getTask);
router.post("/create", createTask);

export default router;
