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
const users_db_repository_1 = require("../repositories/users-db-repository");
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
            console.log(password);
            console.log(result);
            if (result) {
                return user;
            }
            return null;
        });
    },
};
//# sourceMappingURL=auth-service.js.map