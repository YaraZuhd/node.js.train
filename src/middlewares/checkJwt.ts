import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../secretkey"

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers['authorization']?.replace("Bearer ","");
  let jwtPayload;
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({message : "token not authorize"});
    return;
  }
  //Call the next middleware or controller
  next();
};