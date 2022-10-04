import { Router } from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/products", [checkJwt, checkRole(["admin", "product admin" , "user"])],getProducts);

router.get("/product/:id",[checkJwt, checkRole(["admin", "product admin", "user"])], getProduct);

router.post("/product", [checkJwt, checkRole(["admin", "product admin"])], createProduct);

router.put("/product/:id",[checkJwt, checkRole(["admin", "product admin"])], updateProduct);

router.delete("/product/:id",[checkJwt, checkRole(["admin", "product admin"])], deleteProduct);

export default router;