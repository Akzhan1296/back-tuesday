import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import {
  hasBloggerMiddleware,
  inputValidators,
  sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare, userAuthMiddleware } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware"
import { CommentDBType, QueryType } from '../types/types';
import { commentsService } from "../domain/comments-service";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";

export const postsRouter = Router({});

class PostsController {
  async getPosts(req: Request, res: Response) {
    const result = await postsService.getPosts(req.paginationParams);
    res.status(200).send(result);
  }
  async getPostById(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();
    const postId = new ObjectId(req.params.id);
    let foundPost = await postsService.getPostById(postId);
    if (foundPost) {
      return res.status(200).send(transferIdToString(foundPost));
    } else {
      return res.status(404).send();
    }
  }
  async createPost(req: Request, res: Response) {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const newPost = await postsService.createPost(title, shortDescription, content, bloggerId);

    return res.status(201).send(transferIdToString(newPost));
  }
  async updatePost(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const isUpdated = await postsService.updatePost(postId, title, shortDescription, content, bloggerId)

    if (isUpdated) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
  async deletePost(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    const isDeleted = await postsService.deletePost(postId);
    if (isDeleted) {
      return res.send(204)
    } else {
      return res.send(404)
    }
  }
  async createCommentForSelectedPost(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    const comment = req.body.content;
    const user = req.user;

    let foundPost = await postsService.getPostById(postId);

    if (foundPost && user) {
      const newComment: CommentDBType = await commentsService.createCommentForSelectedPost(comment, user.login, user._id, postId);
      const { postId: postId2, ...params } = newComment;

      return res.status(201).send(transferIdToString(params));
    }
    return res.status(404).send();
  }
  async getCommentsByPostId(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    let foundPost = await postsService.getPostById(postId);

    if (!foundPost) {
      return res.status(404).send();
    }

    const commentsWithPagination = await commentsService.getCommentsByPostId(postId, req.paginationParams);
    return res.status(200).send(commentsWithPagination)
  }
}

const postsControllerInstance = new PostsController();

//get all posts
postsRouter.get('/',
  paginationMiddleware,
  postsControllerInstance.getPosts);

//get POST by id
postsRouter.get('/:id',
  isValidIdMiddleware,
  postsControllerInstance.getPostById);

//create post
postsRouter.post('/',
  authMiddleWare,
  hasBloggerMiddleware,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  inputValidators.bloggerId,
  sumErrorsMiddleware,
  postsControllerInstance.createPost);

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
  postsControllerInstance.updatePost);

//delete post
postsRouter.delete('/:id',
  authMiddleWare,
  isValidIdMiddleware,
  postsControllerInstance.deletePost);

// adding new comments to posts
postsRouter.post('/:id/comments',
  userAuthMiddleware,
  inputValidators.comments,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  postsControllerInstance.createCommentForSelectedPost
)

// get selected post comments
postsRouter.get('/:id/comments',
  isValidIdMiddleware,
  paginationMiddleware,
  postsControllerInstance.getCommentsByPostId
)