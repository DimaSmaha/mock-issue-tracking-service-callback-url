import { Request, Response } from "express";
import {
  createMockTestCase,
  getTestCaseById,
} from "../../../application/services/testcase.service";
import { getTaskById } from "../../../application/services/task.service";
import { log } from "../../../shared/logger";

export const getTestCase = (req: Request, res: Response) => {
  const id = req.params.id;
  const tc = getTestCaseById(id);

  if (!tc) return res.status(404).json({ message: "TestCase not found" });

  res.json(tc);
};

export const createTestCase = (req: Request, res: Response) => {
  log("Create TestCase payload:", req.body);

  const parentId = req.body?.parent_id;

  if (parentId !== undefined) {
    const taskId = Number(parentId);

    if (!Number.isInteger(taskId) || !getTaskById(taskId)) {
      return res.status(400).json({
        status: "error",
        message: "parent_id must reference an existing task id.",
      });
    }
  }

  const testCase = createMockTestCase(req.body);

  res.status(200).json({ status: "ok", data: testCase });
};
