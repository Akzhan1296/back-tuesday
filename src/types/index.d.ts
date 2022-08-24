import {PaginationParamsType, UserDBType } from './types';

declare global {
  declare namespace Express {
    export interface Request {
      user: UserDBType | null,
      tokenId: ObjectId;
      isValidId: boolean,
      paginationParams: PaginationParamsType
    }
  }
}