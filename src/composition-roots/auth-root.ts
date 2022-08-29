import { AuthService } from "../application/auth-service";
import { JwtService } from "../application/jwt-service";
import { AuthController } from "../controllers/auth-controller";
import { JwtRepository } from "../repositories/jwt-db-repository";
import { usersRepository, usersService } from './users-root';

const jwtRepository = new JwtRepository();
const jwtService = new JwtService(jwtRepository);
export const authService = new AuthService(usersService, usersRepository);

export const authControllerInstance = new AuthController(jwtService, authService);
