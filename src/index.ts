import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

//routers
import { bloggersRouter } from "./routers/bloggers-router";
import { commentsRouter } from './routers/comments-router';
import { postsRouter } from "./routers/posts-router";
import { authRouter } from './routers/auth-router'
import { usersRouter } from './routers/users-router';
import { deleteRouter } from './routers/delete-router';

//middlewares
// import { countRequestsMiddleWare } from './middlewares/counter-middleware';
// import { checkContentTypeMiddleWare } from './middlewares/content-type-check-middleware'

//dataBase
import { runDb } from './repositories/db'

import cookieParser from 'cookie-parser';
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(countRequestsMiddleWare);
// app.use(checkContentTypeMiddleWare('application/json'))

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/testing', deleteRouter);



const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    })
}

startApp();