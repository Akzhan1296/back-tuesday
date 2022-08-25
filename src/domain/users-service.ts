import { ObjectId } from 'mongodb';
import { authService } from './auth-service';
import { PaginationParamsType, UserDBType } from '../types/types';
import { usersRepository } from '../repositories/users-db-repository';

class UsersService {
  async getUsers(paginationParams: PaginationParamsType) {
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
  }
  async createUser(userLogin: string, userPassword: string, email: string, confirmCode: ObjectId | null,): Promise<UserDBType> {
    const passwordHash = await authService.generateHash(userPassword);

    const newUser = new UserDBType(
      new ObjectId(),
      userLogin,
      passwordHash,
      new Date(),
      confirmCode,
      false,
      email
    );

    return usersRepository.createUser(newUser);
  }
  async findUserById(id: ObjectId): Promise<UserDBType | null> {
    return usersRepository.findById(id);
  }
  async updateCode(email: string, code: ObjectId): Promise<boolean> {
    return usersRepository.updateCode(email, code);
  }
  async findUserByEmail(email: string): Promise<UserDBType | null> {
    return usersRepository.findUserByEmail(email);
  }
  async getUserByCode(confirmCode: ObjectId): Promise<UserDBType | null> {
    return usersRepository.getUserByCode(confirmCode);
  }
  async deleteUser(id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(id);
  }
  async confirmRegistrationCode(code: ObjectId): Promise<boolean> {
    return usersRepository.confirmRegistrationCode(code);
  }
}

export const usersService = new UsersService();