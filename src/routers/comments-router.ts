import { Router } from "express";
import { commentsControllerInstance } from "../composition-roots/comments-root";

//middleware
import { userAuthMiddleware } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";


export const commentsRouter = Router({});

commentsRouter.get('/:id',
    isValidIdMiddleware,
    commentsControllerInstance.getCommentById.bind(commentsControllerInstance));

commentsRouter.put('/:id', userAuthMiddleware,
    inputValidators.comments,
    sumErrorsMiddleware,
    isValidIdMiddleware,
    commentsControllerInstance.updateComment.bind(commentsControllerInstance));

commentsRouter.delete('/:id', userAuthMiddleware, isValidIdMiddleware,
    commentsControllerInstance.deleteComment.bind(commentsControllerInstance));