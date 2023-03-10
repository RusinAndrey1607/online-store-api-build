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
exports.ValueCharacteristic = void 0;
const db_1 = require("../db/db");
class ValueCharacteristicModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS value_characteristics  (
            id SERIAL PRIMARY KEY,
            characteristic_id INT,
            value_id INT,
            device_id INT ,
            FOREIGN KEY(characteristic_id) REFERENCES characteristics ON DELETE CASCADE,
            FOREIGN KEY(value_id) REFERENCES values ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
            return;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM value_characteristics WHERE id = ${id};`);
        });
    }
    findAll(device_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT  v.characteristic_value as value, c.characteristic_name as option FROM value_characteristics as vc JOIN values as v on v.id=vc.value_id JOIN characteristics as c on c.id = vc.characteristic_id  WHERE device_id=${device_id}`)).rows;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO value_characteristics (characteristic_id,value_id,device_id) VALUES (${body.characteristic_id},${body.value_id},${body.device_id}) RETURNING id, characteristic_id, value_id;`)).rows[0];
        });
    }
}
exports.ValueCharacteristic = new ValueCharacteristicModel();
