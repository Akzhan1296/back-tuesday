import { NextFunction, Request, Response } from "express";
import { ipRepostitory } from '../repositories/ip-db-repository';
// const arr = [''];

export const blockIpMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const dateZero = new Date().getTime() - 10000;
  const date = new Date().getTime();
  const ipData = await ipRepostitory.findIp(ip as string);

  if (!ipData) {
    await ipRepostitory.addIp(ip as string, new Date().getTime());
    next();
  }

  if (ipData) {
    await ipRepostitory.updateIp(ip as string, new Date().getTime());

    let result = ipData.date.filter((d: number) => d > dateZero && d < date);

    // 4 because we already have 1 ip
    if (result.length > 4) {
      return res.status(429).send();
    } else {
      next();
    }
  }
}