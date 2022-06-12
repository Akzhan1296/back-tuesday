import { ObjectId } from 'mongodb';
import { authService } from './auth-service';
import { PaginationParamsType, UserDBType, UserType } from '../types/types';
import { usersRepository } from '../repositories/users-db-repository';


export const usersService = {

  getUsers: async (paginationParams: PaginationParamsType) => {
    const { pageNumber, pageSize, skip } = paginationParams;

    const users = await usersRepository.getAllUsers(skip, pageSize);
    const totalCount = await usersRepository.getAllUsersCount();
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: users.map(u => ({ id: u._id, login: u.login })),
    }
  },

  createUser: async (userLogin: string, userPassword: string): Promise<UserDBType> => {
    const passwordHash = await authService.generateHash(userPassword);

    const newUser: UserDBType = {
      _id: new ObjectId(),
      login: userLogin,
      passwordHash,
      createdAt: new Date(),
    };

    return usersRepository.createUser(newUser);
  },
  findUserById: async (id: ObjectId): Promise<UserDBType | null> => {
    return usersRepository.findById(id);
  },
  deleteUser: async (id: ObjectId): Promise<boolean> => {
    return usersRepository.deleteUser(id);
  }
};