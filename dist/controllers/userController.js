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
exports.userController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../error/ApiError");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const basket_model_1 = require("../models/basket.model");
const express_validator_1 = require("express-validator");
const generateJwt = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "JWT_SECRET", {
        expiresIn: "24h",
    });
};
class UserController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }
            let { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError_1.ApiError.badRequest("Incorrect email or password"));
            }
            const candidate = yield user_model_1.User.findByEmail(email);
            if (candidate) {
                return next(ApiError_1.ApiError.badRequest("Email already used"));
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            const user = yield user_model_1.User.create({
                email,
                password: hashPassword,
                role: role || "USER",
            });
            const basket = yield basket_model_1.Basket.create(user.id);
            const token = generateJwt({
                id: user.id,
                email,
                role,
                basket_id: basket.id,
            });
            return res.json({ token });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            const user = yield user_model_1.User.findByEmail(email);
            if (!user) {
                return next(ApiError_1.ApiError.badRequest(`User with email ${email} not found`));
            }
            let comparePassword = yield bcrypt_1.default.compare(password, user.password);
            if (!comparePassword) {
                return next(ApiError_1.ApiError.badRequest(`Incorrect password`));
            }
            const basket = yield basket_model_1.Basket.findByUserId(user.id);
            const token = generateJwt({
                id: user.id,
                email,
                role: user.role,
                basket_id: basket.id,
            });
            return res.json({ token });
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, role, basket_id } = req.user;
            const token = generateJwt({ id, role, email, basket_id });
            return res.json({ token });
        });
    }
}
exports.userController = new UserController();
