import { Request, Response, NextFunction } from "express";

const requiredTextFields = ["title", "description", "type"] as const;

const hasValidJsonContentType = (req: Request) => req.is("application/json");

export const validateCreateEntityPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!hasValidJsonContentType(req)) {
    return res.status(400).json({
      status: "error",
      message: "Request body must be sent as application/json.",
    });
  }

  const missingFields = requiredTextFields.filter((field) => {
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

export const validateCreateTestCasePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!hasValidJsonContentType(req)) {
    return res.status(400).json({
      status: "error",
      message: "Request body must be sent as application/json.",
    });
  }

  const missingTextFields = ["title", "type"].filter((field) => {
    const value = req.body?.[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  const steps = req.body?.steps;
  const hasInvalidSteps =
    !Array.isArray(steps) ||
    steps.length === 0 ||
    steps.some(
      (step) => typeof step !== "string" || step.trim().length === 0
    );

  if (missingTextFields.length > 0 || hasInvalidSteps) {
    return res.status(400).json({
      status: "error",
      message:
        "Fields title and type are required as non-empty strings, and steps is required as a non-empty string array in the JSON body.",
      missingFields: hasInvalidSteps
        ? [...missingTextFields, "steps"]
        : missingTextFields,
    });
  }

  next();
};
