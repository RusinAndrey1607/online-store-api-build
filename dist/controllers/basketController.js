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
Object.defineProperty(exports, "__esModule", { value: true });
exports.basketController = void 0;
const basket_device_model_1 = require("../models/basket_device.model");
class BasketController {
    addToBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { device_id } = req.query;
            const { basket_id } = req.user;
            if (basket_id && device_id) {
                yield basket_device_model_1.BasketDevice.create({
                    device_id: +device_id,
                    basket_id: +basket_id,
                });
                return res.status(200).send("ADDED");
            }
            return res.status(404).send("Send basket_id and device_id");
        });
    }
    removeFromBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { device_id } = req.query;
            const { basket_id } = req.user;
            if (basket_id && device_id) {
                yield basket_device_model_1.BasketDevice.delete({
                    device_id: +device_id,
                    basket_id: +basket_id,
                });
                return res.status(200).send("REMOVED");
            }
            return res.status(404).send("Send basket_id and device_id");
        });
    }
    getItemsFromBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { basket_id } = req.user;
            if (basket_id) {
                const items = yield basket_device_model_1.BasketDevice.getItems(+basket_id);
                return res.status(200).json(items);
            }
            return res.status(404).send("Send basket_id and device_id");
        });
    }
}
exports.basketController = new BasketController();
