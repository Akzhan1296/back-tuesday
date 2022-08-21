import { PostItemDBType, PostItemType } from '../types/types';
import { ObjectId } from "mongodb";
import { postsModelClass } from './db';

class PostsRepository {
  async getPosts(skip: number, limit: number): Promise<PostItemDBType[]> {
    return await postsModelClass.find({}).skip(skip).limit(limit).lean();
  }
  async getPostsCount(count: PostItemType) {
    return await postsModelClass.count(count);
  }
  async getPostById(id: ObjectId): Promise<PostItemDBType | null> {
    let foundPost = await postsModelClass.findOne({ _id: id }).lean();

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  }
  async getPostByBloggerId(bloggerId: ObjectId, skip: number, limit: number): Promise<PostItemDBType[] | null> {
    let foundPost = await postsModelClass.find({ bloggerId }).skip(skip).limit(limit).lean();

    if (foundPost) {

      return foundPost
    } else {
      return null;
    }
  }
  async createPost(newPost: PostItemType): Promise<PostItemDBType> {
    const result = await postsModelClass.insertMany(newPost);
    return { ...newPost, _id: result[0]['_id'] };
  }
  async updatePost(id: ObjectId, updatedPost: PostItemType): Promise<boolean> {
    const result = await postsModelClass.updateOne({ _id: id }, { ...updatedPost });
    return result.matchedCount === 1;
  }
  async deletePost(id: ObjectId): Promise<boolean> {
    const result = await postsModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
  async drop() {
    await postsModelClass.collection.drop();
  }
}

export const postsRepository = new PostsRepository();
