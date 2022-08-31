import 'reflect-metadata';
import { Container } from "inversify";
import { DeleteController } from "../controllers/delete-controller";
import { DeleteDataRepository } from "../repositories/delete-data-db-repository";

// const deleteDataRepository = new DeleteDataRepository();
// export const deleteDataControllerInstance = new DeleteController(deleteDataRepository);

export const deleteIoCRegistration = (container: Container) => {
  container.bind(DeleteController).to(DeleteController);
  container.bind(DeleteDataRepository).to(DeleteDataRepository);
}
