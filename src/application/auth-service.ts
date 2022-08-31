import bcrypt from 'bcrypt'
import { injectable, inject } from 'inversify';
import { ObjectId } from 'mongodb';
import { emailAdapter } from '../adapter/email-adapter';
import { UsersRepository } from '../repositories/users-db-repository';
import { UserDBType } from '../types/types';
import { generateHash } from '../utils/utils';
import { UsersService } from './users-service';

@injectable()

export class AuthService {

  constructor(@inject(UsersService) protected usersService: UsersService, @inject(UsersRepository) protected usersRepository: UsersRepository) {}
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
    const passwordHash = await generateHash(password);
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