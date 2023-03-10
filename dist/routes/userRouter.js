"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController_1 = require("./../controllers/userController");
const express_1 = require("express");
// const userController = require("../controllers/userController")
// const authMiddleware = require("../middlewares/authMiddleware")
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/registration", [(0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }).withMessage("Min length 5 chars")], userController_1.userController.create);
exports.userRouter.post("/login", userController_1.userController.login);
// @ts-ignore
exports.userRouter.get("/auth", authMiddleware_1.AuthMiddleware, userController_1.userController.check);
// router.post("/registration",userController.registration)
// router.post("/login",userController.login)
// router.get("/auth", authMiddleware ,userController.check)
