import { injectable } from 'inversify';
import { IpModelClass } from './db'

@injectable()
class IpRepostitory {
  async addIp(ip: string, path: string, date: number) {
    await IpModelClass.insertMany({ ip, path, date });
  }
  async findIp(ip: string, path: string, dateLeft: number, dateRight: number) {
    const result = await IpModelClass.find({ ip, path, date: { $gte: dateLeft, $lte: dateRight } }).lean();
    return result;
  }
}

export const ipRepostitory = new IpRepostitory();