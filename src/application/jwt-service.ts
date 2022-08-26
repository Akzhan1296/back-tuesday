import { ObjectId } from 'mongodb';
import { JwtRepository } from '../repositories/jwt-db-repository';
import { RefeshTokenType } from '../types/types';

export class JwtService {
  jwtRepository: JwtRepository;
  constructor(){
    this.jwtRepository = new JwtRepository();
  }
  async addRefreshToken(tokenData: RefeshTokenType): Promise<boolean> {
    return this.jwtRepository.addRefreshToken(tokenData);
  }
  async getRefreshTokenId(tokenId: ObjectId): Promise<string | undefined> {
    return this.jwtRepository.getRefreshTokenId(tokenId);
  }
  async deleteRefreshToken(tokenId: ObjectId): Promise<boolean> {
    return this.jwtRepository.deleteRefreshToken(tokenId);
  }
  async deleteAllRefreshTokens() {}
}

export const jwtService = new JwtService()