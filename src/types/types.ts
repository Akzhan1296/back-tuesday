import { ObjectId, WithId } from "mongodb"

export type QueryType = string | string[] | undefined

export type PostItemType = {
  title: string,
  shortDescription: string,
  content: string,
  bloggerId: ObjectId,
  bloggerName: string
};

export type PostItemDBType = WithId<PostItemType>;

export type BloggerItemType = {
  name: string
  youtubeUrl: string
}

export type BloggerItemDBType = WithId<BloggerItemType>

export type UserType = {
  login: string
  passwordHash: string
  createdAt: Date
  confirmCode: ObjectId | null,
  isConfirmed: boolean,
  email: string,
}

export type UserDBType = WithId<UserType>

export type CommentType = {
  userId: ObjectId,
  userLogin: string,
  content: string,
  addedAt: Date,
}

export type CommentDBType = WithId<CommentType>

export type CommentWithPostId = WithId<{
  userId: ObjectId,
  userLogin: string,
  content: string,
  addedAt: Date,
  postId: string
}>;

export type PaginationParamsType = {
  pageNumber: number,
  pageSize: number,
  skip: number,
  searchNameTerm: string,
}

export type RefeshTokenType = {
  userId: ObjectId,
  tokenId: ObjectId,
  exp: number,
}