import { Router } from "express";
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["admin", "product admin" , "user"])],getCategories);

router.get("/category/:id",[checkJwt, checkRole(["admin", "product admin", "user"])], getCategory);

router.post("/category", [checkJwt, checkRole(["admin", "product admin"])], createCategory);

router.put("/category/:id",[checkJwt, checkRole(["admin", "product admin"])], updateCategory);

router.delete("/category/:id",[checkJwt, checkRole(["admin", "product admin"])], deleteCategory);

export default router;