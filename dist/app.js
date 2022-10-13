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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//import cors from "cors";
const bodyParser = __importStar(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const app = (0, express_1.default)();
//app.use(cors());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use("/users", user_routes_1.default);
app.use("/login", login_routes_1.default);
app.use("/products", product_routes_1.default);
app.use("/categories", category_routes_1.default);
app.use("/order", order_routes_1.default);
app.use("/cart", cart_routes_1.default);
exports.default = app;
