import { BloggersModelClass, RefreshTokenClass, UserModelClass } from './db';
import { BloggerItemDBType, UserDBType } from '../types/types';
import { ObjectId } from 'mongodb';
import { injectable } from 'inversify';

@injectable()
class QueryRepository {
  async getBloggerById(id: ObjectId): Promise<BloggerItemDBType | null> {
    let blogger = await BloggersModelClass.findOne({ _id: id }).lean();
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  }
  async findByLogin(login: string): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ login }).lean();
    return user;
  }
  async findUserByEmail(email: string): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ email }).lean();
    return user;
  }
  async findUserById(id: ObjectId): Promise<UserDBType | null> {
    const user = await UserModelClass.findOne({ _id: id })
    return user;
  }
  async getRefreshTokenId(tokenId: ObjectId): Promise<string | undefined> {
    const refreshToken = await RefreshTokenClass.findOne({ tokenId }).lean();
    return refreshToken?.tokenId as string;
  }
};

export const queryRepository = new QueryRepository();