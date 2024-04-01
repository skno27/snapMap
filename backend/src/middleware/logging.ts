import { Request, Response, NextFunction, RequestHandler } from "express";

const logRequest: RequestHandler = (req, res, next) => {
  console.log(`Client request to ${req.path}.`);
  next();
};

export default { logRequest };
