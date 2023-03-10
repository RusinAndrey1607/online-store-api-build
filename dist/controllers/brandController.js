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
exports.brandController = void 0;
const brand_model_1 = require("../models/brand.model");
class BrandController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield brand_model_1.Brand.create(req.body.name);
            return res.json(brand);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const brands = yield brand_model_1.Brand.findAll();
            return res.json(brands);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const brand = yield brand_model_1.Brand.delete(+id);
            return res.json(brand);
        });
    }
}
exports.brandController = new BrandController();
