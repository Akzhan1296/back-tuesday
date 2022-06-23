import { body, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { ObjectId } from 'mongodb';


export const inputValidators = {
  titleValidate: body('title').trim().notEmpty().isLength({ max: 15 }),
  shortDescription: body('shortDescription').trim().notEmpty().isLength({ max: 100 }),
  content: body('content').trim().notEmpty().isLength({ max: 1000 }),
  name: body('name').trim().notEmpty().isLength({ max: 15 }),
  youtubeUrl: body('youtubeUrl').trim().notEmpty().isLength({ max: 100 }).matches('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'),
  login: body('login').notEmpty().isLength({ min: 3, max: 10 }),
  password: body('password').notEmpty().isLength({ min: 6, max: 20 }),
  comments: body('content').trim().notEmpty().isLength({min: 20, max: 300}),
  bloggerId: body('bloggerId').trim().notEmpty(),
  email: body('email').trim().notEmpty().isLength({ max: 100 }).isEmail(),
  code: body('code').isMongoId(),
};

export const sumErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errorsMessages: errors.array({ onlyFirstError: true }).map(er => ({
        message: er.msg,
        field: er.param
      })),
    }).send();
  }
  next();
}

export const hasBloggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bloggerId = new ObjectId(req.body.bloggerId);
  const bloggers = await bloggersRepository.getBloggerById(bloggerId);

  if (!bloggers) {
    res.status(400).json({
      errorsMessages: [{
        message: "not found blogger",
        field: "bloggerId"
      }],
    })
    return;
  }
  next();
}