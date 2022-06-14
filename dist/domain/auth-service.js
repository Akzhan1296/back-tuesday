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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const email_adapter_1 = require("../adapter/email-adapter");
const users_db_repository_1 = require("../repositories/users-db-repository");
const users_service_1 = require("./users-service");
exports.authService = {
    generateHash: (password) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = yield bcrypt_1.default.hash(password, 10);
        return hash;
    }),
    /**
     *
     * @param email
     * @param password
     * @return null if credentials are incorrect and admin entity in opposite case
     */
    checkCredentials(userLogin, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield users_db_repository_1.usersRepository.findByLogin(userLogin);
            console.log(user);
            if (!user) {
                return null;
            }
            let result = yield bcrypt_1.default.compare(password, user.passwordHash);
            if (result) {
                return user;
            }
            return null;
        });
    },
    registration(email, login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmCode = new mongodb_1.ObjectId();
            const newUser = yield users_service_1.usersService.createUser(login, password, email, confirmCode);
            if (newUser) {
                yield email_adapter_1.emailAdapter.sendEmail(email, 'Lesson05', `<a href="https://akzhanlesson04main.herokuapp.com?code=${confirmCode}">Confirm email</a>`);
            }
        });
    },
    confirmRegistrationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            users_service_1.usersService.confirmRegistrationCode(code);
        });
    },
    resendCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.usersService.findUserByEmail(email);
            if (user) {
                yield email_adapter_1.emailAdapter.sendEmail(email, 'Lesson05', `<a href="https://akzhanlesson04main.herokuapp.com?code=${user.confirmCode}">Confirm email</a>`);
            }
        });
    }
};
//# sourceMappingURL=auth-service.js.map