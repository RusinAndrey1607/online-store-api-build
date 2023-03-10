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
exports.Device = void 0;
const generateQueryWithOptions_1 = require("./../utils/generateQueryWithOptions");
const db_1 = require("../db/db");
class DeviceModel {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.query(`CREATE TABLE IF NOT EXISTS devices(
              id SERIAL PRIMARY KEY,
              name VARCHAR(100) NOT NULL UNIQUE,
              price MONEY NOT NULL,
              img VARCHAR(100),
              brand_id INT,
              type_id INT,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              FOREIGN KEY(brand_id) REFERENCES brands ON DELETE CASCADE,
              FOREIGN KEY(type_id) REFERENCES types ON DELETE CASCADE
          );`);
            return;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`INSERT INTO devices (name,price,img,brand_id,type_id) VALUES ('${body.name}',${body.price},'${body.img}', ${body.brand_id},${body.type_id}) RETURNING id, name,price,img,brand_id,type_id;`)).rows[0];
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT d.id,d.name,d.price,d.created_at,d.img,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM devices as d JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id  WHERE id = ${id};`)).rows[0];
        });
    }
    findImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.pool.query(`SELECT img from devices WHERE id=${id}`)).rows[0];
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = (0, generateQueryWithOptions_1.generateOptionsQuery)(options);
            const data = yield db_1.pool
                .query(`SELECT d.id,d.name,d.price,d.img,d.created_at,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM devices as d JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id ${str};`)
                .then((result) => {
                return {
                    rows: result.rows,
                    count: result.rowCount,
                };
            })
                .catch((err) => {
                return { rows: [] };
            });
            return data;
        });
    }
    update(updatedDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateQuery = "";
            const keys = Object.keys(updatedDevice);
            keys.map((item, index) => {
                // @ts-ignore
                if (index + 1 === keys.length) {
                    // @ts-ignore
                    updateQuery += `${item} = '${updatedDevice[item]}' `;
                }
                else {
                    // @ts-ignore
                    updateQuery += `${item} = '${updatedDevice[item]}', `;
                }
            });
            return (yield db_1.pool.query(`UPDATE devices SET ${updateQuery} WHERE id=${updatedDevice.id} RETURNING id,name,img,price,brand_id,type_id;`)).rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.pool.query(`DELETE FROM devices WHERE id = ${id};`);
        });
    }
}
exports.Device = new DeviceModel();
