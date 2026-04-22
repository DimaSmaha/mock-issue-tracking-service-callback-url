import { Router } from "express";
import {
  getTestCase,
  createTestCase,
} from "../controllers/testcase.controller";
import { validateCreateTestCasePayload } from "../../../shared/middleware/create-entity-validation.middleware";

const router = Router();

router.get("/:id", getTestCase);
router.post("/create", validateCreateTestCasePayload, createTestCase);

export default router;
