import { Router } from "express";
import { deleteContainer } from "../composition-roots/delete-root";
import { DeleteController } from "../controllers/delete-controller";

export const deleteRouter = Router({});
const deleteController = deleteContainer.resolve(DeleteController);


deleteRouter.delete('/all-data', deleteController.deleteAllData.bind(deleteController));
