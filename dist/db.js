"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Cart_1 = require("./entity/Cart");
const Category_1 = require("./entity/Category");
const Order_1 = require("./entity/Order");
const orderItems_1 = require("./entity/orderItems");
const Product_1 = require("./entity/Product");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "147296",
    database: "Users 2",
    synchronize: true,
    entities: [User_1.User, Product_1.Product, Category_1.Category, Order_1.Order, Cart_1.Cart, orderItems_1.OrderItems],
});
