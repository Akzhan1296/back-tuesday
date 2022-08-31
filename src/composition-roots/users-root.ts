import 'reflect-metadata';
import { Container } from "inversify";
import { UsersService } from "../application/users-service";
import { UsersController } from "../controllers/users-controller";
import { UsersRepository } from "../repositories/users-db-repository";

// export const usersRepository = new UsersRepository();
// export const usersService = new UsersService(usersRepository);
// export const usersControllerInstance = new UsersController(usersService);

export const usersContainer = new Container();
usersContainer.bind(UsersController).to(UsersController);
usersContainer.bind(UsersService).to(UsersService);
usersContainer.bind(UsersRepository).to(UsersRepository);
