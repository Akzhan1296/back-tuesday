import { UserDBType, UserType } from '../types/types';
import { ObjectId } from 'mongodb'
import jwt, { SignOptions } from 'jsonwebtoken'
import { settings } from '../settings';

export const jwtUtility = {
  /**
   * @param user
   * @return Returns JWT-token
   */
  async createJWT(user: UserDBType) {
    console.log('user', user)
    const payload = { userId: user._id }
    const secretOrPrivateKey = settings.JWT_SECRET;
    const options: SignOptions = {
      expiresIn: '1d',
    }

    const jwtToken = jwt.sign(payload, secretOrPrivateKey, options)

    return jwtToken
  },

  async extractUserIdFromToken(token: string): Promise<ObjectId | null> {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET)
      if (!result.userId) {
        return null
      }
      return new ObjectId(result.userId)
    } catch (error) {
      return null
    }
  }
}
