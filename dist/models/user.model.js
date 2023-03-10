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
exports.User = void 0;
const db_1 = require("../db/db");
class UserModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            role VARCHAR(100) NOT NULL DEFAULT 'USER',
            password VARCHAR(100) NOT NUll
        );`);
            return;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT * FROM users;`)).rows;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT email,role,password,id FROM users WHERE email = '${email}' ;`)).rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM users WHERE id = ${id};`);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO users (email,password,role) VALUES ('${body.email}','${body.password}','${body.role}') RETURNING email, password, role, id;`)).rows[0];
        });
    }
}
exports.User = new UserModel();
