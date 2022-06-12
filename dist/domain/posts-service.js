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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const utils_1 = require("../application/utils");
const posts_db_repository_1 = require("../repositories/posts-db-repository");
exports.postsService = {
    getPosts: (pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        let pn = 1;
        let ps = 10;
        if (pageNumber) {
            pn = Number(pageNumber);
        }
        if (pageSize) {
            ps = Number(pageSize);
        }
        const skip = (pn - 1) * ps;
        const posts = yield posts_db_repository_1.postsRepository.getPosts(skip, ps);
        const totalCount = yield posts_db_repository_1.postsRepository.getPostsCount({});
        const pagesCount = Math.ceil(totalCount / ps);
        return {
            page: pn,
            pageSize: ps,
            totalCount,
            pagesCount,
            items: posts.map(p => ((0, utils_1.transferIdToString)(p))),
        };
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return posts_db_repository_1.postsRepository.getPostById(id);
    }),
    getPostByBloggerId: (bloggerId, pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        let pn = 1;
        let ps = 10;
        if (pageNumber) {
            pn = Number(pageNumber);
        }
        if (pageSize) {
            ps = Number(pageSize);
        }
        const skip = (pn - 1) * ps;
        const totalCount = yield posts_db_repository_1.postsRepository.getPostsCount({ bloggerId });
        const postsByBlogger = yield posts_db_repository_1.postsRepository.getPostByBloggerId(bloggerId, skip, ps);
        const pagesCount = Math.ceil(totalCount / ps);
        return {
            page: pn,
            pageSize: ps,
            totalCount,
            pagesCount,
            items: postsByBlogger ? postsByBlogger.map(p => (0, utils_1.transferIdToString)(p)) : [],
        };
    }),
    createPost: (title, shortDescription, content, bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        };
        const createdPost = yield posts_db_repository_1.postsRepository.createPost(newPost);
        return createdPost;
    }),
    updatePost: (id, title, shortDescription, content, bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = {
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        };
        const result = yield posts_db_repository_1.postsRepository.updatePost(id, updatedPost);
        return result;
    }),
    deletePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield posts_db_repository_1.postsRepository.deletePost(id);
    })
};
//# sourceMappingURL=posts-service.js.map