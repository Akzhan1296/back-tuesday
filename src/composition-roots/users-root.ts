import { UsersService } from "../application/users-service";
import { UsersController } from "../controllers/users-controller";
import { UsersRepository } from "../repositories/users-db-repository";
import { authService } from "./auth-root";


export const usersRepository = new UsersRepository();
export const usersService = new UsersService(usersRepository);
export const usersControllerInstance = new UsersController(usersService, authService);
