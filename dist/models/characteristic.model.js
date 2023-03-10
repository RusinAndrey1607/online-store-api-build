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
exports.Characteristic = void 0;
const db_1 = require("../db/db");
class CharacteristicModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS characteristics (
            id SERIAL PRIMARY KEY,
            characteristic_name VARCHAR(100) UNIQUE NOT NULL
        );`);
            return;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM characteristics WHERE id = ${id};`);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT *  FROM characteristics;`)).rows;
        });
    }
    create(characteristic_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO characteristics (characteristic_name) VALUES ('${characteristic_name}') RETURNING id, characteristic_name;`)).rows[0];
        });
    }
}
exports.Characteristic = new CharacteristicModel();
