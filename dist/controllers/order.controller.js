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
const orderItems_1 = require("../entity/orderItems");
const User_1 = require("../entity/User");
const orderSchema_1 = __importDefault(require("../schemas/orderSchema"));
const getOrders = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.find({ relations: ['user', 'items', 'cart'] });
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
        const order = yield Order_1.Order.findOne({ where: { id: parseInt(id) }, relations: ['user', 'items', 'cart'] });
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
            const user = yield User_1.User.findOne({ where: { id: parseInt(res.locals.jwtPayload.userId) }, relations: ['cart'] });
            if (user != null && order != null) {
                order.user = user;
                const cart = yield Cart_1.Cart.findOne({ where: { id: user.cart.id }, relations: ['items'] });
                if (cart != null) {
                    const orderItems = yield orderItems_1.OrderItems.findOne({ where: { id: user.cart.id }, relations: ['order', 'cart'] });
                    console.log(orderItems);
                    if (orderItems != null) {
                        console.log("hi");
                        order.totalPrice = cart.price;
                        order.totalQuentities = cart.quentity;
                        orderItems.order = order;
                        console.log(orderItems);
                        //orderItems.cart = null;
                        yield orderItems_1.OrderItems.update({ id: cart.id }, orderItems);
                    }
                    console.log(order, orderItems);
                    cart.order = order;
                    cart.quentity = 0;
                    cart.price = 0;
                    cart.status = "Empty";
                    yield cart.save();
                    // const orders = [order];
                    // Object.assign(user, orders);
                    user.orders.push(order);
                    yield user.save();
                    order.cart = cart;
                }
                order = yield Order_1.Order.create(Object.assign(Object.assign({}, req.body), order));
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
        const order = yield Order_1.Order.findOne({ where: { id: parseInt(id) }, relations: ['user', 'cart', 'items'] });
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        const validate = orderSchema_1.default.validate(req.body);
        if (!((_b = validate.error) === null || _b === void 0 ? void 0 : _b.message)) {
            if (order != null) {
                order.status = req.body.status;
            }
            yield order.save();
            return res.sendStatus(204).json(order);
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
