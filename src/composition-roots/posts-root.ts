import { PostsRepository } from '../repositories/posts-db-repository';
import { PostsService } from '../application/posts-service';
import { PostsController } from '../controllers/posts-controller';
import { commentsService } from './comments-root';


const postsRepository = new PostsRepository();
export const postsService = new PostsService(postsRepository);
export const postsControllerInstance = new PostsController(postsService, commentsService);
