import { Request, Response, NextFunction } from "express";
import { config } from "../config";

export const simulateDelay = async (
  _: Request,
  __: Response,
  next: NextFunction,
) => {
  await new Promise((r) => setTimeout(r, config.delayMs));
  next();
};

export const simulateFailure = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (Math.random() < config.failureRate) {
    return res.status(500).json({
      status: "error",
      message: "Random simulated failure",
    });
  }
  next();
};
