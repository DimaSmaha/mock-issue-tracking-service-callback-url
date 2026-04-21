import { Request, Response } from "express";
import { getTestCaseById } from "../../../application/services/testcase.service";
import { log } from "../../../shared/logger";

export const getTestCase = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tc = getTestCaseById(id);

  if (!tc) return res.status(404).json({ message: "TestCase not found" });

  res.json(tc);
};

export const createTestCase = (req: Request, res: Response) => {
  log("Create TestCase payload:", req.body);
  res.status(200).json({ status: "ok" });
};
