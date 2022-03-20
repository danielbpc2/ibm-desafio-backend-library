import { NextFunction, Request, Response } from "express";
import AppError from "../../../errors/AppError";

/**
 * if there is an error during a request it should return a response in a more user friendly message.
 * @param err error
 * @param _request request
 * @param response response
 * @param _next next middleware
 * @returns response tro the client
 */
const errorHandlingMiddleware = (
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  return response.status(500).json({ status: 500, message: err.toString() });
};

export default errorHandlingMiddleware;
