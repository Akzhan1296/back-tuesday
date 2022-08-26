import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";

//service
import { UsersService } from "../application/users-service";
import { AuthService } from '../application/auth-service';

//middleware
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";

export const usersRouter = Router({});

class UsersController {
  authService: AuthService;
  usersService: UsersService;
  constructor() {
    this.authService = new AuthService();
    this.usersService = new UsersService();
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

const usersControllerInstance = new UsersController();

// get all users
usersRouter.get('/',
  paginationMiddleware,
  usersControllerInstance.getUsers.bind(usersControllerInstance));

// create user with JWT
usersRouter.post('/', authMiddleWare, inputValidators.login, inputValidators.password, sumErrorsMiddleware,
  usersControllerInstance.createUser.bind(usersControllerInstance));

// delete user with JWT
usersRouter.delete('/:id', authMiddleWare,
  isValidIdMiddleware,
  usersControllerInstance.deleteUser.bind(usersControllerInstance));