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
exports.Basket = void 0;
const db_1 = require("../db/db");
class BasketModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS baskets(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE,
            FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE
        );`);
            return;
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM baskets WHERE user_id = ${user_id};`);
        });
    }
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO baskets (user_id) VALUES (${user_id}) RETURNING id, user_id;`)).rows[0];
        });
    }
    findByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT * FROM baskets WHERE user_id = ${user_id}`))
                .rows[0];
        });
    }
}
exports.Basket = new BasketModel();
