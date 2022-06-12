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
exports.userAuthMiddleware = exports.authMiddleWare = void 0;
const jwt_utility_1 = require("../application/jwt-utility");
const users_service_1 = require("../domain/users-service");
const authMiddleWare = (req, res, next) => {
    if (req.headers.authorization) {
        const decoded = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
        const authName = 'Basic';
        if (!req.headers.authorization.includes(authName)) {
            return res.status(401).send();
        }
        const name = decoded.split(':')[0];
        const password = decoded.split(':')[1];
        if (name === 'admin' && password === 'qwerty') {
            return next();
        }
    }
    return res.status(401).send();
};
exports.authMiddleWare = authMiddleWare;
const userAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const userId = yield jwt_utility_1.jwtUtility.extractUserIdFromToken(token);
    console.log(userId);
    if (userId) {
        const user = yield users_service_1.usersService.findUserById(userId);
        req.user = user;
        next();
        return;
    }
    res.send(401);
});
exports.userAuthMiddleware = userAuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map