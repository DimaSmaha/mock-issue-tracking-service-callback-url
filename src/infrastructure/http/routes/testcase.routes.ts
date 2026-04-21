import { Router } from "express";
import {
  getTestCase,
  createTestCase,
} from "../controllers/testcase.controller";

const router = Router();

router.get("/:id", getTestCase);
router.post("/create", createTestCase);

export default router;
