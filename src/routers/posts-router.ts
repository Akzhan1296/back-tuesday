
import { Router } from 'express';
import { postsControllerInstance } from '../composition-roots/posts-root';

//middleware
import {
    hasBloggerMiddleware,
    inputValidators,
    sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare, userAuthMiddleware } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware"


export const postsRouter = Router({});

//get all posts
postsRouter.get('/',
    paginationMiddleware,
    postsControllerInstance.getPosts.bind(postsControllerInstance));

//get POST by id
postsRouter.get('/:id',
    isValidIdMiddleware,
    postsControllerInstance.getPostById.bind(postsControllerInstance));

//create post
postsRouter.post('/',
    authMiddleWare,
    hasBloggerMiddleware,
    inputValidators.titleValidate,
    inputValidators.content,
    inputValidators.shortDescription,
    inputValidators.bloggerId,
    sumErrorsMiddleware,
    postsControllerInstance.createPost.bind(postsControllerInstance));

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
    postsControllerInstance.updatePost.bind(postsControllerInstance));

//delete post
postsRouter.delete('/:id',
    authMiddleWare,
    isValidIdMiddleware,
    postsControllerInstance.deletePost.bind(postsControllerInstance));

// adding new comments to posts
postsRouter.post('/:id/comments',
    userAuthMiddleware,
    inputValidators.comments,
    sumErrorsMiddleware,
    isValidIdMiddleware,
    postsControllerInstance.createCommentForSelectedPost.bind(postsControllerInstance)
)

// get selected post comments
postsRouter.get('/:id/comments',
    isValidIdMiddleware,
    paginationMiddleware,
    postsControllerInstance.getCommentsByPostId.bind(postsControllerInstance)
)