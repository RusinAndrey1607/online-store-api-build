"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characteristicRouter = void 0;
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const characteristicController_1 = require("./../controllers/characteristicController");
const express_1 = require("express");
exports.characteristicRouter = (0, express_1.Router)();
exports.characteristicRouter.post("/", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), characteristicController_1.characteristiController.createCharacteristic);
exports.characteristicRouter.post("/value", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), characteristicController_1.characteristiController.createValue);
exports.characteristicRouter.post("/add", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), characteristicController_1.characteristiController.addToDevice);
exports.characteristicRouter.get("/", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), characteristicController_1.characteristiController.getAllCharacteristics);
exports.characteristicRouter.get("/values", (0, roleMiddleware_1.RoleMiddleware)("ADMIN"), characteristicController_1.characteristiController.getAllValues);
exports.characteristicRouter.get("/:id", characteristicController_1.characteristiController.getCharacteristicsWithValues);
