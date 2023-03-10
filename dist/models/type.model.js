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
exports.Type = void 0;
const db_1 = require("../db/db");
class TypeModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS types(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );`);
            return;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM types WHERE id = ${id};`);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT id,name FROM types WHERE id = ${id};`)).rows[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT id,name FROM types;`)).rows;
        });
    }
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO types (name) VALUES ('${name}') RETURNING id, name;`)).rows[0];
        });
    }
}
exports.Type = new TypeModel();
