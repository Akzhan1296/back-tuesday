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
exports.usersService = void 0;
const mongodb_1 = require("mongodb");
const auth_service_1 = require("./auth-service");
const users_db_repository_1 = require("../repositories/users-db-repository");
exports.usersService = {
    getUsers: (paginationParams) => __awaiter(void 0, void 0, void 0, function* () {
        const { pageNumber, pageSize, skip } = paginationParams;
        const users = yield users_db_repository_1.usersRepository.getAllUsers(skip, pageSize);
        const totalCount = yield users_db_repository_1.usersRepository.getAllUsersCount();
        const pagesCount = Math.ceil(totalCount / pageSize);
        return {
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            pagesCount,
            items: users.map(u => ({ id: u._id, login: u.login })),
        };
    }),
    createUser: (userLogin, userPassword, email, confirmCode) => __awaiter(void 0, void 0, void 0, function* () {
        const passwordHash = yield auth_service_1.authService.generateHash(userPassword);
        const newUser = {
            _id: new mongodb_1.ObjectId(),
            login: userLogin,
            passwordHash,
            createdAt: new Date(),
            confirmCode,
            isConfirmed: false,
            email
        };
        return users_db_repository_1.usersRepository.createUser(newUser);
    }),
    findUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return users_db_repository_1.usersRepository.findById(id);
    }),
    findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return users_db_repository_1.usersRepository.findUserByEmail(email);
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return users_db_repository_1.usersRepository.deleteUser(id);
    }),
    confirmRegistrationCode: (code) => __awaiter(void 0, void 0, void 0, function* () {
        return users_db_repository_1.usersRepository.confirmRegistrationCode(code);
    })
};
//# sourceMappingURL=users-service.js.map