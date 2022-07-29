import { settings } from '../settings';

const { MongoClient, ServerApiVersion } = require('mongodb');
export const client = new MongoClient(settings.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const postsCollection = client.db('06').collection('posts');
export const bloggersCollection = client.db('06').collection('bloggers');
export const usersCollection = client.db('06').collection('users');
export const commentsCollection = client.db('06').collection('comments');
export const ipCollections = client.db('06').collection('ips');
export const refreshTokensCollections = client.db('06').collection('refresh');

export async function runDb() {
  client.connect(async (err: any) => {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to mongo server");

    } catch {
      console.log(err)
      console.log("Can't connect to db");
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
}
