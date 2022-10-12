import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../secretkey"

export const loginUser = async (req: Request, res: Response) => {
   //Check if email and password are set
   let { email, password } = req.body;
   if (!(email && password)) {
     res.status(400).send();
   }

   //Get user from database
   let user: User | null;
   try {
     user = await User.findOneBy({ email: email });
     if(user != null){
        if (!user.validatenonhashpassword(password)) {
            res.status(401).send({message : "Password Not Match"});
            return;
        }
          //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            jwtSecret.jwtSecret,
            { expiresIn: "5h" }
        );
        res.send(token);
    }else{
       res.send(404).send({message : "User is null"})
    }
  //Send the jwt in the response
   } catch (error) {
     res.status(404).send({message : "User Not Found"});
   }

};
