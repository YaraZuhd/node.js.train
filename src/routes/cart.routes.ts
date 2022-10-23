import { Router } from "express";
import {
  getCart,
  getCarts,
  getCurrentUserCart,
  deletecartItems,
  addProductToCart
} from "../controllers/cart.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/carts" ,[checkJwt, checkRole(["admin"])],getCarts);

router.get("/cart/:id",[checkJwt, checkRole(["admin"])], getCart);

router.get("/me",[checkJwt], getCurrentUserCart);

router.delete("/delete-cart-items",[checkJwt, checkRole(["admin", "product admin", "user"])], deletecartItems);

router.put("/add-product-to-cart",[checkJwt, checkRole(["admin", "product admin", "user"])], addProductToCart);

export default router;