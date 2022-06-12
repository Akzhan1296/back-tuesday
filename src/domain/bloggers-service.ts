import { ObjectId } from "mongodb";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { BloggerItemDBType, BloggerItemType, QueryType } from '../types/types';

export const bloggersService = {
  getBloggers: async (pageNumber: QueryType, pageSize: QueryType, searchNameTerm: QueryType) => {

    let pn = 1;
    let ps = 10;
    let st = '';

    if (pageNumber) {
      pn = Number(pageNumber);
    }
    if (pageSize) {
      ps = Number(pageSize)
    }
    if (searchNameTerm) {
      st = searchNameTerm as string;
    }

    let filter = {} as BloggerItemType;
    if (st.length > 0) {
      filter.name = new RegExp(st) as unknown as string;
    }

    const skip = (pn - 1) * ps;

    const bloggers = await bloggersRepository.getBloggers(skip, ps, filter);
    const totalCount = await bloggersRepository.getBloggersCount(filter);
    const pagesCount = Math.ceil(totalCount / ps);
    return {
      page: pn,
      pageSize: ps,
      totalCount,
      pagesCount,
      items: bloggers.map(({_id, ...params}) => ({id: _id, ...params})),
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



