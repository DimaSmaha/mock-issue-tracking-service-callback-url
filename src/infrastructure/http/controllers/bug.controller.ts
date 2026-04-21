import { Request, Response } from "express";
import { getBugById } from "../../../application/services/bug.service";
import { log } from "../../../shared/logger";

export const getBug = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bug = getBugById(id);

  if (!bug) return res.status(404).json({ message: "Bug not found" });

  res.json(bug);
};

export const createBug = (req: Request, res: Response) => {
  log("Create Bug payload:", req.body);
  res.status(200).json({ status: "ok" });
};
