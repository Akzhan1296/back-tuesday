import { Request, Response, Router } from "express";
import { bloggersService } from "../domain/bloggers-service";
import { postsService } from '../domain/posts-service';
import { inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware';
import { authMiddleWare } from "../middlewares/auth-middleware";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";


export const bloggersRouter = Router({});

//get all bloggers
bloggersRouter.get('/',
  paginationMiddleware,
  async (req, res) => {
    const bloggers = await bloggersService.getBloggers(req.paginationParams);
    res.status(200).send(bloggers);
  });

//get blogger by id
bloggersRouter.get('/:id',
  isValidIdMiddleware,
  async (req, res) => {

    if (!req.isValidId) return res.status(404).send();

    const bloggerId = new ObjectId(req.params.id);
    let foundBlogger = await bloggersService.getBloggerById(bloggerId)

    if (foundBlogger) {
      return res.status(200).send(transferIdToString(foundBlogger));
    } else {
      return res.status(404).send();
    }
  })


//get specific blogger POSTS
bloggersRouter.get('/:id/posts',
  isValidIdMiddleware,
  paginationMiddleware,
  async (req, res) => {

    if (!req.isValidId) return res.status(404).send();

    const bloggerId = new ObjectId(req.params.id);
    let foundBlogger = await bloggersService.getBloggerById(bloggerId)

    if (foundBlogger) {
      let posts = await postsService.getPostByBloggerId(bloggerId, req.paginationParams);
      return res.status(200).send(posts);
    } else {
      return res.status(404).send();
    }
  })

//create blogger +++
bloggersRouter.post('/',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl);
    return res.status(201).send(transferIdToString(newBlogger));
  })

// create POST for specific blogger 
bloggersRouter.post('/:id/posts',
  authMiddleWare,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  isValidIdMiddleware,

  async (req: Request, res: Response) => {


    if (!req.isValidId) return res.status(404).send();

    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = new ObjectId(req.params.id);

    let foundBlogger = await bloggersService.getBloggerById(bloggerId)
    if (foundBlogger) {
      const newPost = await postsService.createPost(title, shortDescription, content, bloggerId);
      return res.status(201).send(transferIdToString(newPost));
    } else {
      return res.status(404).send();
    }
  })

//update blogger +++
bloggersRouter.put('/:id',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  async (req: Request, res: Response) => {

    if (!req.isValidId) return res.status(404).send();

    const bloggerId = new ObjectId(req.params.id);
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    let foundBlogger = await bloggersService.getBloggerById(bloggerId);
    if (!foundBlogger) return res.send(404);

    const isUpdated = await bloggersService.updateBlogger(bloggerId, name, youtubeUrl)
    if (isUpdated) {
      await bloggersService.getBloggerById(bloggerId);
      return res.send(204);
    }
  })

// delete blogger +++
bloggersRouter.delete('/:id',
  authMiddleWare,
  isValidIdMiddleware,
  async (req: Request, res: Response) => {

    if (!req.isValidId) return res.status(404).send();

    const id = new ObjectId(req.params.id);

    const isDeleted = await bloggersService.deleteBlogger(id);
    if (isDeleted) {
      return res.send(204)
    } else {
      return res.send(404)
    }
  })

