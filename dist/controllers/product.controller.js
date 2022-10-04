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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const Product_1 = require("../entity/Product");
const productSchema_1 = __importDefault(require("../schemas/productSchema"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.find();
        return res.json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield Product_1.Product.findOneBy({ id: parseInt(id) });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        return res.json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const product = new Product_1.Product();
        product.name = req.body.name;
        product.price = parseInt(req.body.price);
        product.desription = req.body.desription;
        const validate = productSchema_1.default.validate(product);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            yield product.save();
            return res.json(product);
        }
        else {
            return res.json({ message: validate.error.message });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        const product = yield Product_1.Product.findOneBy({ id: parseInt(id) });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        const validate = productSchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            yield Product_1.Product.update({ id: parseInt(id) }, req.body);
            return res.sendStatus(204);
        }
        else {
            return res.json({ message: validate.error.message });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Product_1.Product.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Product not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteProduct = deleteProduct;
