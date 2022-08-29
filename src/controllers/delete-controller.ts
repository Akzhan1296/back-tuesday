import { Request, Response, Router } from "express";

import { DeleteDataRepository } from "../repositories/delete-data-db-repository";

export class DeleteController {
  constructor(protected deleteDataRepository: DeleteDataRepository) { }

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
