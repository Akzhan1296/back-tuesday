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
exports.commentsService = void 0;
const comments_db_repositry_1 = require("../repositories/comments-db-repositry");
exports.commentsService = {
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
    getAllCommentsByPostId: (postId, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.getAllComments(postId, skip, limit);
    }),
    getAllPostsCount: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.getAllPostsCount();
    }),
    getAllCountCommentsByPostId: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield comments_db_repositry_1.commentsRepository.getAllCountCommentsByPostId(postId);
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