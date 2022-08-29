//middleware
import { Router } from "express";
import { usersControllerInstance } from "../composition-roots/users-root";
import { authMiddleWare } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";

export const usersRouter = Router({});

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