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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = exports.getOrders = void 0;
const Cart_1 = require("../entity/Cart");
const Order_1 = require("../entity/Order");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const orderSchema_1 = __importDefault(require("../schemas/orderSchema"));
const getOrders = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.find({ relations: ['user', 'productItems'] });
        return res.json(order);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getOrders = getOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.Order.findOne({ where: { id: parseInt(id) }, relations: ['user', 'productItems'] });
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        return res.json(order);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validate = orderSchema_1.default.validate(req.body);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            let order = new Order_1.Order();
            let Qsum = 0;
            let Psum = 0;
            for (let i = 0; i < req.body.productItems.length; i++) {
                const product = yield Product_1.Product.findOne({ where: { id: parseInt(req.body.productItems[i].id) }, relations: ['categories'] });
                if (!product)
                    return res.status(404).json({ message: "Product not found" });
                if (product != null) {
                    if ((product.quantity - req.body.productItems[i].quantity) < 0) {
                        return res.status(404).json({ message: `The Quantity you Entered Is More than The Product Quantity which is ${product.quantity}` });
                    }
                    else {
                        Qsum = Qsum + parseInt(req.body.productItems[i].quantity);
                        Psum = Psum + parseInt(req.body.productItems[i].quantity) * product.price;
                        product.quantity = product.quantity - req.body.productItems[i].quantity;
                        yield product.save();
                    }
                }
            }
            order.totalQuentities = Qsum;
            order.totalPrice = Psum;
            order.user = res.locals.jwtPayload.userId;
            const user = yield User_1.User.findOne({ where: { id: parseInt(res.locals.jwtPayload.userId) }, relations: ['cart'] });
            if (user != null) {
                const orders = [order];
                Object.assign(user, orders);
                yield user.save();
                order.productItems = req.body.productItems;
                order.cart = user.cart;
                const cart = yield Cart_1.Cart.findOneBy({ id: user.cart.id });
                order = yield Order_1.Order.create(Object.assign(Object.assign({}, req.body), order));
                if (cart != null) {
                    cart.orders = [order];
                    cart.quentity = cart.quentity + order.totalQuentities;
                    cart.price = cart.price + order.totalPrice;
                    yield cart.save();
                }
                console.log(order);
                yield order.save();
            }
            return res.json(order);
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
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        const order = yield Order_1.Order.findOneBy({ id: parseInt(id) });
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        const validate = orderSchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            yield Order_1.Order.update({ id: parseInt(id) }, req.body);
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
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Order_1.Order.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Order not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteOrder = deleteOrder;
