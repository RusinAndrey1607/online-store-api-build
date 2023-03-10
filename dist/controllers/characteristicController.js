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
exports.characteristiController = void 0;
const valueCharacterisics_model_1 = require("./../models/valueCharacterisics.model");
const characteristic_value_model_1 = require("./../models/characteristic_value.model");
const characteristic_model_1 = require("../models/characteristic.model");
class CharacteristiController {
    createCharacteristic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { characteristic_name } = req.body;
            const characteristic = yield characteristic_model_1.Characteristic.create(characteristic_name);
            return res.json(characteristic);
        });
    }
    createValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value_name } = req.body;
            const value = yield characteristic_value_model_1.CharacteristicValue.create(value_name);
            return res.json(value);
        });
    }
    getAllCharacteristics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const characteristics = yield characteristic_model_1.Characteristic.findAll();
            return res.json(characteristics);
        });
    }
    getAllValues(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield characteristic_value_model_1.CharacteristicValue.findAll();
            return res.json(values);
        });
    }
    getCharacteristicsWithValues(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: device_id } = req.params;
            const values = yield valueCharacterisics_model_1.ValueCharacteristic.findAll(+device_id);
            return res.json(values);
        });
    }
    addToDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { characteristic_id, value_id, device_id } = req.body;
            const characteristic = yield valueCharacterisics_model_1.ValueCharacteristic.create({
                characteristic_id,
                value_id,
                device_id,
            });
            return res.status(200).json(characteristic);
        });
    }
}
exports.characteristiController = new CharacteristiController();
