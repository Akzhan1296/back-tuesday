import { NextFunction, Request, Response } from "express";

let counter = 0;
export const countRequestsMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  counter++;
  res.header({ 'count': counter.toString() })
  next();
}