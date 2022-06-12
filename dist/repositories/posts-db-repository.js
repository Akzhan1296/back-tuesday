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
exports.postsRepository = void 0;
const db_1 = require("./db");
exports.postsRepository = {
    getPosts: (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.postsCollection.find({}).skip(skip).limit(limit).toArray();
    }),
    getPostsCount: (count) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.postsCollection.count(count);
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let foundPost = yield db_1.postsCollection.findOne({ _id: id });
        if (foundPost) {
            return foundPost;
        }
        else {
            return null;
        }
    }),
    getPostByBloggerId: (bloggerId, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        let foundPost = yield db_1.postsCollection.find({ bloggerId }).skip(skip).limit(limit).toArray();
        if (foundPost) {
            return foundPost;
        }
        else {
            return null;
        }
    }),
    createPost: (newPost) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.postsCollection.insertOne(newPost);
        return newPost;
    }),
    updatePost: (id, updatedPost) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.postsCollection.updateOne({ _id: id }, { $set: updatedPost });
        return result.matchedCount === 1;
    }),
    deletePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.postsCollection.deleteOne({ _id: id });
        return result.deletedCount === 1;
    })
};
//# sourceMappingURL=posts-db-repository.js.map