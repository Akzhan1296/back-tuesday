import { PostItemDBType, PostItemType } from '../types/types';
import { ObjectId } from "mongodb";
import { postsModelClass } from './db';

export const postsRepository = {
  getPosts: async (skip: number, limit: number): Promise<PostItemDBType[]> => {
    return await postsModelClass.find({}).skip(skip).limit(limit).lean();
  },
  getPostsCount: async (count: PostItemType) => {
    return await postsModelClass.count(count);
  },
  getPostById: async (id: ObjectId): Promise<PostItemDBType | null> => {
    let foundPost = await postsModelClass.findOne({ _id: id }).lean();

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  },
  getPostByBloggerId: async (bloggerId: ObjectId, skip: number, limit: number): Promise<PostItemDBType[] | null> => {
    let foundPost = await postsModelClass.find({ bloggerId }).skip(skip).limit(limit).lean();

    if (foundPost) {

      return foundPost
    } else {
      return null;
    }
  },
  createPost: async (newPost: PostItemType): Promise<PostItemDBType> => {
    const result = await postsModelClass.insertMany(newPost);
    return { ...newPost, _id: result[0]['_id'] };
  },
  updatePost: async (id: ObjectId, updatedPost: PostItemType): Promise<boolean> => {
    const result = await postsModelClass.updateOne({ _id: id }, { ...updatedPost });
    return result.matchedCount === 1;
  },
  deletePost: async (id: ObjectId): Promise<boolean> => {
    const result = await postsModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  drop: async () => {
    await postsModelClass.collection.drop();
  }
}
