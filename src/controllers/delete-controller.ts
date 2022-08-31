import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { DeleteDataRepository } from "../repositories/delete-data-db-repository";

@injectable()
export class DeleteController {
  constructor(@inject(DeleteDataRepository) protected deleteDataRepository: DeleteDataRepository) { }

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
