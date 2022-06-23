import { NextFunction, Request, Response } from "express";
import { jwtUtility } from "../application/jwt-utility";
import { usersService } from "../domain/users-service";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const decoded = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
    const authName = 'Basic'

    if (!req.headers.authorization.includes(authName)) {
      return res.status(401).send();
    }
    const name = decoded.split(':')[0];
    const password = decoded.split(':')[1];

    if (name === 'admin' && password === 'qwerty') {
      return next();
    }
  }
  return res.status(401).send();
};


export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.sendStatus(401)
    return
  }

  const token = req.headers.authorization.split(' ')[1];
  const userId = await jwtUtility.extractUserIdFromToken(token)
  if (userId) {
    const user = await usersService.findUserById(userId);
    req.user = user;
    next();
    return;
  }

  res.send(401)
};