import { Request, Response, Router } from "express";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { postsRepository } from "../repositories/posts-db-repository";
import { usersRepository } from "../repositories/users-db-repository";
import { client } from '../repositories/db'

export const deleteRouter = Router({});

deleteRouter.delete('/all-data', async (req: Request, res: Response) => {

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

    // if (list.includes('ips')) {
    //     await db.collection('ips').remove({});
    // }
    // if (list.includes('posts')) {
    //     await db.collection('posts').remove({});
    // }
    // if (list.includes('bloggers')) {
    //     await db.collection('bloggers').remove({});
    // }
    // if (list.includes('users')) {
    //     await db.collection('users').remove({});
    // }
    // if (list.includes('comments')) {
    //     await db.collection('comments').remove({});
    // }

    return res.status(204).send();
})
