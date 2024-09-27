import { Router } from "express";
import { createProduct } from "../controllers/product-controller";

const router = Router();

router.route("/add").post(createProduct);
export default router;
