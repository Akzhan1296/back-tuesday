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
exports.usersRepository = void 0;
const db_1 = require("./db");
exports.usersRepository = {
    createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.usersCollection.insertOne(newUser);
        return newUser;
    }),
    findByLogin: (login) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.usersCollection.findOne({ login });
        return user;
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.usersCollection.findOne({ _id: id });
        return user;
    }),
    getAllUsers: (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.usersCollection.find().skip(skip).limit(limit).toArray();
    }),
    getAllUsersCount: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.usersCollection.count();
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.usersCollection.deleteOne({ _id: id });
        return result.deletedCount === 1;
    })
};
//# sourceMappingURL=users-db-repository.js.map