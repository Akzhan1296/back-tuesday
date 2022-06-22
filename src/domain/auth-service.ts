import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';
import { emailAdapter } from '../adapter/email-adapter';
import { usersRepository } from '../repositories/users-db-repository';
import { UserDBType, UserType } from '../types/types';
import { usersService } from './users-service';


export const authService = {
  generateHash: async (password: string) => {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  },

  /**
   *
   * @param email
   * @param password
   * @return null if credentials are incorrect and admin entity in opposite case
   */
  async checkCredentials(userLogin: string, password: string): Promise<UserDBType | null> {
    let user = await usersRepository.findByLogin(userLogin);
    console.log(user);
    if (!user) {
      return null
    }
    let result = await bcrypt.compare(password, user.passwordHash)
    if (result) {
      return user;
    }
    return null
  },

  async registration(email: string, login: string, password: string) {
    const confirmCode = new ObjectId();
    const newUser = await usersService.createUser(login, password, email, confirmCode);
    if (newUser) {
      await emailAdapter.sendEmail(email, 'Lesson05', `<a href="https://akzhanlesson04main.herokuapp.com?code=${confirmCode}">Confirm email</a>`)
    }
  },
  async confirmRegistrationCode(code: ObjectId) {
    usersService.confirmRegistrationCode(code)
  },
  async getUserByCode(confirmCode: ObjectId){
    return usersService.getUserByCode(confirmCode);
  },
  async resendCode(email: string) {
    const user = await usersService.findUserByEmail(email);
    if(user){
      await emailAdapter.sendEmail(email, 'Lesson05', `<a href="https://akzhanlesson04main.herokuapp.com?code=${user.confirmCode}">Confirm email</a>`)
    }
  }
};