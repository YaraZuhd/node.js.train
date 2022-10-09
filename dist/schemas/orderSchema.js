"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ProductSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    quintity: joi_1.default.number().required()
});
const OrderSchema = joi_1.default.object().keys({
    id: joi_1.default.number(),
    totalPrice: joi_1.default.number(),
    totalQuentities: joi_1.default.number(),
    productItems: joi_1.default.array().items(ProductSchema).required()
});
exports.default = OrderSchema;
