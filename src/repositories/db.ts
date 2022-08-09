import { settings } from '../settings';
import mongoose, { Schema } from 'mongoose';
import { ObjectId } from "mongodb"
import { BloggerItemType, PostItemType } from '../types/types';


const { MongoClient, ServerApiVersion } = require('mongodb');
export const client = new MongoClient(settings.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// export const postsCollection = client.db('06').collection('posts');
export const bloggersCollection = client.db('06').collection('bloggers');
export const usersCollection = client.db('06').collection('users');
export const commentsCollection = client.db('06').collection('comments');
export const ipCollections = client.db('06').collection('ips');
export const refreshTokensCollections = client.db('06').collection('refresh');

export const postsScheme = new Schema<PostItemType>({
  title: String,
  shortDescription: String,
  content: String,
  bloggerId: ObjectId,
  bloggerName: String,
}, { versionKey: false });

export const postsModal = mongoose.model('posts', postsScheme);

export const bloggersScheme = new Schema<BloggerItemType>({
  name: String,
  youtubeUrl: String,
}, { versionKey: false });

export const bloggersModal = mongoose.model('bloggers', bloggersScheme);


export async function runDb() {
  try {
    await mongoose.connect(settings.MONGO_URI + settings.MONGO_DB_NAME + '?retryWrites=true&w=majority');
    console.log("Connected successfully to mongo server");
  } catch {

    await mongoose.disconnect();
    console.log("Can't connect to db");
  }
  // client.connect(async (err: any) => {
  //   try {
  //     // Connect the client to the server
  //     await client.connect();
  //     await mongoose.connect('mongodb://localhost:27017/test');
  //     console.log("Connected successfully to mongo server");

  //   } catch {
  //     console.log(err)
  //     console.log("Can't connect to db");
  //     // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
  // });
}
