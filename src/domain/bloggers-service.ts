import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerItemDBType, BloggerItemType, PaginationParamsType } from '../types/types';

class BloggersService {
  async getBloggers(paginationParams: PaginationParamsType) {

    const { pageNumber, pageSize, skip, searchNameTerm } = paginationParams;

    let filter = {} as BloggerItemType;
    if (searchNameTerm.length > 0) {
      filter.name = new RegExp(searchNameTerm) as unknown as string;
    }

    const bloggers = await bloggersRepository.getBloggers(skip, pageSize, filter);
    const totalCount = await bloggersRepository.getBloggersCount(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: bloggers.map((b) => (transferIdToString(b))),
    }
  }
  async getBloggerById(id: ObjectId): Promise<BloggerItemDBType | null> {
    return bloggersRepository.getBloggerById(id);
  }
  async createBlogger(name: string, youtubeUrl: string): Promise<BloggerItemDBType> {
    const newBlogger = new BloggerItemType(name, youtubeUrl);

    const createdBlogger = await bloggersRepository.createBlogger(newBlogger);
    return createdBlogger;
  }
  async updateBlogger(id: ObjectId, name: string, youtubeUrl: string): Promise<boolean> {
    const updatedBlogger = new BloggerItemType(name, youtubeUrl);
    return await bloggersRepository.updateBlogger(id, updatedBlogger);
  }
  async deleteBlogger(id: ObjectId): Promise<boolean> {
    return await bloggersRepository.deleteBlogger(id);
  }
}

export const bloggersService = new BloggersService();


