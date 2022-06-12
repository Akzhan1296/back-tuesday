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
exports.commentsRepository = void 0;
const db_1 = require("./db");
exports.commentsRepository = {
    createCommentForSelectedPost: (comment) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.commentsCollection.insertOne(comment);
        return comment;
    }),
    getAllComments: (postId, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.commentsCollection.find({ postId }).skip(skip).limit(limit).toArray();
    }),
    getAllPostsCount: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.commentsCollection.count();
    }),
    getCommentById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let foundComment = yield db_1.commentsCollection.findOne({ _id: id });
        if (foundComment) {
            return foundComment;
        }
        else {
            return null;
        }
    }),
    deleteComment: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.commentsCollection.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }),
    updateComment: (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.commentsCollection.updateOne({ _id: id }, { $set: comment });
        return result.matchedCount === 1;
    }),
    getAllCountCommentsByPostId: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.commentsCollection.count({ postId });
    })
};
//# sourceMappingURL=comments-db-repositry.js.map