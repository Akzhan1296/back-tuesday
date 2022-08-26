import { ObjectId } from "mongodb";
import { transferIdToString } from "../utils/utils";
import { CommentsRepository } from "../repositories/comments-db-repositry";
import { PaginationParamsType, CommentType } from "../types/types";

export class CommentsService {
  commentsRepository: CommentsRepository;
  constructor(){
    this.commentsRepository = new CommentsRepository();
  }
  async getCommentsByPostId(postId: ObjectId, paginationParams: PaginationParamsType) {
    const { pageNumber, pageSize, skip } = paginationParams;

    const comments = await this.commentsRepository.getAllComments(postId, skip, pageSize);
    const totalCount = await this.commentsRepository.getAllCountCommentsByPostId(postId);

    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      pagesCount,
      items: comments.map(({ postId, ...rest }) => transferIdToString(rest))
    }

  }
  async createCommentForSelectedPost(content: string, userLogin: string, userId: ObjectId, postId: ObjectId) {
    const newComment = new CommentType(
      userId,
      userLogin,
      content,
      new Date(),
      postId,
    )

    return this.commentsRepository.createCommentForSelectedPost(newComment);
  }
  async getAllPostsCount() {
    return await this.commentsRepository.getAllPostsCount();
  }
  async getCommentById(id: ObjectId) {
    return await this.commentsRepository.getCommentById(id);
  }
  async deleteComment(id: ObjectId): Promise<boolean> {
    return await this.commentsRepository.deleteComment(id);
  }
  async updateComment(id: ObjectId, content: string, userLogin: string, userId: ObjectId): Promise<boolean> {
    const updatedComment = {
      content,
      userLogin,
      userId,
    }
    return await this.commentsRepository.updateComment(id, updatedComment);
  }
};

// export const commentsService = new CommentsService()