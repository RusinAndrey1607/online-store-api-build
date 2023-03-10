"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basketRouter = void 0;
const express_1 = require("express");
const basketController_1 = require("../controllers/basketController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.basketRouter = (0, express_1.Router)({});
// @ts-ignore
exports.basketRouter.post("/", authMiddleware_1.AuthMiddleware, basketController_1.basketController.addToBasket);
// @ts-ignore
exports.basketRouter.get("/", authMiddleware_1.AuthMiddleware, basketController_1.basketController.getItemsFromBasket);
// @ts-ignore
exports.basketRouter.delete("/:id", authMiddleware_1.AuthMiddleware, basketController_1.basketController.removeFromBasket);
