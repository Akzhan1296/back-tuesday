"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
//routers
const bloggers_routers_1 = require("./routers/bloggers-routers");
const posts_routers_1 = require("./routers/posts-routers");
const auth_routers_1 = require("./routers/auth-routers");
const users_routers_1 = require("./routers/users-routers");
//dataBase
const db_1 = require("./repositories/db");
const comments_routers_1 = require("./routers/comments-routers");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// app.use(blockIpMiddleWare);
// app.use(countRequestsMiddleWare);
// app.use(checkContentTypeMiddleWare('application/json'))
app.use('/auth', auth_routers_1.authRouter);
app.use('/users', users_routers_1.usersRouter);
app.use('/bloggers', bloggers_routers_1.bloggersRouter);
app.use('/posts', posts_routers_1.postsRouter);
app.use('/comments', comments_routers_1.commentsRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
});
startApp();
//# sourceMappingURL=index.js.map