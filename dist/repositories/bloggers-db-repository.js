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
exports.bloggersRepository = void 0;
const db_1 = require("./db");
exports.bloggersRepository = {
    getBloggers: (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.bloggersCollection.find(filter).skip(skip).limit(limit).toArray();
    }),
    getBloggersCount: (count) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.bloggersCollection.count(count);
    }),
    getBloggerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let blogger = yield db_1.bloggersCollection.findOne({ _id: id });
        if (blogger) {
            return blogger;
        }
        else {
            return null;
        }
    }),
    createBlogger: (newBlogger) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.bloggersCollection.insertOne(newBlogger);
        // after adding newBlogger to DB, newBlogger will be get _id, because newBlogger is obj;
        return newBlogger;
    }),
    updateBlogger: (id, updatedBlogger) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.bloggersCollection.updateOne({ _id: id }, { $set: updatedBlogger });
        return result.matchedCount === 1;
    }),
    deleteBlogger: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.bloggersCollection.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }),
};
//# sourceMappingURL=bloggers-db-repository.js.map