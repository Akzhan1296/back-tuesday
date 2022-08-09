import { bloggersCollection, bloggersModal } from './db';
import { BloggerItemDBType, BloggerItemType } from '../types/types';
import { ObjectId } from 'mongodb';


export const bloggersRepository = {
  getBloggers: async (skip: number, limit: number, filter: BloggerItemType): Promise<BloggerItemDBType[]> => {
    return await bloggersModal.find(filter).skip(skip).limit(limit).lean();
  },
  getBloggersCount: async (count: BloggerItemType) => {
    return await bloggersModal.count(count);
  },
  getBloggerById: async (id: ObjectId): Promise<BloggerItemDBType | null> => {
    let blogger = await bloggersModal.findOne({ _id: id }).lean();
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },
  createBlogger: async (newBlogger: BloggerItemType): Promise<BloggerItemDBType> => {
    const result = await bloggersModal.insertMany(newBlogger);

    return { ...newBlogger, _id: result[0]['_id'] };
  },
  updateBlogger: async (id: ObjectId, updatedBlogger: BloggerItemType): Promise<boolean> => {
    const result = await bloggersModal.updateOne({ _id: id }, { ...updatedBlogger });
    return result.matchedCount === 1
  },
  deleteBlogger: async (id: ObjectId): Promise<boolean> => {
    const result = await bloggersModal.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  drop: async () => {
    await bloggersModal.collection.drop();
  }
}



