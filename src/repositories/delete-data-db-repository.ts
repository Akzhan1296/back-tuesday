import { BloggersModelClass, IpModelClass, CommentModelClass, RefreshTokenClass, PostsModelClass, UserModelClass } from './db';


export class DeleteDataRepository {
  async dropBloggers() {
    await BloggersModelClass.collection.drop();
  }
  async dropComments() {
    await CommentModelClass.collection.drop();
  }
  async dropIps() {
    await IpModelClass.collection.drop();
  }
  async dropJwt() {
    await RefreshTokenClass.collection.drop();
  }
  async dropPosts() {
    await PostsModelClass.collection.drop();
  }
  async dropUsers() {
    await UserModelClass.collection.drop();
  }
}