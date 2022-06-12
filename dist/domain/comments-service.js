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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsService = void 0;
const utils_1 = require("../application/utils");
const comments_db_repositry_1 = require("../repositories/comments-db-repositry");
exports.commentsService = {
    getCommentsByPostId: (postId, paginationParams) => __awaiter(void 0, void 0, void 0, function* () {
        const { pageNumber, pageSize, skip } = paginationParams;
        const comments = yield comments_db_repositry_1.commentsRepository.getAllComments(postId, skip, pageSize);
        const totalCount = yield comments_db_repositry_1.commentsRepository.getAllCountCommentsByPostId(postId);
        const pagesCount = Math.ceil(totalCount / pageSize);
        return {
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            pagesCount,
            items: comments.map((_a) => {
                var { postId } = _a, rest = __rest(_a, ["postId"]);
                return (0, utils_1.transferIdToString)(rest);
            })
        };
    }),
    createCommentForSelectedPost: (content, userLogin, userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        const newComment = {
            content,
            userLogin,
            userId,
            postId,
            addedAt: new Date(),
        };
        return comments_db_repositry_1.commentsRepository.createCommentForSelectedPost(newComment);
    }),
    getAllPostsCount: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.getAllPostsCount();
    }),
    getCommentById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.getCommentById(id);
    }),
    deleteComment: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.deleteComment(id);
    }),
    updateComment: (id, content, userLogin, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedComment = {
            content,
            userLogin,
            userId,
        };
        return yield comments_db_repositry_1.commentsRepository.updateComment(id, updatedComment);
    })
};
//# sourceMappingURL=comments-service.js.map