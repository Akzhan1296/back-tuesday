import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { usersService } from "../domain/users-service";
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";

export const usersRouter = Router({});

class UsersController {
  async getUsers(req: Request, res: Response) {
    const usersWithPagination = await usersService.getUsers(req.paginationParams);
    return res.status(200).send(usersWithPagination)
  }
  async createUser(req: Request, res: Response) {
    const newUser = await usersService.createUser(req.body.login, req.body.password, '', null);
    return res.status(201).send({ login: newUser.login, id: newUser._id });
  }
  async deleteUser(req: Request, res: Response) {
    if (!req.isValidId) return res.send(404);

    const id = new ObjectId(req.params.id);
    const isDeleted = await usersService.deleteUser((id));

    if (isDeleted) {
      return res.send(204);
    } else {
      return res.send(404);
    }
  }
}

const usersControllerInstance = new UsersController();

// get all users
usersRouter.get('/',
  paginationMiddleware,
  usersControllerInstance.getUsers);

// create user with JWT
usersRouter.post('/', authMiddleWare, inputValidators.login, inputValidators.password, sumErrorsMiddleware,
  usersControllerInstance.createUser);

// delete user with JWT
usersRouter.delete('/:id', authMiddleWare,
  isValidIdMiddleware,
  usersControllerInstance.deleteUser);