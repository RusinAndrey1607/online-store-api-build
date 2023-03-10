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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const device_model_1 = require("../models/device.model");
const ApiError_1 = require("../error/ApiError");
const fs_1 = require("fs");
class DeviceController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, price, brand_id, type_id } = req.body;
                // @ts-ignore
                const { img } = req.files;
                let fileName = (0, uuid_1.v4)() + ".jpg";
                const device = yield device_model_1.Device.create({
                    name,
                    price,
                    brand_id,
                    type_id,
                    img: fileName,
                });
                img.mv(path_1.default.resolve(__dirname, "..", "static", fileName));
                return res.json(device);
            }
            catch (error) {
                console.log(error);
                return next(ApiError_1.ApiError.badRequest(error.message));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { brand_id, type_id, limit, page } = req.query;
            page = Number(page) || 1;
            limit = Number(limit) || 10;
            let offset = Number(page) * Number(limit) - Number(limit);
            let devices;
            if (!brand_id && !type_id) {
                devices = yield device_model_1.Device.findAll({ limit, offset });
            }
            if (!brand_id && type_id) {
                devices = yield device_model_1.Device.findAll({
                    where: {
                        type_id,
                    },
                    offset,
                    limit,
                });
            }
            if (brand_id && !type_id) {
                devices = yield device_model_1.Device.findAll({
                    where: {
                        brand_id,
                    },
                    offset,
                    limit,
                });
            }
            if (brand_id && type_id) {
                devices = yield device_model_1.Device.findAll({
                    where: {
                        brand_id,
                        type_id,
                    },
                    offset,
                    limit,
                });
            }
            return res.json(devices);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            const device = yield device_model_1.Device.findOne(+id);
            return res.json(device);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // @ts-ignore
            const { img } = req.files;
            let fileName = (0, uuid_1.v4)() + ".jpg";
            img.mv(path_1.default.resolve(__dirname, "..", "static", fileName));
            if (img) {
                const oldImg = yield device_model_1.Device.findImage(req.body.id);
                console.log(oldImg);
                (0, fs_1.unlink)(path_1.default.resolve(__dirname, "..", "static", oldImg.img), () => {
                    console.log("delete file with name", oldImg.img);
                });
            }
            const updatedDevice = yield device_model_1.Device.update(Object.assign(Object.assign({}, req.body), { img: fileName }));
            return res.json(updatedDevice);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            const device = yield device_model_1.Device.delete(+id);
            return res.json(device);
        });
    }
}
exports.deviceController = new DeviceController();
