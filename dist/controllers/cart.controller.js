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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecartItems = exports.getCurrentUserCart = exports.getCart = exports.getCarts = void 0;
const Cart_1 = require("../entity/Cart");
const User_1 = require("../entity/User");
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.Cart.find({ relations: ['orders'] });
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
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['orders'] });
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
            const cart = yield Cart_1.Cart.findOne({ where: { id: user.cart.id }, relations: ['orders'] });
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
    const { id } = req.params;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) }, relations: ['orders'] });
        if (cart != null) {
            cart.orders = [];
            return res.status(204).send("Deleted Successfuly");
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
//   export const updateCartItems = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//       const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['orders']}) ;
//       if(cart != null){
//         for(let i = 0; i< cart.orders.length; i++){
//            if(req.body.orders[i].id == cart.orders[i].id){
//                 cart.quentity = cart.quentity - req.body.orders[i].totalQuentities;
//                 cart.price = cart.price - req.body.orders[i].totalPrice;
//                 cart.orders = cart.orders.filter((element) => {
//                     return element !== req.body.orders[i];
//                 });
//                 console.log(cart.orders);
//                 console.log(cart);
//                 await cart.save();
//            }
//         }
//         return res.status(204).json({message : "Updated Successfuly"});
//       }else{
//         return res.status(400).json({message : 'Cart is Empty'});
//       } 
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({ message: error.message });
//       }
//     }
//   };
