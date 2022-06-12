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
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_service_1 = require("../domain/posts-service");
const input_validator_middleware_1 = require("../middlewares/input-validator-middleware");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const object_id_middleware_1 = require("../middlewares/object-id-middleware");
const pagination_middleware_1 = require("../middlewares/pagination-middleware");
const comments_service_1 = require("../domain/comments-service");
const mongodb_1 = require("mongodb");
const utils_1 = require("../application/utils");
exports.postsRouter = (0, express_1.Router)({});
//get all posts
exports.postsRouter.get('/', pagination_middleware_1.paginationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.postsService.getPosts(req.paginationParams);
    res.status(200).send(result);
}));
//get POST by id
exports.postsRouter.get('/:id', object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const postId = new mongodb_1.ObjectId(req.params.id);
    let foundPost = yield posts_service_1.postsService.getPostById(postId);
    if (foundPost) {
        return res.status(200).send((0, utils_1.transferIdToString)(foundPost));
    }
    else {
        return res.status(404).send();
    }
}));
//create post
exports.postsRouter.post('/', auth_middleware_1.authMiddleWare, input_validator_middleware_1.hasBloggerMiddleware, input_validator_middleware_1.inputValidators.titleValidate, input_validator_middleware_1.inputValidators.content, input_validator_middleware_1.inputValidators.shortDescription, input_validator_middleware_1.inputValidators.bloggerId, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const newPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, bloggerId);
    return res.status(201).send((0, utils_1.transferIdToString)(newPost));
}));
//update post
exports.postsRouter.put('/:id', auth_middleware_1.authMiddleWare, input_validator_middleware_1.hasBloggerMiddleware, input_validator_middleware_1.inputValidators.titleValidate, input_validator_middleware_1.inputValidators.content, input_validator_middleware_1.inputValidators.shortDescription, input_validator_middleware_1.inputValidators.bloggerId, input_validator_middleware_1.sumErrorsMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const postId = new mongodb_1.ObjectId(req.params.id);
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;
    const isUpdated = yield posts_service_1.postsService.updatePost(postId, title, shortDescription, content, bloggerId);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
//delete post
exports.postsRouter.delete('/:id', auth_middleware_1.authMiddleWare, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const postId = new mongodb_1.ObjectId(req.params.id);
    const isDeleted = yield posts_service_1.postsService.deletePost(postId);
    if (isDeleted) {
        return res.send(204);
    }
    else {
        return res.send(404);
    }
}));
// adding new comments to posts
exports.postsRouter.post('/:id/comments', auth_middleware_1.userAuthMiddleware, input_validator_middleware_1.inputValidators.comments, input_validator_middleware_1.sumErrorsMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const postId = new mongodb_1.ObjectId(req.params.id);
    const comment = req.body.content;
    const user = req.user;
    let foundPost = yield posts_service_1.postsService.getPostById(postId);
    if (foundPost) {
        const newComment = yield comments_service_1.commentsService.createCommentForSelectedPost(comment, user.login, user._id, postId);
        const { postId: postId2 } = newComment, params = __rest(newComment, ["postId"]);
        return res.status(201).send({ params });
    }
    return res.status(404).send();
}));
// get selected post comments
exports.postsRouter.get('/:id/comments', object_id_middleware_1.isValidIdMiddleware, pagination_middleware_1.paginationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.status(404).send();
    const postId = new mongodb_1.ObjectId(req.params.id);
    let foundPost = yield posts_service_1.postsService.getPostById(postId);
    if (!foundPost) {
        return res.status(404).send();
    }
    const commentsWithPagination = yield comments_service_1.commentsService.getCommentsByPostId(postId, req.paginationParams);
    return res.status(200).send(commentsWithPagination);
}));
//# sourceMappingURL=posts-routers.js.map