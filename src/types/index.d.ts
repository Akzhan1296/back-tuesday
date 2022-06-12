import { UserType } from './types';

declare global {
  declare namespace Express {
    export interface Request {
      user: AdminDBType | null,
      isValidId: boolean
    }
  }
}