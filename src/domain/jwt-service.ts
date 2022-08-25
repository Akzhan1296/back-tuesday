import { ObjectId } from 'mongodb';
import { jwtRepository } from '../repositories/jwt-db-repository';
import { RefeshTokenType } from '../types/types';

class JwtService {
  async addRefreshToken(tokenData: RefeshTokenType): Promise<boolean> {
    return jwtRepository.addRefreshToken(tokenData);
  }
  async getRefreshTokenId(tokenId: ObjectId): Promise<string | undefined> {
    return jwtRepository.getRefreshTokenId(tokenId);
  }
  async deleteRefreshToken(tokenId: ObjectId): Promise<boolean> {
    return jwtRepository.deleteRefreshToken(tokenId);
  }
  async deleteAllRefreshTokens() {}
}

export const jwtService = new JwtService()