import { DeleteController } from "../controllers/delete-controller";
import { DeleteDataRepository } from "../repositories/delete-data-db-repository";

const deleteDataRepository = new DeleteDataRepository();
export const deleteDataControllerInstance = new DeleteController(deleteDataRepository);
