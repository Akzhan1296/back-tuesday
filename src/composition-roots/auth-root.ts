import 'reflect-metadata';
import { Container } from "inversify";
import { AuthService } from "../application/auth-service";
import { JwtService } from "../application/jwt-service";
import { AuthController } from "../controllers/auth-controller";
import { JwtRepository } from "../repositories/jwt-db-repository";

// const jwtRepository = new JwtRepository();
// const jwtService = new JwtService(jwtRepository);
// export const authService = new AuthService(usersService, usersRepository);
// export const authControllerInstance = new AuthController(jwtService, authService);

export const authIoCRegistration = (container: Container) => {
  container.bind(AuthController).to(AuthController);
  container.bind(JwtService).to(JwtService);
  container.bind(JwtRepository).to(JwtRepository);
  container.bind(AuthService).to(AuthService);
}
