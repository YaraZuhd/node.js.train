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
exports.registerUser = void 0;
const User_1 = require("../entity/User");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const Cart_1 = require("../entity/Cart");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validate = userSchema_1.default.validate(req.body);
        // console.log(validate);
        // console.log(validate.error.details[0].message);
        if (!((_a = validate.error) === null || _a === void 0 ? void 0 : _a.message)) {
            const cart = new Cart_1.Cart();
            cart.quentity = 0;
            cart.status = "Empty";
            yield cart.save();
            let user = new User_1.User();
            user.password = req.body.password;
            user.hashpassword();
            user = yield User_1.User.create(Object.assign(Object.assign({}, req.body), user));
            user.cart = cart;
            yield user.save();
            return res.json(user);
        }
        else {
            return res.status(400).send(validate.error.details[0].message);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.registerUser = registerUser;
