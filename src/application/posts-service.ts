import { ObjectId } from 'mongodb';
import { transferIdToString } from '../utils/utils';
import { PostsRepository } from '../repositories/posts-db-repository';
import { PaginationParamsType, PostItemType } from '../types/types';

export class PostsService {
  constructor(protected postsRepository: PostsRepository) {
  }
  async getPosts(paginationParams: PaginationParamsType) {
    const { pageNumber, pageSize, skip } = paginationParams;

    let posts = await this.postsRepository.getPosts(skip, pageSize);
    const totalCount = await this.postsRepository.getPostsCount({} as PostItemType);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: posts.map(p => (transferIdToString(p))),
    }
  }
  async getPostById(id: ObjectId): Promise<PostItemType | null> {
    return this.postsRepository.getPostById(id);
  }
  async getPostByBloggerId(bloggerId: ObjectId, paginationParams: PaginationParamsType) {
    const { pageNumber, pageSize, skip } = paginationParams;

    const totalCount = await this.postsRepository.getPostsCount({ bloggerId } as PostItemType);
    const postsByBlogger = await this.postsRepository.getPostByBloggerId(bloggerId, skip, pageSize);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: postsByBlogger ? postsByBlogger.map(p => transferIdToString(p)) : [],
    }
  }
  async createPost(title: string, shortDescription: string, content: string, bloggerId: ObjectId) {
    const newPost: PostItemType = new PostItemType(
      title,
      shortDescription,
      content,
      bloggerId,
      "bloggerName");
    const createdPost = await this.postsRepository.createPost(newPost);
    return createdPost;
  }
  async updatePost(id: ObjectId, title: string, shortDescription: string, content: string, bloggerId: ObjectId) {
    const updatedPost = new PostItemType(
      title,
      shortDescription,
      content,
      bloggerId,
      "bloggerNameUpdated",
    )
    const result = await this.postsRepository.updatePost(id, updatedPost);
    return result;
  }
  async deletePost(id: ObjectId) {
    return await this.postsRepository.deletePost(id);
  }
}