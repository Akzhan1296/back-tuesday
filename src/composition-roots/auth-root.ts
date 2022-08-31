import 'reflect-metadata';
import { Container } from "inversify";
import { AuthService } from "../application/auth-service";
import { JwtService } from "../application/jwt-service";
import { AuthController } from "../controllers/auth-controller";
import { JwtRepository } from "../repositories/jwt-db-repository";
import { UsersService } from "../application/users-service";
import { UsersRepository } from "../repositories/users-db-repository";
// import { usersRepository, usersService } from './users-root';

// const jwtRepository = new JwtRepository();
// const jwtService = new JwtService(jwtRepository);
// export const authService = new AuthService(usersService, usersRepository);
// export const authControllerInstance = new AuthController(jwtService, authService);


export const authContainer = new Container();
authContainer.bind(AuthController).to(AuthController);
authContainer.bind(JwtService).to(JwtService);
authContainer.bind(JwtRepository).to(JwtRepository);
authContainer.bind(AuthService).to(AuthService);
authContainer.bind(UsersService).to(UsersService);
authContainer.bind(UsersRepository).to(UsersRepository);


