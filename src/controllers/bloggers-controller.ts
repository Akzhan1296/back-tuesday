import { Request, Response } from "express";
import { ObjectId } from "mongodb";

//utils
import { transferIdToString } from "../utils/utils";

//services
import { BloggersService } from "../application/bloggers-service";
import { PostsService } from '../application/posts-service';

export class BloggerController {
  constructor(protected bloggersService: BloggersService, protected postsService: PostsService) {
  }

  async getBloggers(req: Request, res: Response) {
    const bloggers = await this.bloggersService.getBloggers(req.paginationParams);
    res.status(200).send(bloggers);
  }
  async getBloggerById(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const bloggerId = new ObjectId(req.params.id);
    let foundBlogger = await this.bloggersService.getBloggerById(bloggerId)

    if (foundBlogger) {
      return res.status(200).send(transferIdToString(foundBlogger));
    } else {
      return res.status(404).send();
    }
  }
  async getPostByBloggerId(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const bloggerId = new ObjectId(req.params.id);
    let foundBlogger = await this.bloggersService.getBloggerById(bloggerId)

    if (foundBlogger) {
      let posts = await this.postsService.getPostByBloggerId(bloggerId, req.paginationParams);
      return res.status(200).send(posts);
    } else {
      return res.status(404).send();
    }
  }
  async createBlogger(req: Request, res: Response) {
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const newBlogger = await this.bloggersService.createBlogger(name, youtubeUrl);
    return res.status(201).send(transferIdToString(newBlogger));
  }
  async createPostForBlogger(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = new ObjectId(req.params.id);

    let foundBlogger = await this.bloggersService.getBloggerById(bloggerId)
    if (foundBlogger) {
      const newPost = await this.postsService.createPost(title, shortDescription, content, bloggerId);
      return res.status(201).send(transferIdToString(newPost));
    } else {
      return res.status(404).send();
    }
  }
  async updateBlogger(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();
    const bloggerId = new ObjectId(req.params.id);
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    let foundBlogger = await this.bloggersService.getBloggerById(bloggerId);
    if (!foundBlogger) return res.send(404);

    const isUpdated = await this.bloggersService.updateBlogger(bloggerId, name, youtubeUrl)
    if (isUpdated) {
      await this.bloggersService.getBloggerById(bloggerId);
      return res.send(204);
    }

  }
  async deleteBlogger(req: Request, res: Response) {
    if (!req.isValidId) return res.status(404).send();

    const id = new ObjectId(req.params.id);
    const isDeleted = await this.bloggersService.deleteBlogger(id);

    if (isDeleted) {
      return res.send(204)
    } else {
      return res.send(404)
    }
  }
}
