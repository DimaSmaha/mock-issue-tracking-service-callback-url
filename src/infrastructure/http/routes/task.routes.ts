import { Router } from "express";
import { getTask, createTask } from "../controllers/task.controller";
import { validateCreateEntityPayload } from "../../../shared/middleware/create-entity-validation.middleware";

const router = Router();

router.get("/:id", getTask);
router.post("/create", validateCreateEntityPayload, createTask);

export default router;
