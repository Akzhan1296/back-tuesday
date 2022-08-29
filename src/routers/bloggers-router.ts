import { Router } from "express";
import { bloggerControllerInstance } from '../composition-roots/bloggers-root';

//middleware
import { authMiddleWare } from "../middlewares/auth-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";
import { paginationMiddleware } from "../middlewares/pagination-middleware";
import { inputValidators, sumErrorsMiddleware } from '../middlewares/input-validator-middleware';

export const bloggersRouter = Router({});

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

