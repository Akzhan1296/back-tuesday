import { BloggersService } from "../application/bloggers-service";
import { BloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerController } from '../controllers/bloggers-controller'
import { postsService } from './posts-root';

const bloggersRepository = new BloggersRepository();
export const bloggersService = new BloggersService(bloggersRepository);
export const bloggerControllerInstance = new BloggerController(bloggersService, postsService);
