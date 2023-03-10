"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    }
    try {
        // @ts-ignore
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "User isn't authorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "User isn't authorized" });
    }
};
exports.AuthMiddleware = AuthMiddleware;
