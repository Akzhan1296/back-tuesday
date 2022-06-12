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
exports.authRouter = void 0;
const express_1 = require("express");
const jwt_utility_1 = require("../application/jwt-utility");
const auth_service_1 = require("../domain/auth-service");
const input_validator_middleware_1 = require("../middlewares/input-validator-middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.checkCredentials(req.body.login, req.body.password);
    if (user) {
        const token = yield jwt_utility_1.jwtUtility.createJWT(user);
        res.status(200).send({ token });
    }
    else {
        res.sendStatus(401);
    }
}));
exports.authRouter.post('/registration', input_validator_middleware_1.inputValidators.email, input_validator_middleware_1.inputValidators.login, input_validator_middleware_1.inputValidators.password, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(204).send();
}));
exports.authRouter.post('/registration-confirmation', input_validator_middleware_1.inputValidators.code, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(204).send();
}));
exports.authRouter.post('/registration-email-resending', input_validator_middleware_1.inputValidators.email, input_validator_middleware_1.sumErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(204).send();
}));
//# sourceMappingURL=auth-routers.js.map