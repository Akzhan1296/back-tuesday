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
exports.requestsSaverMiddleware = void 0;
const date_fns_1 = require("date-fns");
const requestsSaverMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newRequest = {
        "date": (0, date_fns_1.format)(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        "method": req.method,
        "baseUrl": req.baseUrl,
        "body": req.body,
        "params": req.params,
        "url": req.url,
        "authorization": req.headers.authorization
    };
    console.table(newRequest);
    next();
});
exports.requestsSaverMiddleware = requestsSaverMiddleware;
//# sourceMappingURL=request-test.js.map