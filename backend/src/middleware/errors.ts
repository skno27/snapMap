import { NextFunction, Request, RequestHandler, Response } from "express";
import z from "zod";

export class ValidationError extends Error {
  constructor(public validationErrors: z.ZodIssue[]) {
    super("Validation Error");
    this.name = this.constructor.name;
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(404).json({ error: "Resource not found" });
  }

  console.log("Error message", err.message);
  console.log("Error code", err.code);
  console.log("Error stack", err.stack);

  next(err);
};

export default { errorHandler };
