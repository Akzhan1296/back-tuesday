import 'reflect-metadata';
import { PostsRepository } from '../repositories/posts-db-repository';
import { PostsService } from '../application/posts-service';
import { PostsController } from '../controllers/posts-controller';
import { Container } from 'inversify';
import { CommentsService } from '../application/comments-service';
import { CommentsRepository } from '../repositories/comments-db-repositry';

// const postsRepository = new PostsRepository();
// export const postsService = new PostsService(postsRepository);
// export const postsControllerInstance = new PostsController(postsService, commentsService);

export const postsContainer = new Container();
postsContainer.bind(PostsController).to(PostsController);
postsContainer.bind(CommentsService).to(CommentsService);
postsContainer.bind(CommentsRepository).to(CommentsRepository);
postsContainer.bind(PostsService).to(PostsService);
postsContainer.bind(PostsRepository).to(PostsRepository);

