import { ObjectId } from "mongodb";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { CommentDBType  } from "../types/types";

export const commentsService = {
  createCommentForSelectedPost: async (content: string, userLogin: string, userId: ObjectId, postId: string) => {
    const newComment = {
      content,
      userLogin,
      userId,
      postId,
      addedAt: new Date(),
    }
    return commentsRepository.createCommentForSelectedPost(newComment);
  },
  getAllCommentsByPostId: async (postId: string, skip: number, limit: number) => {
    return await commentsRepository.getAllComments(postId, skip, limit);
  },
  getAllPostsCount: async () => {
    return await commentsRepository.getAllPostsCount();
  },
  getAllCountCommentsByPostId: async(postId: string) => {
    return await commentsRepository.getAllCountCommentsByPostId(postId);
  },
  getCommentById: async (id: ObjectId) => {
    return await commentsRepository.getCommentById(id);
  },
  deleteComment: async (id: ObjectId): Promise<boolean> => {
    return await commentsRepository.deleteComment(id);
  },
  updateComment: async (id: ObjectId, content: string, userLogin: string, userId: ObjectId): Promise<boolean> => {

    const updatedComment = {
      content,
      userLogin,
      userId,
    }

    return await commentsRepository.updateComment(id, updatedComment);
  }
};