import { Request, Response } from "express";
import { RoleEnumType, User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../secretkey"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const token = <string>req.headers['authorization']?.replace("Bearer ","")
    let jwtPayload;
    return res.json(users);
    //Try to validate the token and get data
    // try {
    //   jwtPayload = <any>jwt.verify(token, jwtSecret.jwtSecret);
    //   console.log(jwtPayload);
    //   const user =  await User.findOneBy({ id: parseInt(jwtPayload.id) });
    //   console.log(user);
    //   if(user != null){
    //      if(user.role != RoleEnumType.USER){
    //       return res.json(users);
    //      }
    //   }
    // } catch (error) {
    //   //If token is not valid, respond with 401 (unauthorized)
    //   res.status(401).send({message : "Hi"});
    //   return;
    // }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params;
    const user = await User.findOneBy({ id: parseInt(id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response
) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const role = req.body.role || "user";
  const user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.gender = gender;
  user.phone = phone;
  user.email = email;
  user.password = password;
  user.hashpassword();
  user.address = address;
  user.role = role;
  await user.save();
  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await User.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};