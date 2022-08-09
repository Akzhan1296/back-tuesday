import { ObjectId } from 'mongodb';
import { transferIdToString } from '../application/utils';
import { postsRepository } from '../repositories/posts-db-repository';
import { PaginationParamsType, PostItemType, QueryType } from '../types/types';

export const postsService = {
  getPosts: async (paginationParams: PaginationParamsType) => {
    const { pageNumber, pageSize, skip } = paginationParams;

    let posts = await postsRepository.getPosts(skip, pageSize);
    const totalCount = await postsRepository.getPostsCount({} as PostItemType);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: posts.map(p => (transferIdToString(p))),
    }
  },
  getPostById: async (id: ObjectId): Promise<PostItemType | null> => {
    return postsRepository.getPostById(id);
  },
  getPostByBloggerId: async (bloggerId: ObjectId, paginationParams: PaginationParamsType) => {
    const { pageNumber, pageSize, skip } = paginationParams;

    const totalCount = await postsRepository.getPostsCount({ bloggerId } as PostItemType);
    const postsByBlogger = await postsRepository.getPostByBloggerId(bloggerId, skip, pageSize);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: postsByBlogger ? postsByBlogger.map(p => transferIdToString(p)) : [],
    }
  },
  createPost: async (title: string, shortDescription: string, content: string, bloggerId: ObjectId) => {
    const newPost = {
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: "string",
    }
    const createdPost = await postsRepository.createPost(newPost);
    return createdPost;
  },
  updatePost: async (id: ObjectId, title: string, shortDescription: string, content: string, bloggerId: ObjectId) => {
    const updatedPost = {
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: "string",
    }
    const result = await postsRepository.updatePost(id, updatedPost);
    return result;
  },
  deletePost: async (id: ObjectId) => {
    return await postsRepository.deletePost(id);
  }
}
