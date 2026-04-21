import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
