import { Router } from "express";
import { container } from "../composition-roots/container";
import { DeleteController } from "../controllers/delete-controller";

export const deleteRouter = Router({});
const deleteController = container.resolve(DeleteController);


deleteRouter.delete('/all-data', deleteController.deleteAllData.bind(deleteController));
