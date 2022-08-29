import { ObjectId } from 'mongodb';
import { PaginationParamsType, UserDBType } from '../types/types';
import { UsersRepository } from '../repositories/users-db-repository';

export class UsersService {
  constructor(protected usersRepository: UsersRepository) { }

  async getUsers(paginationParams: PaginationParamsType) {
    const { pageNumber, pageSize, skip } = paginationParams;

    const users = await this.usersRepository.getAllUsers(skip, pageSize);
    const totalCount = await this.usersRepository.getAllUsersCount();
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: users.map(u => ({ id: u._id, login: u.login })),
    }
  }
  async createUser(userLogin: string, userPassword: string, email: string, confirmCode: ObjectId | null, passwordHash: string): Promise<UserDBType> {
    const newUser = new UserDBType(
      new ObjectId(),
      userLogin,
      passwordHash,
      new Date(),
      confirmCode,
      false,
      email
    );
    return this.usersRepository.createUser(newUser);
  }
  async findUserById(id: ObjectId): Promise<UserDBType | null> {
    return this.usersRepository.findUserById(id);
  }
  async updateCode(email: string, code: ObjectId): Promise<boolean> {
    return this.usersRepository.updateCode(email, code);
  }
  async findUserByEmail(email: string): Promise<UserDBType | null> {
    return this.usersRepository.findUserByEmail(email);
  }
  async getUserByCode(confirmCode: ObjectId): Promise<UserDBType | null> {
    return this.usersRepository.getUserByCode(confirmCode);
  }
  async deleteUser(id: ObjectId): Promise<boolean> {
    return this.usersRepository.deleteUser(id);
  }
  async confirmRegistrationCode(code: ObjectId): Promise<boolean> {
    return this.usersRepository.confirmRegistrationCode(code);
  }
};