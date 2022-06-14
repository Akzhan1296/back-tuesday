import { ObjectId } from "mongodb";
import { UserDBType, UserType } from "../types/types";
import { usersCollection } from "./db";

export const usersRepository = {
  createUser: async (newUser: UserDBType): Promise<UserDBType> => {
    await usersCollection.insertOne(newUser);
    return newUser as UserDBType;
  },
  findByLogin: async (login: string): Promise<UserDBType | null> => {
    const user = await usersCollection.findOne({ login });
    return user;
  },
  findUserByEmail: async (email: string): Promise<UserDBType | null> => {
    const user = await usersCollection.findOne({ email });
    return user;
  },
  findById: async (id: ObjectId): Promise<UserDBType | null> => {
    const user = await usersCollection.findOne({ _id: id })
    return user;
  },
  getAllUsers: async (skip: number, limit: number): Promise<UserDBType[]> => {
    return await usersCollection.find().skip(skip).limit(limit).toArray();
  },
  getAllUsersCount: async () => {
    return await usersCollection.count();
  },
  deleteUser: async (id: ObjectId): Promise<boolean> => {
    const result = await usersCollection.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  confirmRegistrationCode: async (code: ObjectId): Promise<boolean> => {
    const result = await usersCollection.updateOne({ confirmCode: code }, { $set: { isConfirmed: true } });
    return result.matchedCount === 1
  }
};