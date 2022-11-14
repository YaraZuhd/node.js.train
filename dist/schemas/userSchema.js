"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userDetail = joi_1.default.object().keys({
    id: joi_1.default.number(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    gender: joi_1.default.string().valid('male', 'female').required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    role: joi_1.default.string().valid('user', 'admin', 'product admin'),
});
exports.default = userDetail;
