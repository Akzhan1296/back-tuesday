import { Request, Response } from "express";
import { ObjectId } from "mongodb";

//service
import { UsersService } from "../application/users-service";
import { AuthService } from '../application/auth-service';

export class UsersController {
  constructor(protected usersService: UsersService, protected authService: AuthService) {
  }

  async getUsers(req: Request, res: Response) {
    const usersWithPagination = await this.usersService.getUsers(req.paginationParams);
    return res.status(200).send(usersWithPagination)
  }
  async createUser(req: Request, res: Response) {
    const passwordHash = await this.authService.generateHash(req.body.password);
    const newUser = await this.usersService.createUser(req.body.login, req.body.password, '', null, passwordHash);
    return res.status(201).send({ login: newUser.login, id: newUser._id });
  }
  async deleteUser(req: Request, res: Response) {
    if (!req.isValidId) return res.send(404);

    const id = new ObjectId(req.params.id);
    const isDeleted = await this.usersService.deleteUser((id));

    if (isDeleted) {
      return res.send(204);
    } else {
      return res.send(404);
    }
  }
}


