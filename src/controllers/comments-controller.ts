import { Request, Response } from "express";
import { ObjectId } from "mongodb";

//utils
import { transferIdToString } from "../utils/utils";

//services
import { CommentsService } from "../application/comments-service";

export class CommentsController {
  constructor(protected commentsService: CommentsService) { }

  async getCommentById(req: Request, res: Response) {
    if (!req.isValidId) return res.send(404);

    const commentId = new ObjectId(req.params.id);
    let foundComment = await this.commentsService.getCommentById(commentId);

    if (foundComment) {
      const { postId, ...rest } = foundComment;
      return res.status(200).send(transferIdToString(rest));
    } else {
      return res.status(404).send();
    }
  }
  async updateComment(req: Request, res: Response) {
    if (!req.isValidId) return res.send(404);

    const user = req.user;
    const commentId = new ObjectId(req.params.id);
    const content = req.body.content;

    let foundComment = await this.commentsService.getCommentById(commentId);

    if (!foundComment) {
      return res.status(404).send();
    }

    if (foundComment && user && !foundComment.userId.equals(user._id)) {
      return res.status(403).send();
    }

    if (foundComment && user) {
      const isUpdated = await this.commentsService.updateComment(commentId, content, user.login, user._id);
      if (isUpdated) {
        return res.status(204).send();
      }
    }
  }
  async deleteComment(req: Request, res: Response) {
    if (!req.isValidId) return res.send(404);

    const user = req.user;
    const commentId = new ObjectId(req.params.id);
    let foundComment = await this.commentsService.getCommentById(commentId);

    if (!foundComment) {
      return res.status(404).send();
    }

    if (foundComment && user && !foundComment.userId.equals(user._id)) {
      return res.status(403).send();
    }

    if (foundComment) {
      const isDeleted = await this.commentsService.deleteComment(commentId);
      if (isDeleted) {
        return res.status(204).send();
      }
    }
  }
}
