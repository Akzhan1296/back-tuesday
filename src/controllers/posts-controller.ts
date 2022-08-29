import { Request, Response } from "express";
import { ObjectId } from "mongodb";

//services
import { PostsService } from "../application/posts-service";
import { CommentsService } from "../application/comments-service";

import { CommentDBType } from '../types/types';
import { transferIdToString } from "../utils/utils";


export class PostsController {
  constructor(protected postsService: PostsService, protected commentsService: CommentsService) {}

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
