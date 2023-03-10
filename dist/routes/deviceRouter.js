"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const deviceController_1 = require("../controllers/deviceController");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
// const roleMiddleware = require("../middlewares/roleMiddleware")
exports.deviceRouter = (0, express_1.Router)();
exports.deviceRouter.post("/", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), deviceController_1.deviceController.create);
exports.deviceRouter.get("/", deviceController_1.deviceController.getAll);
exports.deviceRouter.get("/:id", deviceController_1.deviceController.getOne);
exports.deviceRouter.put("/", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), deviceController_1.deviceController.update);
exports.deviceRouter.delete("/:id", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), deviceController_1.deviceController.delete);
