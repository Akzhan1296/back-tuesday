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
exports.bloggersRouter = void 0;
const express_1 = require("express");
const bloggers_service_1 = require("../domain/bloggers-service");
const posts_service_1 = require("../domain/posts-service");
const input_validator_middleware_1 = require("../middlewares/input-validator-middleware");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const mongodb_1 = require("mongodb");
const utils_1 = require("../application/utils");
const object_id_middleware_1 = require("../middlewares/object-id-middleware");
exports.bloggersRouter = (0, express_1.Router)({});
//get all bloggers
exports.bloggersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = req.query.PageNumber;
    const pageSize = req.query.PageSize;
    const searchNameTerm = req.query.SearchNameTerm;
    const bloggers = yield bloggers_service_1.bloggersService.getBloggers(pageNumber, pageSize, searchNameTerm);
    res.status(200).send(bloggers);
}));
//get blogger by id
exports.bloggersRouter.get('/:id', object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const bloggerId = new mongodb_1.ObjectId(req.params.id);
    let foundBlogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
    if (foundBlogger) {
        return res.status(200).send((0, utils_1.transferIdToString)(foundBlogger));
    }
    else {
        return res.status(404).send();
    }
}));
//get specific blogger POSTS
exports.bloggersRouter.get('/:id/posts', object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const bloggerId = new mongodb_1.ObjectId(req.params.id);
    const pageNumber = req.query.PageNumber;
    const pageSize = req.query.PageSize;
    let foundBlogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
    if (foundBlogger) {
        let posts = yield posts_service_1.postsService.getPostByBloggerId(bloggerId, pageNumber, pageSize);
        return res.status(200).send(posts);
    }
    else {
        return res.status(404).send();
    }
}));
//create blogger +++
exports.bloggersRouter.post('/', auth_middleware_1.authMiddleWare, input_validator_middleware_1.inputValidators.name, input_validator_middleware_1.inputValidators.youtubeUrl, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const newBlogger = yield bloggers_service_1.bloggersService.createBlogger(name, youtubeUrl);
    const { _id } = newBlogger, params = __rest(newBlogger, ["_id"]);
    return res.status(201).send(Object.assign({ id: _id }, params));
}));
// create POST for specific blogger 
exports.bloggersRouter.post('/:id/posts', auth_middleware_1.authMiddleWare, input_validator_middleware_1.inputValidators.titleValidate, input_validator_middleware_1.inputValidators.content, input_validator_middleware_1.inputValidators.shortDescription, input_validator_middleware_1.sumErrorsMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = new mongodb_1.ObjectId(req.params.id);
    let foundBlogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
    if (foundBlogger) {
        const newPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, bloggerId);
        return res.status(201).send((0, utils_1.transferIdToString)(newPost));
    }
    else {
        return res.status(404).send();
    }
}));
//update blogger +++
exports.bloggersRouter.put('/:id', auth_middleware_1.authMiddleWare, input_validator_middleware_1.inputValidators.name, input_validator_middleware_1.inputValidators.youtubeUrl, input_validator_middleware_1.sumErrorsMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const bloggerId = new mongodb_1.ObjectId(req.params.id);
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    let foundBlogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
    if (!foundBlogger)
        return res.send(404);
    const isUpdated = yield bloggers_service_1.bloggersService.updateBlogger(bloggerId, name, youtubeUrl);
    if (isUpdated) {
        yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
        return res.send(204);
    }
}));
// delete blogger +++
exports.bloggersRouter.delete('/:id', auth_middleware_1.authMiddleWare, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const id = new mongodb_1.ObjectId(req.params.id);
    const isDeleted = yield bloggers_service_1.bloggersService.deleteBlogger(id);
    if (isDeleted) {
        return res.send(204);
    }
    else {
        return res.send(404);
    }
}));
//# sourceMappingURL=bloggers-routers.js.map