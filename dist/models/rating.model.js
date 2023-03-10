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
exports.Rating = void 0;
const db_1 = require("../db/db");
class RatingModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS ratings (
            id SERIAL PRIMARY KEY,
            user_id INT ,
            device_id INT,
            rate SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
            return;
        });
    }
    rateExists(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield db_1.pool.query(`SELECT * FROM ratings WHERE device_id=${body.device_id} AND user_id=${body.user_id}`)).rowCount;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO ratings (device_id,user_id,rate) VALUES (${body.device_id},${body.user_id},${body.rate}) RETURNING id, user_id,device_id,rate;`)).rows[0];
        });
    }
    delete(user_id, device_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM ratings WHERE user_id = ${user_id} AND device_id=${device_id};`);
        });
    }
}
exports.Rating = new RatingModel();
