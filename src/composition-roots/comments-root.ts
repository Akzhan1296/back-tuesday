import 'reflect-metadata';
import { Container } from "inversify";
import { CommentsService } from "../application/comments-service";
import { CommentsController } from "../controllers/comments-controller";
import { CommentsRepository } from "../repositories/comments-db-repositry";

// const commentsRepository = new CommentsRepository();
// export const commentsService = new CommentsService(commentsRepository);
// export const commentsControllerInstance = new CommentsController(commentsService);

export const commentsIoCRegistration = (container: Container) => {
  container.bind(CommentsController).to(CommentsController);
  container.bind(CommentsService).to(CommentsService);
  container.bind(CommentsRepository).to(CommentsRepository);
}