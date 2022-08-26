import { Request, Response, Router } from "express";

import { DeleteDataRepository } from "../repositories/delete-data-db-repository";


export const deleteRouter = Router({});

class DeleteController {
  deleteDataRepository: DeleteDataRepository;

  constructor(){
    this.deleteDataRepository = new DeleteDataRepository();
  }

  async deleteAllData(req: Request, res: Response) {
    await this.deleteDataRepository.dropBloggers();
    await this.deleteDataRepository.dropComments();
    await this.deleteDataRepository.dropIps();
    await this.deleteDataRepository.dropJwt();
    await this.deleteDataRepository.dropPosts();
    await this.deleteDataRepository.dropUsers();

    return res.status(204).send();
  }
}

const deleteControllerInstance = new DeleteController();

deleteRouter.delete('/all-data', deleteControllerInstance.deleteAllData.bind(deleteControllerInstance));
