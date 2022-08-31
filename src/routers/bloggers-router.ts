import { Router } from "express";
import { bloggersContainer } from '../composition-roots/bloggers-root';
import { BloggerController } from '../controllers/bloggers-controller';
//middleware
import { authMiddleWare } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";
import { inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware';

export const bloggersRouter = Router({});
const bloggerController = bloggersContainer.resolve(BloggerController);

//get all bloggers
bloggersRouter.get('/',
  paginationMiddleware,
  bloggerController.getBloggers.bind(bloggerController));

//get blogger by id
bloggersRouter.get('/:id',
  isValidIdMiddleware,
  bloggerController.getBloggerById.bind(bloggerController))

//get specific blogger POSTS
bloggersRouter.get('/:id/posts',
  isValidIdMiddleware,
  paginationMiddleware,
  bloggerController.getPostByBloggerId.bind(bloggerController))

//create blogger +++
bloggersRouter.post('/',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  bloggerController.createBlogger.bind(bloggerController))

// create POST for specific blogger 
bloggersRouter.post('/:id/posts',
  authMiddleWare,
  inputValidators.titleValidate,
  inputValidators.content,
  inputValidators.shortDescription,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  bloggerController.createPostForBlogger.bind(bloggerController))

//update blogger +++
bloggersRouter.put('/:id',
  authMiddleWare,
  inputValidators.name,
  inputValidators.youtubeUrl,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  bloggerController.updateBlogger.bind(bloggerController))

// delete blogger +++
bloggersRouter.delete('/:id',
  authMiddleWare,
  isValidIdMiddleware,
  bloggerController.updateBlogger.bind(bloggerController))

