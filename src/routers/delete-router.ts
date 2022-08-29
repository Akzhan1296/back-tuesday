import { Router } from "express";
import { deleteDataControllerInstance } from "../composition-roots/delete-root";

export const deleteRouter = Router({});

deleteRouter.delete('/all-data', deleteDataControllerInstance.deleteAllData.bind(deleteDataControllerInstance));
