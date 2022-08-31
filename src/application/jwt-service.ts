import { injectable, inject } from 'inversify';
import { ObjectId } from 'mongodb';
import { JwtRepository } from '../repositories/jwt-db-repository';
import { RefeshTokenType } from '../types/types';

@injectable()
export class JwtService {
  constructor(@inject(JwtRepository) protected jwtRepository: JwtRepository){}
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
};