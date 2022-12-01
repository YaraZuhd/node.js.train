"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ProductSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
    productName: joi_1.default.string().required()
});
const CartSchema = joi_1.default.object().keys({
    id: joi_1.default.number(),
    status: joi_1.default.string().valid('Pending', 'Empty'),
    items: joi_1.default.array().items(ProductSchema).required()
});
exports.default = CartSchema;
