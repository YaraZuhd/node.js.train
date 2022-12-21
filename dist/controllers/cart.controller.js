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
            cart.items = cart.items.filter((item) => {
                if (item.productId != proId) {
                    return item;
                }
            });
            console.log(cart.items);
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
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        let item;
        let productItem = [];
        let index = 0;
        const validate = cartSchema_1.UpdateCartSchema.validate(req.body);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            if (cart != null) {
                let Qsum = 0;
                let Psum = 0;
                for (let i = 0; i < cart.items.length; i++) {
                    if (cart.items[i].productId == proId) {
                        productItem.push(cart.items[i]);
                        index = i;
                    }
                }
                console.log(req.body, productItem);
                for (let i = 0; i < req.body.items.length; i++) {
                    const product = yield Product_1.Product.findOne({ where: { id: proId }, relations: ['categories'] });
                    if (!product)
                        return res.status(404).json({ message: "Product not found" });
                    //increase
                    if (parseInt(req.body.items[i].newQuantity) > parseInt(req.body.items[i].oldQuantity)) {
                        item = yield orderItems_1.OrderItems.find({ where: { id: productItem[0].id }, relations: ['order', 'cart'] });
                        console.log(item);
                        Qsum = Qsum + (parseInt(req.body.items[i].newQuantity) - parseInt(req.body.items[i].oldQuantity));
                        item[0].quantity = Qsum + cart.items[index].quantity;
                        Psum = Psum + Qsum * product.price;
                        item[0].price = Psum + cart.items[index].price;
                        yield item[0].save();
                        cart.quentity = cart.quentity + Qsum;
                        cart.price = cart.price + Psum;
                        cart.items.map((ele) => {
                            if (ele.id == item[0].id) {
                                return item[0];
                            }
                            else {
                                return ele;
                            }
                        });
                        cart.items[index] = item[0];
                        yield cart.save();
                    }
                    //dcrease
                    if (parseInt(req.body.items[i].newQuantity) < parseInt(req.body.items[i].oldQuantity)) {
                        item = yield orderItems_1.OrderItems.find({ where: { id: productItem[0].id }, relations: ['order', 'cart'] });
                        Qsum = Qsum + (parseInt(req.body.items[i].oldQuantity) - parseInt(req.body.items[i].newQuantity));
                        item[0].quantity = cart.items[index].quantity - Qsum;
                        Psum = Psum + Qsum * product.price;
                        item[0].price = cart.items[index].price - Psum;
                        yield item[0].save();
                        cart.quentity = cart.quentity - Qsum;
                        cart.price = cart.price - Psum;
                        cart.items.map((ele) => {
                            if (ele.id == item[0].id) {
                                return item[0];
                            }
                            else {
                                return ele;
                            }
                        });
                        cart.items[index] = item[0];
                        yield cart.save();
                    }
                }
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
exports.updateCartItem = updateCartItem;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = res.locals.jwtPayload.userId;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['items'] });
        let items = new orderItems_1.OrderItems();
        let itemm;
        let productItem = [];
        let index = 0;
        const validate = cartSchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            if (cart != null && items != null) {
                let Qsum = 0;
                let Psum = 0;
                for (let i = 0; i < req.body.items.length; i++) {
                    const product = yield Product_1.Product.findOne({ where: { id: parseInt(req.body.items[i].id) }, relations: ['categories'] });
                    if (!product)
                        return res.status(404).json({ message: "Product not found" });
                    if (cart.items.length != 0) {
                        for (let i = 0; i < cart.items.length; i++) {
                            if (cart.items[i].productId == product.id) {
                                productItem.push(cart.items[i]);
                                index = i;
                            }
                        }
                    }
                    if (productItem.length == 0) {
                        if (product != null) {
                            Qsum = Qsum + parseInt(req.body.items[i].quantity);
                            Psum = Psum + parseInt(req.body.items[i].quantity) * product.price;
                            items.productName = req.body.items[i].productName;
                            items.productId = req.body.items[i].id;
                        }
                        cart.items.push(req.body.items[i]);
                    }
                    else {
                        itemm = yield orderItems_1.OrderItems.find({ where: { id: productItem[0].id }, relations: ['order', 'cart'] });
                        console.log(itemm);
                        Qsum = Qsum + parseInt(req.body.items[i].quantity);
                        itemm[0].quantity = Qsum + cart.items[index].quantity;
                        Psum = Psum + parseInt(req.body.items[i].quantity) * product.price;
                        itemm[0].price = Psum + cart.items[index].price;
                        yield itemm[0].save();
                    }
                }
                if (productItem.length > 0) {
                    cart.quentity = cart.quentity + Qsum;
                    cart.price = cart.price + Psum;
                    cart.items.map((item) => {
                        if (item.id == itemm[0].id) {
                            return itemm[0];
                        }
                        else {
                            return item;
                        }
                    });
                    cart.items[index] = itemm[0];
                    yield cart.save();
                }
                if (productItem.length == 0) {
                    cart.quentity = cart.quentity + Qsum;
                    cart.price = cart.price + Psum;
                    cart.status = "Pending";
                    yield cart.save();
                    items.quantity = Qsum;
                    items.cID = cart.id;
                    items.price = Psum;
                    items.cart = cart;
                    items = yield orderItems_1.OrderItems.create(Object.assign({}, items));
                    yield items.save();
                }
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
