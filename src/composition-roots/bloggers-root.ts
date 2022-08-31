import 'reflect-metadata';
import { BloggersService } from "../application/bloggers-service";
import { BloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerController } from '../controllers/bloggers-controller'
import { PostsService } from '../application/posts-service';
import { Container } from "inversify";
import { PostsRepository } from '../repositories/posts-db-repository';

// const bloggersRepository = new BloggersRepository();
// export const bloggersService = new BloggersService(bloggersRepository);
// export const bloggerControllerInstance = new BloggerController(bloggersService, postsService);

export const bloggersContainer = new Container();
bloggersContainer.bind(BloggerController).to(BloggerController);
bloggersContainer.bind(BloggersService).to(BloggersService);
bloggersContainer.bind(PostsService).to(PostsService);
bloggersContainer.bind(PostsRepository).to(PostsRepository);
bloggersContainer.bind(BloggersRepository).to(BloggersRepository);
