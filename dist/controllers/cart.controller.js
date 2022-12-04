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
exports.addProductToCart = exports.deletecartItems = exports.getCurrentUserCart = exports.getCart = exports.getCarts = void 0;
const Cart_1 = require("../entity/Cart");
const orderItems_1 = require("../entity/orderItems");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const cartSchema_1 = __importDefault(require("../schemas/cartSchema "));
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.Cart.find({ relations: ['items'] });
        return res.json(cart);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCarts = getCarts;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        return res.json(cart);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCart = getCart;
const getCurrentUserCart = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.jwtPayload.userId;
    try {
        const user = yield User_1.User.findOne({ where: { id: parseInt(id) }, relations: ['cart'] });
        if (user != null) {
            const cart = yield Cart_1.Cart.findOne({ where: { id: user.cart.id }, relations: ['items'] });
            return res.json(cart);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCurrentUserCart = getCurrentUserCart;
const deletecartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.jwtPayload.userId;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        if (cart != null) {
            cart.items = [];
            cart.quentity = 0;
            cart.price = 0;
            cart.status = "Empty";
            yield cart.save();
            return res.status(204).json({ message: "Deleted Successfuly" });
        }
        else {
            return res.status(400).json({ message: 'Cart is Empty' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deletecartItems = deletecartItems;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = res.locals.jwtPayload.userId;
    console.log(req.body);
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        let items = new orderItems_1.OrderItems();
        const validate = cartSchema_1.default.validate(req.body);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            if (cart != null && items != null) {
                let Qsum = 0;
                let Psum = 0;
                for (let i = 0; i < req.body.items.length; i++) {
                    const product = yield Product_1.Product.findOne({ where: { id: parseInt(req.body.items[i].id) }, relations: ['categories'] });
                    if (!product)
                        return res.status(404).json({ message: "Product not found" });
                    if (product != null) {
                        Qsum = Qsum + parseInt(req.body.items[i].quantity);
                        Psum = Psum + parseInt(req.body.items[i].quantity) * product.price;
                        // items.productName = req.body.items[i].productName;
                    }
                    cart.items.push(req.body.items[i]);
                }
                cart.quentity = cart.quentity + Qsum;
                cart.price = cart.price + Psum;
                cart.status = "Pending";
                yield cart.save();
                console.log(cart);
                items.quantity = Qsum;
                items.productName = req.body.items.productName;
                console.log(items);
                items.cID = cart.id;
                items.price = Psum;
                items.cart = cart;
                items = yield orderItems_1.OrderItems.create(Object.assign({}, items));
                yield items.save();
                console.log(items);
            }
            return res.json(cart);
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
exports.addProductToCart = addProductToCart;
