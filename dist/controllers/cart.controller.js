"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.addProductToCart = exports.updateCartItem = exports.deletecartItem = exports.deletecartItems = exports.getCurrentUserCart = exports.getCart = exports.getCarts = void 0;
const Cart_1 = require("../entity/Cart");
const orderItems_1 = require("../entity/orderItems");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const cartSchema_1 = __importStar(require("../schemas/cartSchema "));
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
            return res.json(cart);
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
const deletecartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.jwtPayload.userId;
    const proId = +req.params.productId;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        if (cart != null) {
            const oldCartItem = cart.items.find(({ productId }) => productId == proId);
            console.log(oldCartItem);
            cart.quentity = cart.quentity - oldCartItem.quantity;
            cart.price = cart.price - oldCartItem.price;
            cart.items = cart.items.map((item) => {
                if (item.productId != proId) {
                    return item;
                }
            });
            yield cart.save();
            console.log(cart);
            return res.json(cart);
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
exports.deletecartItem = deletecartItem;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = res.locals.jwtPayload.userId;
    const proId = +req.params.productId;
    console.log(proId);
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        const validate = cartSchema_1.UpdateCartSchema.validate(req.body);
        console.log(validate);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            const oldCartItem = cart.items.map((item) => {
                if (item.productId != proId) {
                    return item;
                }
            });
            console.log(oldCartItem.length);
            console.log();
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
exports.updateCartItem = updateCartItem;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = res.locals.jwtPayload.userId;
    console.log(req.body);
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        const user = yield User_1.User.findOne({ where: { id: parseInt(res.locals.jwtPayload.userId) }, relations: ['orders', 'cart'] });
        //  let items = await OrderItems.find({where: {cID : user.cart.id}, relations : ['order', 'cart']});
        const validate = cartSchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            if (cart != null) {
                let cartContainProduct = false;
                for (let i = 0; cart.items.length; i++) {
                    if (cart.items[i].productId == req.body.item[0].id) {
                        cartContainProduct = true;
                    }
                }
                let cartItems;
                console.log(cartContainProduct);
                if (cartContainProduct) {
                    cartItems = yield orderItems_1.OrderItems.find({ where: { cID: user.cart.id } });
                    console.log(cartItems);
                }
                let items = new orderItems_1.OrderItems();
                let Qsum = 0;
                let Psum = 0;
                for (let i = 0; i < req.body.items.length; i++) {
                    const product = yield Product_1.Product.findOne({ where: { id: parseInt(req.body.items[i].id) }, relations: ['categories'] });
                    if (!product)
                        return res.status(404).json({ message: "Product not found" });
                    if (product != null) {
                        Qsum = Qsum + parseInt(req.body.items[i].quantity);
                        Psum = Psum + parseInt(req.body.items[i].quantity) * product.price;
                        items.productName = req.body.items[i].productName;
                        items.productId = req.body.items[i].id;
                    }
                    cart.items.push(req.body.items[i]);
                }
                cart.quentity = cart.quentity + Qsum;
                cart.price = cart.price + Psum;
                cart.status = "Pending";
                yield cart.save();
                console.log(cart);
                items.quantity = Qsum;
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
