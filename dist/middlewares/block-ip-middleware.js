"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockIpMiddleWare = void 0;
const arr = [''];
const blockIpMiddleWare = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const found = arr.find(i => i === ip);
    if (found) {
        return res.send(403);
    }
    next();
};
exports.blockIpMiddleWare = blockIpMiddleWare;
//# sourceMappingURL=block-ip-middleware.js.map