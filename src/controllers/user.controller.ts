import { Request, Response } from "express";
import { User } from "../entity/User";
import userDetail  from "../schemas/userSchema";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
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
  try{
    const user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.gender = req.body.gender;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = req.body.password;
    user.hashpassword();
    user.address = req.body.address;
    user.role = req.body.role || "user";
    const validate = userDetail.validate(user);
    if(!validate.error?.message){
      await user.save();
      return res.json(user);
    }else{
      return res.json({message : validate.error.message})
    }
  }catch(error){
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    const validate = userDetail.validate(req.body);
    if(!validate.error?.message){
      await User.update({ id: parseInt(id) }, req.body);
      return res.sendStatus(204);
    }else{
      return res.json({message : validate.error.message})
    }       
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

export const getCurrentUser = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  console.log(id);
  try {
    const user = await User.findOneBy({ id: parseInt(id) });
    console.log(user);
    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};