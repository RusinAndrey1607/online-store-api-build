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
exports.ratingController = void 0;
const rating_model_1 = require("../models/rating.model");
class RatingController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { device_id, rate } = req.body;
            // @ts-ignore
            const { id: user_id } = req.user;
            const rateExists = yield rating_model_1.Rating.rateExists({ device_id, user_id });
            if (rateExists) {
                return res.status(400).json("You already rate this device");
            }
            const rating = yield rating_model_1.Rating.create({ device_id, user_id, rate });
            return res.json(rating);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const { id: user_id } = req.user;
            const { id: device_id } = req.params;
            const rating = yield rating_model_1.Rating.delete(user_id, +device_id);
            return res.json(rating);
        });
    }
}
exports.ratingController = new RatingController();
