"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidIdMiddleware = void 0;
const mongodb_1 = require("mongodb");
const isValidIdMiddleware = (req, res, next) => {
    let isValidId;
    try {
        new mongodb_1.ObjectId(req.params.id);
        isValidId = true;
    }
    catch (err) {
        isValidId = false;
    }
    req.isValidId = isValidId;
    next();
};
exports.isValidIdMiddleware = isValidIdMiddleware;
//# sourceMappingURL=object-id-middleware.js.map