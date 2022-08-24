import { Request, Response, Router } from "express";

import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { postsRepository } from "../repositories/posts-db-repository";
import { usersRepository } from "../repositories/users-db-repository";
import { ipRepostitory } from "../repositories/ip-db-repository";
import { jwtRepository } from "../repositories/jwt-db-repository";

export const deleteRouter = Router({});

class DeleteController {
  async deleteAllData(req: Request, res: Response) {
    await usersRepository.drop();
    await commentsRepository.drop();
    await postsRepository.drop();
    await bloggersRepository.drop();
    await ipRepostitory.drop();
    await jwtRepository.drop();

    return res.status(204).send();
  }
}

const deleteControllerInstance = new DeleteController();

deleteRouter.delete('/all-data', deleteControllerInstance.deleteAllData);
