import { Router } from "express";
import { container } from "../composition-roots/container";
import { CommentsController } from "../controllers/comments-controller";

//middleware
import { userAuthMiddleware } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";


export const commentsRouter = Router({});
const commentsController = container.resolve(CommentsController);

commentsRouter.get('/:id',
    isValidIdMiddleware,
    commentsController.getCommentById.bind(commentsController));

commentsRouter.put('/:id', userAuthMiddleware,
    inputValidators.comments,
    sumErrorsMiddleware,
    isValidIdMiddleware,
    commentsController.updateComment.bind(commentsController));

commentsRouter.delete('/:id', userAuthMiddleware, isValidIdMiddleware,
    commentsController.deleteComment.bind(commentsController));