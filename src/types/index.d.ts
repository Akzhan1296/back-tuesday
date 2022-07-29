import { UserType } from './types';

declare global {
  declare namespace Express {
    export interface Request {
      user: AdminDBType | null,
      tokenId: ObjectId;
      isValidId: boolean,
      paginationParams: PaginationParamsType
    }
  }
}