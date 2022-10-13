import { Router } from "express";
import {
  getCart,
  getCarts,
  getCurrentUserCart,
  deletecartItems
} from "../controllers/cart.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/carts" ,[checkJwt, checkRole(["admin"])],getCarts);

router.get("/cart/:id",[checkJwt, checkRole(["admin"])], getCart);

router.get("/me",[checkJwt], getCurrentUserCart);

router.delete("/cart/:id",[checkJwt, checkRole(["admin"])], deletecartItems);

//router.put("/cart/:id",[checkJwt, checkRole(["admin"])], updateCartItems);

export default router;