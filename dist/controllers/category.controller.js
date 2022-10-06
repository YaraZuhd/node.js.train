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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const Category_1 = require("../entity/Category");
const categorySchema_1 = __importDefault(require("../schemas/categorySchema"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.find();
        return res.json(category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.Category.findOneBy({ id: parseInt(id) });
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        return res.json(category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const category = new Category_1.Category();
        category.name = req.body.name;
        const validate = categorySchema_1.default.validate(category);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            yield category.save();
            return res.json(category);
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
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        const category = yield Category_1.Category.findOneBy({ id: parseInt(id) });
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        const validate = categorySchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            yield Category_1.Category.update({ id: parseInt(id) }, req.body);
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
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Category_1.Category.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Category not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteCategory = deleteCategory;
