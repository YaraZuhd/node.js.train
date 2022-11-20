import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../secretkey"

export const loginUser = async (req: Request, res: Response) => {
   //Check if email and password are set
   let { email, password } = req.body;
   if (!(email && password)) {
     res.status(400).send("Enter Valid Information");
   }

   //Get user from database
   let user: User | null;
   try {
     user = await User.findOneBy({ email: email });
     if(user != null){
        if (!user.validatenonhashpassword(password)) {
            res.status(400).send("Password Not Match");
            return;
        }
          //Sing JWT, valid for 1 day
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            jwtSecret.jwtSecret,
            { expiresIn: "24h" }
        );
        res.json({token : token, user: user});
    }else{
       res.status(404).send({message : "User is null"})
    }
  //Send the jwt in the response
   } catch (error) {
     res.status(404).send({message : "User Not Found"});
   }

};
