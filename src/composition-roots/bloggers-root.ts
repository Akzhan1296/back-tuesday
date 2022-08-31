import 'reflect-metadata';
import { Container } from "inversify";
import { BloggersService } from "../application/bloggers-service";
import { BloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerController } from '../controllers/bloggers-controller'

// const bloggersRepository = new BloggersRepository();
// export const bloggersService = new BloggersService(bloggersRepository);
// export const bloggerControllerInstance = new BloggerController(bloggersService, postsService);

export const bloggersIoCRegistration = (container: Container) => {
  container.bind(BloggerController).to(BloggerController);
  container.bind(BloggersService).to(BloggersService);
  container.bind(BloggersRepository).to(BloggersRepository);
}
