import { ObjectId } from "mongodb";
import { CommentType, CommentDBType } from "../types/types";
import { CommentModelClass } from "./db";

class CommentsRepository {
  async createCommentForSelectedPost(comment: CommentType): Promise<CommentDBType> {
    const result = await CommentModelClass.insertMany(comment);
    return { ...comment, _id: result[0]['_id'] };
  }
  async getAllComments(postId: ObjectId, skip: number, limit: number): Promise<CommentDBType[]> {
    return await CommentModelClass.find({ postId }).skip(skip).limit(limit).lean();
  }
  async getAllPostsCount() {
    return await CommentModelClass.count();
  }
  async getCommentById(id: ObjectId): Promise<CommentDBType | null> {
    let foundComment = await CommentModelClass.findOne({ _id: id }).lean();

    if (foundComment) {
      return foundComment
    } else {
      return null;
    }
  }
  async deleteComment(id: ObjectId): Promise<boolean> {
    const result = await CommentModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
  async updateComment(id: ObjectId, comment: any): Promise<boolean> {
    const result = await CommentModelClass.updateOne({ _id: id }, { ...comment });
    return result.matchedCount === 1
  }
  async getAllCountCommentsByPostId(postId: ObjectId) {
    return await CommentModelClass.count({ postId });
  }
  async drop() {
    await CommentModelClass.collection.drop();
  }
}

export const commentsRepository = new CommentsRepository();