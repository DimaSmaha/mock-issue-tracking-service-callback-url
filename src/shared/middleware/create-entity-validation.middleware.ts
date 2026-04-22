import { Request, Response, NextFunction } from "express";

const requiredFields = ["title", "description", "type"] as const;

export const validateCreateEntityPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.is("application/json")) {
    return res.status(400).json({
      status: "error",
      message: "Request body must be sent as application/json.",
    });
  }

  const missingFields = requiredFields.filter((field) => {
    const value = req.body?.[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "error",
      message:
        "Fields title, description, and type are required as non-empty strings in the JSON body.",
      missingFields,
    });
  }

  next();
};
