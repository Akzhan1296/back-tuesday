import { postsCollection } from "./db";
import { PostItemDBType, PostItemType } from '../types/types';
import { ObjectId } from "mongodb";


export const postsRepository = {
  getPosts: async (skip: number, limit: number): Promise<PostItemDBType[]> => {
    return await postsCollection.find({}).skip(skip).limit(limit).toArray();
  },
  getPostsCount: async (count: PostItemType) => {
    return await postsCollection.count(count);
  },
  getPostById: async (id: ObjectId): Promise<PostItemDBType | null> => {
    let foundPost = await postsCollection.findOne({ _id: id });

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  },
  getPostByBloggerId: async (bloggerId: ObjectId, skip: number, limit: number): Promise<PostItemDBType[] | null> => {
    let foundPost = await postsCollection.find({ bloggerId }).skip(skip).limit(limit).toArray();

    if (foundPost) {

      return foundPost
    } else {
      return null;
    }
  },
  createPost: async (newPost: PostItemType): Promise<PostItemDBType> => {
    await postsCollection.insertOne(newPost);
    return newPost as PostItemDBType;
  },
  updatePost: async (id: ObjectId, updatedPost: PostItemType): Promise<boolean> => {
    const result = await postsCollection.updateOne({ _id: id }, { $set: updatedPost });
    return result.matchedCount === 1
  },
  deletePost: async (id: ObjectId): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  drop: async() => {
    await postsCollection.drop();
  }
}
