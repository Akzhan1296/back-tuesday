import {
  RefreshTokenClass
} from './db';
import { RefeshTokenType } from "../types/types";
import { ObjectId } from 'mongodb';

export class JwtRepository {
  async addRefreshToken(tokenData: RefeshTokenType): Promise<boolean> {
    await RefreshTokenClass.insertMany(tokenData);
    return true;
  }
  async getRefreshTokenId(tokenId: ObjectId): Promise<string | undefined> {
    const refreshToken = await RefreshTokenClass.findOne({ tokenId }).lean();
    return refreshToken?.tokenId as string;
  }
  async deleteRefreshToken(tokenId: ObjectId): Promise<boolean> {
    const result = await RefreshTokenClass.deleteOne({ tokenId });
    return result.deletedCount === 1
  }
  async deleteAllRefreshTokens() {

  }
};