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
exports.typeController = void 0;
const type_model_1 = require("../models/type.model");
class TypeController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield type_model_1.Type.create(req.body.name);
            return res.json(type);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const types = yield type_model_1.Type.findAll();
            return res.json(types);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const type = yield type_model_1.Type.delete(+id);
            return res.json(type);
        });
    }
}
exports.typeController = new TypeController();
