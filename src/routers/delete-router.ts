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

    if (list.includes('ips')) {
        await db.collection('ips').drop();
    }
    if (list.includes('posts')) {
        await db.collection('posts').drop();
    }
    if (list.includes('bloggers')) {
        await db.collection('bloggers').drop();
    }
    if (list.includes('users')) {
        await db.collection('users').drop();
    }
    if (list.includes('comments')) {
        await db.collection('comments').drop();
    }

    return res.status(204).send();
})
