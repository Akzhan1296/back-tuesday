import { ObjectId } from "mongodb";
import { CommentType, CommentWithPostId } from "../types/types";
import { commentModelClass } from "./db";

export const commentsRepository = {
  createCommentForSelectedPost: async (comment: CommentType): Promise<CommentWithPostId> => {
    const result = await commentModelClass.insertMany(comment);
    return { ...comment, _id: result[0]['_id'] };
  },
  getAllComments: async (postId: ObjectId, skip: number, limit: number): Promise<CommentWithPostId[]> => {
    return await commentModelClass.find({ postId }).skip(skip).limit(limit).lean();
  },
  getAllPostsCount: async () => {
    return await commentModelClass.count();
  },
  getCommentById: async (id: ObjectId): Promise<CommentWithPostId | null> => {
    let foundComment = await commentModelClass.findOne({ _id: id }).lean();

    if (foundComment) {
      return foundComment
    } else {
      return null;
    }
  },
  deleteComment: async (id: ObjectId): Promise<boolean> => {
    const result = await commentModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  updateComment: async (id: ObjectId, comment: any): Promise<boolean> => {
    const result = await commentModelClass.updateOne({ _id: id }, { ...comment });
    return result.matchedCount === 1
  },
  getAllCountCommentsByPostId: async (postId: ObjectId) => {
    return await commentModelClass.count({ postId });
  },
  drop: async () => {
    await commentModelClass.collection.drop();
  }
};