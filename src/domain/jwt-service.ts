import { ObjectId } from 'mongodb';
import { jwtRepository } from '../repositories/jwt-db-repository';
import { RefeshTokenType } from '../types/types';

export const jwtService = {
  addRefreshToken: async (tokenData: RefeshTokenType): Promise<boolean> => {
    return jwtRepository.addRefreshToken(tokenData);
  },
  getRefreshTokenId: (tokenId: ObjectId): Promise<string | undefined> => {
    return jwtRepository.getRefreshTokenId(tokenId);
  },
  deleteRefreshToken: (tokenId: ObjectId): Promise<boolean> => {
    return jwtRepository.deleteRefreshToken(tokenId);
  },
  deleteAllRefreshTokens: () => {

  }
}