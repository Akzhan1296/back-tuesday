import { //refreshTokensCollections, 
    refreshTokenClass
} from './db';
import { RefeshTokenType } from "../types/types";
import { ObjectId } from 'mongodb';

export const jwtRepository = {
    addRefreshToken: async (tokenData: RefeshTokenType): Promise<boolean> => {
        await refreshTokenClass.insertMany(tokenData);
        return true;
    },
    getRefreshTokenId: async (tokenId: ObjectId): Promise<string | undefined> => {
        const refreshToken = await refreshTokenClass.findOne({ tokenId }).lean();
        return refreshToken?.tokenId as string;
    },
    deleteRefreshToken: async (tokenId: ObjectId): Promise<boolean> => {
        const result = await refreshTokenClass.deleteOne({ tokenId });
        return result.deletedCount === 1
    },
    deleteAllRefreshTokens: async () => {

    }
}