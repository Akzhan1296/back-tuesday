import { ipModelClass } from './db'


export const ipRepostitory = {
  addIp: async (ip: string, path: string, date: number) => {
    await ipModelClass.insertMany({ ip, path, date });
  },
  findIp: async (ip: string, path: string, dateLeft: number, dateRight: number) => {
    const result = await ipModelClass.find({ ip, path, date: { $gte: dateLeft, $lte: dateRight } }).lean();
    return result;
  },

};