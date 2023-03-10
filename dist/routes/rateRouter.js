"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateRouter = void 0;
const express_1 = require("express");
const ratingController_1 = require("../controllers/ratingController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.rateRouter = (0, express_1.Router)();
exports.rateRouter.post("/", authMiddleware_1.AuthMiddleware, ratingController_1.ratingController.create);
exports.rateRouter.delete("/:id", authMiddleware_1.AuthMiddleware, ratingController_1.ratingController.delete);
