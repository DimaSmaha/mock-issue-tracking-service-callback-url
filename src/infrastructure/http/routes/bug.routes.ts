import { Router } from "express";
import { getBug, createBug } from "../controllers/bug.controller";

const router = Router();

router.get("/:id", getBug);
router.post("/create", createBug);

export default router;
