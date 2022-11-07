import { Router } from "express";
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["admin", "product admin" , "user"])],getOrders);

router.get("/order/:id",[checkJwt, checkRole(["admin", "product admin", "user"])], getOrder);

router.post("/order", [checkJwt, checkRole(["admin", "product admin","user"])], createOrder);

router.put("/order/:id",[checkJwt, checkRole(["admin"])], updateOrder);

router.delete("/order/:id",[checkJwt, checkRole(["admin", "product admin","user"])], deleteOrder);

export default router;