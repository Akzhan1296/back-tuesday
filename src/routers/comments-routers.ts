import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { commentsService } from "../domain/comments-service";
import { userAuthMiddleware } from "../middlewares/auth-middleware";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { isValidIdMiddleware } from "../middlewares/object-id-middleware";

export const commentsRouter = Router({});

commentsRouter.get('/:id',
  isValidIdMiddleware,

  async (req: Request, res: Response) => {
    if (!req.isValidId) return res.send(404);

    const commentId = new ObjectId(req.params.id);
    let foundComment = await commentsService.getCommentById(commentId);

    if (foundComment) {
      const { postId, ...rest } = foundComment;
      return res.status(200).send(transferIdToString(rest));
    } else {
      return res.status(404).send();
    }
  });


commentsRouter.put('/:id', userAuthMiddleware,
  inputValidators.comments,
  sumErrorsMiddleware,
  isValidIdMiddleware,
  async (req: Request, res: Response) => {

    if (!req.isValidId) return res.send(404);

    const user = req.user;
    const commentId = new ObjectId(req.params.id);
    const content = req.body.content;

    let foundComment = await commentsService.getCommentById(commentId);

    if (!foundComment) {
      return res.status(404).send();
    }

    if (foundComment && user && !foundComment.userId.equals(user._id)) {
      return res.status(403).send();
    }

    if (foundComment) {
      const isUpdated = await commentsService.updateComment(commentId, content, user.login, user._id);
      if (isUpdated) {
        return res.status(204).send();
      }
    }
  });

commentsRouter.delete('/:id', userAuthMiddleware, isValidIdMiddleware,
  async (req: Request, res: Response) => {

    if (!req.isValidId) return res.send(404);

    const user = req.user;
    const commentId = new ObjectId(req.params.id);
    let foundComment = await commentsService.getCommentById(commentId);

    if (!foundComment) {
      return res.status(404).send();
    }

    if (foundComment && user && !foundComment.userId.equals(user._id)) {
      return res.status(403).send();
    }

    if (foundComment) {
      const isDeleted = await commentsService.deleteComment(commentId);
      if (isDeleted) {
        return res.status(204).send();
      }
    }
  });