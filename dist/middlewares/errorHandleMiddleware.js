"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const ApiError_1 = require("../error/ApiError");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Unexpected Error!" });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
