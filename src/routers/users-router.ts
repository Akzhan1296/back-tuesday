//middleware
import { Router } from "express";
import { usersContainer } from "../composition-roots/users-root";
import { UsersController } from "../controllers/users-controller";
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";

export const usersRouter = Router({});
const usersController = usersContainer.resolve(UsersController);

// get all users
usersRouter.get('/',
    paginationMiddleware,
    usersController.getUsers.bind(usersController));

// create user with JWT
usersRouter.post('/', authMiddleWare, inputValidators.login, inputValidators.password, sumErrorsMiddleware,
    usersController.createUser.bind(usersController));

// delete user with JWT
usersRouter.delete('/:id', authMiddleWare,
    isValidIdMiddleware,
    usersController.deleteUser.bind(usersController));