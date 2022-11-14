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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const User_1 = require("../entity/User");
const jwt = __importStar(require("jsonwebtoken"));
const secretkey_1 = __importDefault(require("../secretkey"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if email and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send();
    }
    //Get user from database
    let user;
    try {
        user = yield User_1.User.findOneBy({ email: email });
        if (user != null) {
            if (!user.validatenonhashpassword(password)) {
                res.status(401).send({ message: "Password Not Match" });
                return;
            }
            //Sing JWT, valid for 1 day
            const token = jwt.sign({ userId: user.id, email: user.email }, secretkey_1.default.jwtSecret, { expiresIn: "24h" });
            res.send(token);
        }
        else {
            res.status(404).send({ message: "User is null" });
        }
        //Send the jwt in the response
    }
    catch (error) {
        res.status(404).send({ message: "User Not Found" });
    }
});
exports.loginUser = loginUser;
