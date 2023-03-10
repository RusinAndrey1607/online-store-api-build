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
exports.BasketDevice = void 0;
const db_1 = require("../db/db");
class BasketDeviceModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS basket_devices(
            id SERIAL PRIMARY KEY,
            basket_id INT UNIQUE,
            device_id INT,
            FOREIGN KEY(basket_id) REFERENCES baskets ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
            return;
        });
    }
    delete(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM basket_devices WHERE device_id = ${body.device_id} basket_id=${body.basket_id};`);
        });
    }
    getItems(basket_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT bd.basket_id, d.id,d.name,d.price,d.created_at,d.img,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM basket_devices as bd  JOIN devices as d ON bd.device_id = d.id JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id  WHERE bd.basket_id = ${basket_id};`)).rows;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO baskets (device_id,basket_id) VALUES (${body.device_id},${body.basket_id}) RETURNING id, basket_id,device_id;`)).rows[0];
        });
    }
}
exports.BasketDevice = new BasketDeviceModel();
