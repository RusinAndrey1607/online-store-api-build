"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOptionsQuery = void 0;
const generateOptionsQuery = (options) => {
    let str = "";
    if (options.where) {
        str += "WHERE ";
        let whereKeys = Object.keys(options.where);
        whereKeys.map((item, index) => {
            if (index + 1 === whereKeys.length) {
                // @ts-ignore
                str += `${item} = '${options.where[item]}' `;
            }
            else {
                // @ts-ignore
                str += `${item} = '${options.where[item]}' AND `;
            }
        });
    }
    if (options.limit) {
        str += `LIMIT ${options.limit} `;
    }
    if (options.offset) {
        str += `OFFSET ${options.offset} `;
    }
    return str;
};
exports.generateOptionsQuery = generateOptionsQuery;
