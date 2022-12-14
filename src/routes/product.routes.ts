import { Router } from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    getFilterdProducts
} from "../controllers/product.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["admin", "product admin" , "user"])],getProducts);

router.post("/filter-Products/", [checkJwt, checkRole(["admin", "product admin" , "user"])],filterProducts);

router.get("/filter-Products/", [checkJwt, checkRole(["admin", "product admin" , "user"])],getFilterdProducts);

router.get("/product/:id",[checkJwt, checkRole(["admin", "product admin", "user"])], getProduct);

router.post("/", [checkJwt, checkRole(["admin", "product admin"])], createProduct);

router.put("/product/:id",[checkJwt, checkRole(["admin", "product admin"])], updateProduct);

router.delete("/product/:id",[checkJwt, checkRole(["admin", "product admin"])], deleteProduct);

export default router;