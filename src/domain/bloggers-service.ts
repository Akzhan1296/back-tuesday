import { ObjectId } from "mongodb";
import { transferIdToString } from "../application/utils";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerItemDBType, BloggerItemType, PaginationParamsType, QueryType } from '../types/types';

export const bloggersService = {
  getBloggers: async (paginationParams: PaginationParamsType) => {

    const {pageNumber, pageSize, skip, searchNameTerm} = paginationParams;

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
  },
  getBloggerById: async (id: ObjectId): Promise<BloggerItemDBType | null> => {
    return bloggersRepository.getBloggerById(id);
  },
  createBlogger: async (name: string, youtubeUrl: string): Promise<BloggerItemDBType> => {
    const newBlogger = {
      name,
      youtubeUrl,
    }
    const createdBlogger = await bloggersRepository.createBlogger(newBlogger);
    return createdBlogger;
  },
  updateBlogger: async (id: ObjectId, name: string, youtubeUrl: string): Promise<boolean> => {
    const updatedBlogger = {
      name,
      youtubeUrl,
    }
    return await bloggersRepository.updateBlogger(id, updatedBlogger);
  },
  deleteBlogger: async (id: ObjectId): Promise<boolean> => {
    return await bloggersRepository.deleteBlogger(id);
  },
}



