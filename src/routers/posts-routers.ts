import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";

//services
import { PostsService } from "../domain/posts-service";
import { CommentsService } from "../domain/comments-service";

//middleware
import {
  hasBloggerMiddleware,
  inputValidators,
  sumErrorsMiddleware
} from '../middlewares/input-validator-middleware';
import { authMiddleWare, userAuthMiddleware } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware"

import { CommentDBType } from '../types/types';
import { transferIdToString } from "../application/utils";

export const postsRouter = Router({});

class PostsController {
  postsService: PostsService;
  commentsService: CommentsService;

  constructor(){
  this.postsService = new PostsService();
  this.commentsService = new CommentsService();
  }

  async getPosts(req: Request, res: Response) {
    const result = await this.postsService.getPosts(req.paginationParams);
    res.status(200).send(result);
  }
  async getPostById(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();
    const postId = new ObjectId(req.params.id);
    let foundPost = await this.postsService.getPostById(postId);
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

    const newPost = await this.postsService.createPost(title, shortDescription, content, bloggerId);

    return res.status(201).send(transferIdToString(newPost));
  }
  async updatePost(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    const isUpdated = await this.postsService.updatePost(postId, title, shortDescription, content, bloggerId)

    if (isUpdated) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
  async deletePost(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    const isDeleted = await this.postsService.deletePost(postId);
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

    let foundPost = await this.postsService.getPostById(postId);

    if (foundPost && user) {
      const newComment: CommentDBType = await this.commentsService.createCommentForSelectedPost(comment, user.login, user._id, postId);
      const { postId: postId2, ...params } = newComment;

      return res.status(201).send(transferIdToString(params));
    }
    return res.status(404).send();
  }
  async getCommentsByPostId(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const postId = new ObjectId(req.params.id);
    let foundPost = await this.postsService.getPostById(postId);

    if (!foundPost) {
      return res.status(404).send();
    }

    const commentsWithPagination = await this.commentsService.getCommentsByPostId(postId, req.paginationParams);
    return res.status(200).send(commentsWithPagination)
  }
}

const postsControllerInstance = new PostsController();

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