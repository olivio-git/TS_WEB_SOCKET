import { NextFunction, Request, Response } from "express";
import ClientError from "./error";

const catchedAsync = (fn: (req: Request, res: Response , next:NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res,next).catch((err: ClientError) => next(err));
  };
};

export = catchedAsync;
