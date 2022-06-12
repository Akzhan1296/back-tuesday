"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContentTypeMiddleWare = void 0;
const checkContentTypeMiddleWare = (typeContent) => (req, res, next) => {
    const contype = req.headers['content-type'];
    if (contype !== typeContent) {
        return res.status(400).send({
            "errorsMessages": "Bad content type content type",
            "resultCode": 1
        });
    }
    else {
        next();
    }
};
exports.checkContentTypeMiddleWare = checkContentTypeMiddleWare;
//# sourceMappingURL=content-type-check-middleware.js.map