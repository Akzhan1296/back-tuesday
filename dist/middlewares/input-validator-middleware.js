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
exports.hasBloggerMiddleware = exports.sumErrorsMiddleware = exports.inputValidators = void 0;
const express_validator_1 = require("express-validator");
const bloggers_db_repository_1 = require("../repositories/bloggers-db-repository");
const mongodb_1 = require("mongodb");
exports.inputValidators = {
    titleValidate: (0, express_validator_1.body)('title').trim().notEmpty().isLength({ max: 15 }),
    shortDescription: (0, express_validator_1.body)('shortDescription').trim().notEmpty().isLength({ max: 100 }),
    content: (0, express_validator_1.body)('content').trim().notEmpty().isLength({ max: 1000 }),
    name: (0, express_validator_1.body)('name').trim().notEmpty().isLength({ max: 15 }),
    youtubeUrl: (0, express_validator_1.body)('youtubeUrl').trim().notEmpty().isLength({ max: 100 }).matches('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'),
    login: (0, express_validator_1.body)('login').notEmpty().isLength({ min: 3, max: 10 }),
    password: (0, express_validator_1.body)('password').notEmpty().isLength({ min: 6, max: 20 }),
    comments: (0, express_validator_1.body)('content').trim().notEmpty().isLength({ min: 20, max: 300 }),
    bloggerId: (0, express_validator_1.body)('bloggerId').trim().notEmpty(),
    email: (0, express_validator_1.body)('email').trim().notEmpty().isLength({ max: 100 }).isEmail(),
    code: (0, express_validator_1.body)('code').trim().notEmpty(),
};
const sumErrorsMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array({ onlyFirstError: true }).map(er => ({
                message: er.msg,
                field: er.param
            })),
            resultCode: 1
        }).send();
    }
    next();
};
exports.sumErrorsMiddleware = sumErrorsMiddleware;
const hasBloggerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggerId = new mongodb_1.ObjectId(req.body.bloggerId);
    const bloggers = yield bloggers_db_repository_1.bloggersRepository.getBloggerById(bloggerId);
    if (!bloggers) {
        res.status(400).json({
            errorsMessages: [{
                    message: "not found blogger",
                    field: "bloggerId"
                }],
            resultCode: 1,
        });
        return;
    }
    next();
});
exports.hasBloggerMiddleware = hasBloggerMiddleware;
//# sourceMappingURL=input-validator-middleware.js.map