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
exports.jwtUtility = void 0;
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../settings");
exports.jwtUtility = {
    /**
     * @param user
     * @return Returns JWT-token
     */
    createJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('user', user);
            const payload = { userId: user._id };
            const secretOrPrivateKey = settings_1.settings.JWT_SECRET;
            const options = {
                expiresIn: '1d',
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, options);
            return jwtToken;
        });
    },
    extractUserIdFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
                if (!result.userId) {
                    return null;
                }
                return new mongodb_1.ObjectId(result.userId);
            }
            catch (error) {
                return null;
            }
        });
    }
};
//# sourceMappingURL=jwt-utility.js.map