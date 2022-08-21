import { Request, Response, Router } from "express";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { postsRepository } from "../repositories/posts-db-repository";
import { usersRepository } from "../repositories/users-db-repository";
import { client } from '../repositories/db'

export const deleteRouter = Router({});

class DeleteController {
  async deleteAllData(req: Request, res: Response) {
    const db = await client.db('06');

    const list = await db.listCollections().toArray()
    const collectionNames = ['ips', 'posts', 'bloggers', 'users', 'comments', 'refresh'];

    list.forEach((l: any) => {
      collectionNames.forEach(collectionName => {
        if (l.name.includes(collectionName)) {
          db.collection(collectionName).remove({});
        }
      })
    })

    await postsRepository.drop();
    await bloggersRepository.drop();

    return res.status(204).send();
  }
}

const deleteControllerInstance = new DeleteController();

deleteRouter.delete('/all-data', deleteControllerInstance.deleteAllData);
