import { ObjectId } from "mongodb";
import { UserDBType } from "../types/types";
import { UserModelClass } from "./db";

export class UsersRepository {
  async createUser(newUser: UserDBType): Promise<UserDBType> {
    await UserModelClass.insertMany(newUser);
    return newUser as UserDBType;
  }
  async findByLogin(login: string): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ login }).lean();
    return user;
  }
  async findUserByEmail(email: string): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ email }).lean();
    return user;
  }
  async updateCode(email: string, confirmCode: ObjectId): Promise<boolean> {
    const result = await UserModelClass.updateOne({ email }, { ...confirmCode });
    return result.matchedCount === 1
  }
  async findById(id: ObjectId): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ _id: id })
    return user;
  }
  async getUserByCode(confirmCode: ObjectId): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ confirmCode })
    return user;
  }
  async getAllUsers(skip: number, limit: number): Promise<UserDBType[]> {
    return await UserModelClass.find().skip(skip).limit(limit).lean();
  }
  async getAllUsersCount() {
    return await UserModelClass.count();
  }
  async deleteUser(id: ObjectId): Promise<boolean> {
    const result = await UserModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
  async confirmRegistrationCode(code: ObjectId): Promise<boolean> {
    const result = await UserModelClass.updateOne({ confirmCode: code }, { $set: { isConfirmed: true } });
    return result.matchedCount === 1
  }
}

export const usersRepository = new UsersRepository();