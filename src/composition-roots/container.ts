import { Container } from "inversify";
import { deleteIoCRegistration } from './delete-root';
import { postIoCRegistration } from './posts-root';
import { usersIoCRegistration } from './users-root';
import { commentsIoCRegistration } from './comments-root';
import { bloggersIoCRegistration } from './bloggers-root';
import { authIoCRegistration } from './auth-root';


export const container = new Container();

authIoCRegistration(container);
bloggersIoCRegistration(container);
postIoCRegistration(container);
commentsIoCRegistration(container);
usersIoCRegistration(container);
deleteIoCRegistration(container);