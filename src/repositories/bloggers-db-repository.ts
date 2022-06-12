import { bloggersCollection } from './db';
import { BloggerItemDBType, BloggerItemType } from '../types/types';
import { ObjectId } from 'mongodb';


export const bloggersRepository = {
  getBloggers: async (skip: number, limit: number, filter: BloggerItemType): Promise<BloggerItemDBType[]> => {
    return await bloggersCollection.find(filter).skip(skip).limit(limit).toArray();
  },
  getBloggersCount: async (count: BloggerItemType) => {
    return await bloggersCollection.count(count);
  },
  getBloggerById: async (id: ObjectId): Promise<BloggerItemDBType | null> => {
    let blogger = await bloggersCollection.findOne({ _id: id });
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },
  createBlogger: async (newBlogger: BloggerItemType): Promise<BloggerItemDBType> => {
    await bloggersCollection.insertOne(newBlogger);

    // after adding newBlogger to DB, newBlogger will be get _id, because newBlogger is obj;
    return newBlogger as BloggerItemDBType;
  },
  updateBlogger: async (id: ObjectId, updatedBlogger: BloggerItemType): Promise<boolean> => {
    const result = await bloggersCollection.updateOne({ _id: id }, { $set: updatedBlogger });
    return result.matchedCount === 1
  },
  deleteBlogger: async (id: ObjectId): Promise<boolean> => {
    const result = await bloggersCollection.deleteOne({ _id:id });
    return result.deletedCount === 1
  },
}



