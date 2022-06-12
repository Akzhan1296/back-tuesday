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
exports.commentsRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const utils_1 = require("../application/utils");
const comments_service_1 = require("../domain/comments-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const input_validator_middleware_1 = require("../middlewares/input-validator-middleware");
const object_id_middleware_1 = require("../middlewares/object-id-middleware");
exports.commentsRouter = (0, express_1.Router)({});
exports.commentsRouter.get('/:id', object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.send(404);
    const commentId = new mongodb_1.ObjectId(req.params.id);
    let foundComment = yield comments_service_1.commentsService.getCommentById(commentId);
    if (foundComment) {
        const { postId } = foundComment, rest = __rest(foundComment, ["postId"]);
        return res.status(200).send((0, utils_1.transferIdToString)(rest));
    }
    else {
        return res.status(404).send();
    }
}));
exports.commentsRouter.put('/:id', auth_middleware_1.userAuthMiddleware, input_validator_middleware_1.inputValidators.comments, input_validator_middleware_1.sumErrorsMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.send(404);
    const user = req.user;
    const commentId = new mongodb_1.ObjectId(req.params.id);
    const content = req.body.content;
    let foundComment = yield comments_service_1.commentsService.getCommentById(commentId);
    if (!foundComment) {
        return res.status(404).send();
    }
    if (foundComment && user && !foundComment.userId.equals(user._id)) {
        return res.status(403).send();
    }
    if (foundComment) {
        const isUpdated = yield comments_service_1.commentsService.updateComment(commentId, content, user.login, user._id);
        if (isUpdated) {
            return res.status(204).send();
        }
    }
}));
exports.commentsRouter.delete('/:id', auth_middleware_1.userAuthMiddleware, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.send(404);
    const user = req.user;
    const commentId = new mongodb_1.ObjectId(req.params.id);
    let foundComment = yield comments_service_1.commentsService.getCommentById(commentId);
    if (!foundComment) {
        return res.status(404).send();
    }
    if (foundComment && user && !foundComment.userId.equals(user._id)) {
        return res.status(403).send();
    }
    if (foundComment) {
        const isDeleted = yield comments_service_1.commentsService.deleteComment(commentId);
        if (isDeleted) {
            return res.status(204).send();
        }
    }
}));
//# sourceMappingURL=comments-routers.js.map