import { Request, Response } from "express";
import { getTaskById } from "../../../application/services/task.service";
import { log } from "../../../shared/logger";

export const getTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = getTaskById(id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  log("Create Task payload:", req.body);
  res.status(200).json({ status: "ok" });
};
