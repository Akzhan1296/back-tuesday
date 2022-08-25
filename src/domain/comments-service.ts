import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { PaginationParamsType, CommentType } from "../types/types";

class CommentsService {
  async getCommentsByPostId(postId: ObjectId, paginationParams: PaginationParamsType) {
    const { pageNumber, pageSize, skip } = paginationParams;

    const comments = await commentsRepository.getAllComments(postId, skip, pageSize);
    const totalCount = await commentsRepository.getAllCountCommentsByPostId(postId);

    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: comments.map(({ postId, ...rest }) => transferIdToString(rest))
    }

  }
  async createCommentForSelectedPost(content: string, userLogin: string, userId: ObjectId, postId: ObjectId) {
    const newComment = new CommentType(
      userId,
      userLogin,
      content,
      new Date(),
      postId,
    )

    return commentsRepository.createCommentForSelectedPost(newComment);
  }
  async getAllPostsCount() {
    return await commentsRepository.getAllPostsCount();
  }
  async getCommentById(id: ObjectId) {
    return await commentsRepository.getCommentById(id);
  }
  async deleteComment(id: ObjectId): Promise<boolean> {
    return await commentsRepository.deleteComment(id);
  }
  async updateComment(id: ObjectId, content: string, userLogin: string, userId: ObjectId): Promise<boolean> {
    const updatedComment = {
      content,
      userLogin,
      userId,
    }
    return await commentsRepository.updateComment(id, updatedComment);
  }
};

export const commentsService = new CommentsService()