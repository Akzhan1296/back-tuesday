import { ipCollections } from './db'


export const ipRepostitory = {
  addIp: async (ip: string, date: number) => {
    await ipCollections.insertOne({ ip, date: [date] });
    //await ipCollections.drop({ ip, date: [date] });
  },
  updateIp: async (ip: string, date: number) => {
    await ipCollections.updateOne({ ip }, { $push: { date: date } });
  },
  findIp: async (ip: string) => {
    const result = await ipCollections.findOne({ ip });
    return result;
  },

};