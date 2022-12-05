import { Router } from "express";
import {
  getCart,
  getCarts,
  getCurrentUserCart,
  deletecartItems,
  addProductToCart,
  deletecartItem,
  updateCartItem
} from "../controllers/cart.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/" ,[checkJwt, checkRole(["admin"])],getCarts);

router.get("/cart/:id",[checkJwt, checkRole(["admin"])], getCart);

router.get("/me",[checkJwt], getCurrentUserCart);

router.delete("/delete-cart-items",[checkJwt, checkRole(["admin", "product admin", "user"])], deletecartItems);

router.delete("/delete-cart-item/:productId",[checkJwt, checkRole(["admin", "product admin", "user"])], deletecartItem);

router.put("/update-cart-item/:productId",[checkJwt, checkRole(["admin", "product admin", "user"])], updateCartItem);

router.put("/add-product-to-cart",[checkJwt, checkRole(["admin", "product admin", "user"])], addProductToCart);



export default router;