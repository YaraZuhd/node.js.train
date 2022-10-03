import { Router } from "express";
import {loginUser} from "../controllers/login.controller";

const router = Router();

router.post("/auth", loginUser);


export default router;