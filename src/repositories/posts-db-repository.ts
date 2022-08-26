import { PostItemDBType, PostItemType } from '../types/types';
import { ObjectId } from "mongodb";
import { PostsModelClass } from './db';

export class PostsRepository {
  async getPosts(skip: number, limit: number): Promise<PostItemDBType[]> {
    return await PostsModelClass.find({}).skip(skip).limit(limit).lean();
  }
  async getPostsCount(count: PostItemType) {
    return await PostsModelClass.count(count);
  }
  async getPostById(id: ObjectId): Promise<PostItemDBType | null> {
    let foundPost = await PostsModelClass.findOne({ _id: id }).lean();

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  }
  async getPostByBloggerId(bloggerId: ObjectId, skip: number, limit: number): Promise<PostItemDBType[] | null> {
    let foundPost = await PostsModelClass.find({ bloggerId }).skip(skip).limit(limit).lean();

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  }
  async createPost(newPost: PostItemType): Promise<PostItemDBType> {
    const result = await PostsModelClass.insertMany(newPost);
    return { ...newPost, _id: result[0]['_id'] };
  }
  async updatePost(id: ObjectId, updatedPost: PostItemType): Promise<boolean> {
    const result = await PostsModelClass.updateOne({ _id: id }, { ...updatedPost });
    return result.matchedCount === 1;
  }
  async deletePost(id: ObjectId): Promise<boolean> {
    const result = await PostsModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
}