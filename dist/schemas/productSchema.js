"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const CategorySchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
});
const productSchema = joi_1.default.object().keys({
    id: joi_1.default.number(),
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
    desription: joi_1.default.string().required(),
    categories: joi_1.default.array().items(CategorySchema)
});
exports.default = productSchema;
