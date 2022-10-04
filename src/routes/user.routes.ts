import { Router } from "express";
import Joi from "joi";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser
} from "../controllers/user.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/users", [checkJwt, checkRole(["admin"])],getUsers);

router.get("/user/:id",[checkJwt, checkRole(["admin"])], getUser);

router.get("/me",[checkJwt], getCurrentUser);

router.post("/user", [checkJwt, checkRole(["admin"])], createUser);

router.put("/user/:id",[checkJwt, checkRole(["admin"])], updateUser);

router.delete("/user/:id",[checkJwt, checkRole(["admin"])], deleteUser);

export default router;