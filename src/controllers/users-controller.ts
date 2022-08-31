import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { ObjectId } from "mongodb";

//service
import { UsersService } from "../application/users-service";
import { generateHash } from "../utils/utils";

@injectable()
export class UsersController {
  constructor(@inject(UsersService) protected usersService: UsersService) {
  }

  async getUsers(req: Request, res: Response) {
    const usersWithPagination = await this.usersService.getUsers(req.paginationParams);
    return res.status(200).send(usersWithPagination)
  }
  async createUser(req: Request, res: Response) {
    const passwordHash = await generateHash(req.body.password);
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


