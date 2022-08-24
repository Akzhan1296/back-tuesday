import { settings } from '../settings';
import mongoose, { Schema, model } from 'mongoose';
import { ObjectId } from "mongodb"
import { BloggerItemType, CommentType, PostItemType, UserDBType } from '../types/types';


// const { MongoClient, ServerApiVersion } = require('mongodb');
// export const client = new MongoClient(settings.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const postsSchema = new Schema<PostItemType>({
  title: String,
  shortDescription: String,
  content: String,
  bloggerId: ObjectId,
  bloggerName: String,
}, { versionKey: false });

export const PostsModelClass = model('posts', postsSchema);

export const bloggersSchema = new Schema<BloggerItemType>({
  name: String,
  youtubeUrl: String,
}, { versionKey: false });

export const BloggersModelClass = model('bloggers', bloggersSchema);

export const commentSchema = new Schema<CommentType>({
  userId: ObjectId,
  userLogin: String,
  content: String,
  addedAt: Date,
  postId: ObjectId
}, { versionKey: false });

export const CommentModelClass = model('comments', commentSchema);

export const userScheme = new Schema<UserDBType>({
  login: String,
  passwordHash: String,
  createdAt: Date,
  confirmCode: { type: ObjectId, default: null },
  isConfirmed: Boolean,
  email: String,
}, { versionKey: false });

export const UserModelClass = model('users', userScheme);

export const ipSchema = new Schema({
  ip: String,
  path: String,
  date: Number,
}, { versionKey: false });

export const IpModelClass = model('ips', ipSchema);

export const refreshTokenSchema = new Schema({
  userId: ObjectId,
  tokenId: ObjectId,
  exp: Number,
}, { versionKey: false });

export const RefreshTokenClass = model('refresh', refreshTokenSchema);

export async function runDb() {
  try {
    await mongoose.connect(settings.MONGO_URI + settings.MONGO_DB_NAME + '?retryWrites=true&w=majority');
    console.log("Connected successfully to mongo server");
  } catch {

    await mongoose.disconnect();
    console.log("Can't connect to db");
  }
}
