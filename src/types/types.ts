import { ObjectId, WithId } from "mongodb"

export type QueryType = string | string[] | undefined

export class PostItemType {
  constructor(
    public title: string,
    public shortDescription: string,
    public content: string,
    public bloggerId: ObjectId,
    public bloggerName: string,
  ) { }
}
export type PostItemDBType = WithId<PostItemType>;

export class BloggerItemType {
  constructor(public name: string, public youtubeUrl: string) {

  }
}
export type BloggerItemDBType = WithId<BloggerItemType>

export class UserDBType {
  constructor(
    public _id: ObjectId,
    public login: string,
    public passwordHash: string,
    public createdAt: Date,
    public confirmCode: ObjectId | null,
    public isConfirmed: boolean,
    public email: string,) { }
}

export class CommentType {
  constructor(
    public userId: ObjectId,
    public userLogin: string,
    public content: string,
    public addedAt: Date,
    public postId: ObjectId,
  ) { }
}
export type CommentDBType = WithId<CommentType>

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