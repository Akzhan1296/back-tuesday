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
exports.bloggersService = void 0;
const bloggers_db_repository_1 = require("../repositories/bloggers-db-repository");
exports.bloggersService = {
    getBloggers: (pageNumber, pageSize, searchNameTerm) => __awaiter(void 0, void 0, void 0, function* () {
        let pn = 1;
        let ps = 10;
        let st = '';
        if (pageNumber) {
            pn = Number(pageNumber);
        }
        if (pageSize) {
            ps = Number(pageSize);
        }
        if (searchNameTerm) {
            st = searchNameTerm;
        }
        let filter = {};
        if (st.length > 0) {
            filter.name = new RegExp(st);
        }
        const skip = (pn - 1) * ps;
        const bloggers = yield bloggers_db_repository_1.bloggersRepository.getBloggers(skip, ps, filter);
        const totalCount = yield bloggers_db_repository_1.bloggersRepository.getBloggersCount(filter);
        const pagesCount = Math.ceil(totalCount / ps);
        return {
            page: pn,
            pageSize: ps,
            totalCount,
            pagesCount,
            items: bloggers.map((_a) => {
                var { _id } = _a, params = __rest(_a, ["_id"]);
                return (Object.assign({ id: _id }, params));
            }),
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