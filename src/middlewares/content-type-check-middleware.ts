import { NextFunction, Request, Response } from "express";

export const checkContentTypeMiddleWare = (typeContent: string) => (req: Request, res: Response, next: NextFunction) => {
  const contype = req.headers['content-type'];
  if (contype !== typeContent) {
    return res.status(400).send({
      "errorsMessages": "Bad content type content type",
      "resultCode": 1
    });
  } else {
    next();
  }

}