import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export const isValidIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let isValidId;
  try{
    new ObjectId(req.params.id);
    isValidId = true;
  } catch(err){
    isValidId = false;
  }
  req.isValidId = isValidId;
  next();
}
