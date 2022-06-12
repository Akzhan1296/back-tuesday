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
exports.usersRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const utils_1 = require("../application/utils");
const users_service_1 = require("../domain/users-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const input_validator_middleware_1 = require("../middlewares/input-validator-middleware");
const object_id_middleware_1 = require("../middlewares/object-id-middleware");
const pagination_middleware_1 = require("../middlewares/pagination-middleware");
exports.usersRouter = (0, express_1.Router)({});
// get all users
exports.usersRouter.get('/', pagination_middleware_1.paginationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersWithPagination = yield users_service_1.usersService.getUsers(req.paginationParams);
    return res.status(200).send(usersWithPagination);
}));
// create user with JWT
exports.usersRouter.post('/', auth_middleware_1.authMiddleWare, input_validator_middleware_1.inputValidators.login, input_validator_middleware_1.inputValidators.password, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_service_1.usersService.createUser(req.body.login, req.body.password);
    return res.status(201).send((0, utils_1.transferIdToString)(newUser));
}));
// delete user with JWT
exports.usersRouter.delete('/:id', auth_middleware_1.authMiddleWare, object_id_middleware_1.isValidIdMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isValidId)
        return res.send(404);
    const id = new mongodb_1.ObjectId(req.params.id);
    const isDeleted = yield users_service_1.usersService.deleteUser((id));
    if (isDeleted) {
        return res.send(204);
    }
    else {
        return res.send(404);
    }
}));
//# sourceMappingURL=users-routers.js.map