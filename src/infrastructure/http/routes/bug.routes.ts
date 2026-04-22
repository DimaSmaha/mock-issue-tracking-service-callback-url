import { Router } from "express";
import { getBug, createBug } from "../controllers/bug.controller";
import { validateCreateEntityPayload } from "../../../shared/middleware/create-entity-validation.middleware";

const router = Router();

router.get("/:id", getBug);
router.post("/create", validateCreateEntityPayload, createBug);

export default router;
