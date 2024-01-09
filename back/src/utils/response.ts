import { Response } from "express";

const response = (
  res: Response,
  statusCode: number,
  data: Record<string, unknown> | Record<string, unknown>[]
) => {
  res.status(statusCode).json({
    error: false,
    data,
  });
};

export = response;
