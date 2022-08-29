import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';
import { emailAdapter } from '../adapter/email-adapter';
import { UsersRepository } from '../repositories/users-db-repository';
import { UserDBType } from '../types/types';
import { UsersService } from './users-service';

export class AuthService {

  constructor(protected usersService: UsersService, protected usersRepository: UsersRepository) {}

  async generateHash(password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  }
  /**
   *
   * @param email
   * @param password
   * @return null if credentials are incorrect and admin entity in opposite case
   */
  async checkCredentials(userLogin: string, password: string): Promise<UserDBType | null> {
    let user = await this.usersRepository.findByLogin(userLogin);
    if (!user) {
      return null
    }
    let result = await bcrypt.compare(password, user.passwordHash)
    if (result) {
      return user;
    }
    return null
  }
  async registration(email: string, login: string, password: string) {
    const confirmCode = new ObjectId();
    const passwordHash = await this.generateHash(password);
    const newUser = await this.usersService.createUser(login, password, email, confirmCode, passwordHash);
    if (newUser) {
      await emailAdapter.sendEmail(email, 'Lesson05', `<a href="http://localhost:3000/?code=${confirmCode}">Confirm email</a>`)
    }
  }
  async confirmRegistrationCode(code: ObjectId) {
    this.usersService.confirmRegistrationCode(code)
  }
  async getUserByCode(confirmCode: ObjectId) {
    return this.usersService.getUserByCode(confirmCode);
  }
  async resendCode(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const confirmCode = new ObjectId();
    if (user) {
      await emailAdapter.sendEmail(email, 'Lesson05', `<a href="https://akzhanlesson04main.herokuapp.com?code=${confirmCode}">Confirm email</a>`)
      await this.usersService.updateCode(email, confirmCode);
    }
  }
};