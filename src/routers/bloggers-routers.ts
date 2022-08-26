import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";

//utils
import { transferIdToString } from "../application/utils";

//services
import { BloggersService } from "../domain/bloggers-service";
import { PostsService } from '../domain/posts-service';

//middleware
import { authMiddleWare } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";
import { inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware';


export const bloggersRouter = Router({});

class BloggerController {
  bloggersService: BloggersService;
  postsService: PostsService;

  constructor() {
    this.postsService = new PostsService();
    this.bloggersService = new BloggersService();
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

const bloggerControllerInstance = new BloggerController();

//get all bloggers
bloggersRouter.get('/',
  paginationMiddleware,
  bloggerControllerInstance.getBloggers.bind(bloggerControllerInstance));

//get blogger by id
bloggersRouter.get('/:id',
  isValidIdMiddleware,
  bloggerControllerInstance.getBloggerById.bind(bloggerControllerInstance))

//get specific blogger POSTS
bloggersRouter.get('/:id/posts',
  isValidIdMiddleware,
  paginationMiddleware,
  bloggerControllerInstance.getPostByBloggerId.bind(bloggerControllerInstance))

//create blogger +++
bloggersRouter.post('/',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  bloggerControllerInstance.createBlogger.bind(bloggerControllerInstance))

// create POST for specific blogger 
bloggersRouter.post('/:id/posts',
  authMiddleWare,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  bloggerControllerInstance.createPostForBlogger.bind(bloggerControllerInstance))

//update blogger +++
bloggersRouter.put('/:id',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  bloggerControllerInstance.updateBlogger.bind(bloggerControllerInstance))

// delete blogger +++
bloggersRouter.delete('/:id',
  authMiddleWare,
  isValidIdMiddleware,
  bloggerControllerInstance.updateBlogger.bind(bloggerControllerInstance))

