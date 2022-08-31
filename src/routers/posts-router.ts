
import { Router } from 'express';
import { postsContainer } from '../composition-roots/posts-root';

//middleware
import {
    hasBloggerMiddleware,
    inputValidators,
    sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare, userAuthMiddleware } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware"
import { PostsController } from '../controllers/posts-controller';


export const postsRouter = Router({});
const postsController = postsContainer.resolve(PostsController);

//get all posts
postsRouter.get('/',
    paginationMiddleware,
    postsController.getPosts.bind(postsController));

//get POST by id
postsRouter.get('/:id',
    isValidIdMiddleware,
    postsController.getPostById.bind(postsController));

//create post
postsRouter.post('/',
    authMiddleWare,
    hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.shortDescription,
    inputValidators.bloggerId,
    sumErrorsMiddleware,
    postsController.createPost.bind(postsController));

//update post
postsRouter.put('/:id',
    authMiddleWare,
    hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.shortDescription,
    inputValidators.bloggerId,
    sumErrorsMiddleware,
    isValidIdMiddleware,
    postsController.updatePost.bind(postsController));

//delete post
postsRouter.delete('/:id',
    authMiddleWare,
    isValidIdMiddleware,
    postsController.deletePost.bind(postsController));

// adding new comments to posts
postsRouter.post('/:id/comments',
    userAuthMiddleware,
    inputValidators.comments,
    sumErrorsMiddleware,
    isValidIdMiddleware,
    postsController.createCommentForSelectedPost.bind(postsController)
)

// get selected post comments
postsRouter.get('/:id/comments',
    isValidIdMiddleware,
    paginationMiddleware,
    postsController.getCommentsByPostId.bind(postsController)
)