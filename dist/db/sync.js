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
exports.syncDB = void 0;
const characteristic_model_1 = require("./../models/characteristic.model");
const type_model_1 = require("../models/type.model");
const user_model_1 = require("../models/user.model");
const brand_model_1 = require("./../models/brand.model");
const characteristic_value_model_1 = require("../models/characteristic_value.model");
const basket_model_1 = require("../models/basket.model");
const device_model_1 = require("../models/device.model");
const valueCharacterisics_model_1 = require("../models/valueCharacterisics.model");
const rating_model_1 = require("../models/rating.model");
const basket_device_model_1 = require("../models/basket_device.model");
const syncDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield brand_model_1.Brand.createTable();
    yield type_model_1.Type.createTable();
    yield user_model_1.User.createTable();
    yield basket_model_1.Basket.createTable();
    yield characteristic_model_1.Characteristic.createTable();
    yield characteristic_value_model_1.CharacteristicValue.createTable();
    yield device_model_1.Device.createTable();
    yield valueCharacterisics_model_1.ValueCharacteristic.createTable();
    yield rating_model_1.Rating.createTable();
    yield basket_device_model_1.BasketDevice.createTable();
});
exports.syncDB = syncDB;
