import { NextFunction, Request, Response } from "express";
import { ipRepostitory } from '../repositories/ip-db-repository';
// const arr = [''];

export const blockIpMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const path = req.path;
  const dateZero = new Date().getTime() - 10000;
  const date = new Date().getTime();
  await ipRepostitory.addIp(ip as string, path, new Date().getTime());

  const ipData = await ipRepostitory.findIp(ip as string, path, dateZero, date);

  if (ipData.length > 5) {
    return res.status(429).send();
  } else {
    next();
  }
}