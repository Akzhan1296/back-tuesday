import { ObjectId } from 'mongodb';
import { jwtRepository } from '../repositories/jwt-db-repository';
import { RefeshTokenType } from '../types/types';

export const jwtService = {
  addRefreshToken: async (tokenData: RefeshTokenType): Promise<boolean> => {
    return jwtRepository.addRefreshToken(tokenData);
  },
  getRefreshToken: (tokenId: ObjectId): Promise<string | null> => {
    return jwtRepository.getRefreshToken(tokenId);
  },
  deleteRefreshToken: (tokenId: ObjectId): Promise<boolean> => {
    return jwtRepository.deleteRefreshToken(tokenId);
  },
  deleteAllRefreshTokens: () => {

  }
}