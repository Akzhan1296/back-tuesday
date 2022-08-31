import { ObjectId } from "mongodb";
import { transferIdToString } from "../utils/utils";
import { BloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerItemDBType, BloggerItemType, PaginationParamsType } from '../types/types';
import { injectable, inject } from "inversify";

@injectable()
export class BloggersService {
  constructor(@inject(BloggersRepository) protected bloggersRepository: BloggersRepository) {
  }
  async getBloggers(paginationParams: PaginationParamsType) {

    const { pageNumber, pageSize, skip, searchNameTerm } = paginationParams;

    let filter = {} as BloggerItemType;
    if (searchNameTerm.length > 0) {
      filter.name = new RegExp(searchNameTerm) as unknown as string;
    }

    const bloggers = await this.bloggersRepository.getBloggers(skip, pageSize, filter);
    const totalCount = await this.bloggersRepository.getBloggersCount(filter);
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
    return this.bloggersRepository.getBloggerById(id);
  }
  async createBlogger(name: string, youtubeUrl: string): Promise<BloggerItemDBType> {
    const newBlogger = new BloggerItemType(name, youtubeUrl);

    const createdBlogger = await this.bloggersRepository.createBlogger(newBlogger);
    return createdBlogger;
  }
  async updateBlogger(id: ObjectId, name: string, youtubeUrl: string): Promise<boolean> {
    const updatedBlogger = new BloggerItemType(name, youtubeUrl);
    return await this.bloggersRepository.updateBlogger(id, updatedBlogger);
  }
  async deleteBlogger(id: ObjectId): Promise<boolean> {
    return await this.bloggersRepository.deleteBlogger(id);
  }
};