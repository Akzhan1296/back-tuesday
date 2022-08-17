import { ObjectId } from "mongodb";
import { UserDBType, UserType } from "../types/types";
import { usersCollection, userModelClass } from "./db";

export const usersRepository = {
  createUser: async (newUser: UserDBType): Promise<UserDBType> => {
    await userModelClass.insertMany(newUser);
    return newUser as UserDBType;
  },
  findByLogin: async (login: string): Promise<UserDBType | null> => {
    const user = await userModelClass.findOne({ login }).lean();
    return user;
  },
  findUserByEmail: async (email: string): Promise<UserDBType | null> => {
    const user = await userModelClass.findOne({ email }).lean();
    return user;
  },
  updateCode: async (email: string, confirmCode: ObjectId): Promise<boolean> => {
    const result = await userModelClass.updateOne({ email }, { ...confirmCode });
    return result.matchedCount === 1
  },
  findById: async (id: ObjectId): Promise<UserDBType | null> => {
    const user = await userModelClass.findOne({ _id: id })
    return user;
  },
  getUserByCode: async (confirmCode: ObjectId): Promise<UserDBType | null> => {
    const user = await userModelClass.findOne({ confirmCode })
    return user;
  },
  getAllUsers: async (skip: number, limit: number): Promise<UserDBType[]> => {
    return await userModelClass.find().skip(skip).limit(limit).lean();
  },
  getAllUsersCount: async () => {
    return await userModelClass.count();
  },
  deleteUser: async (id: ObjectId): Promise<boolean> => {
    const result = await userModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  confirmRegistrationCode: async (code: ObjectId): Promise<boolean> => {
    const result = await userModelClass.updateOne({ confirmCode: code }, { $set: { isConfirmed: true } });
    return result.matchedCount === 1
  },
  drop: async () => {
    await userModelClass.collection.drop();
  }
};