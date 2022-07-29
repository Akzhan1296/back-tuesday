import { refreshTokensCollections } from './db';

import { RefeshTokenType } from "../types/types";
import { ObjectId } from 'mongodb';

export const jwtRepository = {
    addRefreshToken: async (tokenData: RefeshTokenType): Promise<boolean> => {
        await refreshTokensCollections.insertOne(tokenData);
        return true;
    },
    getRefreshToken: async (tokenId: ObjectId): Promise<string | null> => {
        const refreshToken = await refreshTokensCollections.findOne({ tokenId });
        console.log('tokenId', tokenId);
        console.log('refreshToken', refreshToken)
        return refreshToken;
    },
    deleteRefreshToken: async (tokenId: ObjectId):Promise<boolean> => {
        const result = await refreshTokensCollections.deleteOne({ tokenId});
        return result.deletedCount === 1
    },
    deleteAllRefreshTokens: async () => {

    }
}