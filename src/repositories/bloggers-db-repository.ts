import { BloggersModelClass } from './db';
import { BloggerItemDBType, BloggerItemType } from '../types/types';
import { ObjectId } from 'mongodb';
import { injectable } from 'inversify';

@injectable()
export class BloggersRepository {
  async getBloggers(skip: number, limit: number, filter: BloggerItemType): Promise<BloggerItemDBType[]> {
    return await BloggersModelClass.find(filter).skip(skip).limit(limit).lean();
  }
  async getBloggersCount(count: BloggerItemType) {
    return await BloggersModelClass.count(count);
  }
  async getBloggerById(id: ObjectId): Promise<BloggerItemDBType | null> {
    let blogger = await BloggersModelClass.findOne({ _id: id }).lean();
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  }
  async createBlogger(newBlogger: BloggerItemType): Promise<BloggerItemDBType> {
    const result = await BloggersModelClass.insertMany(newBlogger);

    return { ...newBlogger, _id: result[0]['_id'] };
  }
  async updateBlogger(id: ObjectId, updatedBlogger: BloggerItemType): Promise<boolean> {
    const result = await BloggersModelClass.updateOne({ _id: id }, { ...updatedBlogger });
    return result.matchedCount === 1
  }
  async deleteBlogger(id: ObjectId): Promise<boolean> {
    const result = await BloggersModelClass.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
}


