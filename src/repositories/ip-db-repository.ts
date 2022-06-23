import { ipCollections } from './db'


export const ipRepostitory = {
  addIp: async (ip: string, path: string, date: number) => {
    await ipCollections.insertOne({ ip, path, date });
    //await ipCollections.drop({ ip, date: [date] });
  },
  findIp: async (ip: string, path: string, dateLeft: number, dateRight: number) => {
    const result = await ipCollections.find({ ip, path, date: { $gte: dateLeft, $lte: dateRight } }).toArray();
    return result;
  },

};