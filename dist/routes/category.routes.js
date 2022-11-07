"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const checkJwt_1 = require("../middlewares/checkJwt");
const checkRole_1 = require("../middlewares/checkRole");
const router = (0, express_1.Router)();
router.get("/", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["admin", "product admin", "user"])], category_controller_1.getCategories);
router.get("/category/:id", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["admin", "product admin", "user"])], category_controller_1.getCategory);
router.post("/", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["admin", "product admin"])], category_controller_1.createCategory);
router.put("/category/:id", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["admin", "product admin"])], category_controller_1.updateCategory);
router.delete("/category/:id", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["admin", "product admin"])], category_controller_1.deleteCategory);
exports.default = router;
