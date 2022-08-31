import 'reflect-metadata';
import { Container } from 'inversify';
import { PostsRepository } from '../repositories/posts-db-repository';
import { PostsService } from '../application/posts-service';
import { PostsController } from '../controllers/posts-controller';

// const postsRepository = new PostsRepository();
// export const postsService = new PostsService(postsRepository);
// export const postsControllerInstance = new PostsController(postsService, commentsService);

export const postIoCRegistration = (container: Container) => {
  container.bind(PostsController).to(PostsController);
  container.bind(PostsService).to(PostsService);
  container.bind(PostsRepository).to(PostsRepository);
}


