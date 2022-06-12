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
exports.bloggersService = void 0;
const utils_1 = require("../application/utils");
const bloggers_db_repository_1 = require("../repositories/bloggers-db-repository");
exports.bloggersService = {
    getBloggers: (paginationParams) => __awaiter(void 0, void 0, void 0, function* () {
        const { pageNumber, pageSize, skip, searchNameTerm } = paginationParams;
        let filter = {};
        if (searchNameTerm.length > 0) {
            filter.name = new RegExp(searchNameTerm);
        }
        const bloggers = yield bloggers_db_repository_1.bloggersRepository.getBloggers(skip, pageSize, filter);
        const totalCount = yield bloggers_db_repository_1.bloggersRepository.getBloggersCount(filter);
        const pagesCount = Math.ceil(totalCount / pageSize);
        return {
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            pagesCount,
            items: bloggers.map((b) => ((0, utils_1.transferIdToString)(b))),
        };
    }),
    getBloggerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_db_repository_1.bloggersRepository.getBloggerById(id);
    }),
    createBlogger: (name, youtubeUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlogger = {
            name,
            youtubeUrl,
        };
        const createdBlogger = yield bloggers_db_repository_1.bloggersRepository.createBlogger(newBlogger);
        return createdBlogger;
    }),
    updateBlogger: (id, name, youtubeUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBlogger = {
            name,
            youtubeUrl,
        };
        return yield bloggers_db_repository_1.bloggersRepository.updateBlogger(id, updatedBlogger);
    }),
    deleteBlogger: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_db_repository_1.bloggersRepository.deleteBlogger(id);
    }),
};
//# sourceMappingURL=bloggers-service.js.map