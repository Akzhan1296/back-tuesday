import { ObjectId } from "mongodb";
import { CommentDBType, CommentType, CommentWithPostId } from "../types/types";
import { commentsCollection } from "./db";

export const commentsRepository = {
  createCommentForSelectedPost: async (comment: CommentType): Promise<CommentWithPostId> => {
    await commentsCollection.insertOne(comment);
    return comment as CommentWithPostId;
  },
  getAllComments: async (postId: string, skip: number, limit: number): Promise<CommentWithPostId[]> => {
    return await commentsCollection.find({ postId }).skip(skip).limit(limit).toArray();
  },
  getAllPostsCount: async () => {
    return await commentsCollection.count();
  },
  getCommentById: async (id: ObjectId): Promise<CommentWithPostId | null> => {
    let foundComment = await commentsCollection.findOne({ _id: id });

    if (foundComment) {
      return foundComment
    } else {
      return null;
    }
  },
  deleteComment: async (id: ObjectId): Promise<boolean> => {
    const result = await commentsCollection.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  updateComment: async (id: ObjectId, comment: any): Promise<boolean> => {
    const result = await commentsCollection.updateOne({ _id: id }, { $set: comment });
    return result.matchedCount === 1
  },
  getAllCountCommentsByPostId: async (postId: string) => {
    return await commentsCollection.count({ postId });
  }
};