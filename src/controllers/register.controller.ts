import { Request, Response } from "express";
import { User } from "../entity/User";
import userDetail from "../schemas/userSchema";
import { Cart } from "../entity/Cart";
import { Console } from "console";

export const registerUser = async (req: Request, res: Response) => {
    try{
        
        const validate = userDetail.validate(req.body);
        if(!validate.error?.message){
        const cart = new Cart();
        cart.quentity = 0;
        cart.status = "Empty"
        await cart.save();
        let user = new User();
        user.password= req.body.password
        user.hashpassword();
        user = await User.create({ ...req.body, ...user}) 
        user.cart = cart;
        await user.save();
        return res.json(user);
        }else{
        return res.status(400).send(validate.error.details[0].message)
        }
    }catch(error){
        if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
        }
    }

};