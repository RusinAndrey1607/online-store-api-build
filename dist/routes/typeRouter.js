"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeRouter = void 0;
const express_1 = require("express");
const typeController_1 = require("../controllers/typeController");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
exports.typeRouter = (0, express_1.Router)();
exports.typeRouter.post("/", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), typeController_1.typeController.create);
exports.typeRouter.delete("/:id", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), typeController_1.typeController.delete);
exports.typeRouter.get("/", typeController_1.typeController.getAll);
