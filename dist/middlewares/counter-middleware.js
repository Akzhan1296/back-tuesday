"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countRequestsMiddleWare = void 0;
let counter = 0;
const countRequestsMiddleWare = (req, res, next) => {
    counter++;
    res.header({ 'count': counter.toString() });
    next();
};
exports.countRequestsMiddleWare = countRequestsMiddleWare;
//# sourceMappingURL=counter-middleware.js.map