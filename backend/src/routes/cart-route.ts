import { Router } from "express";
import { createCart } from "../controllers/cart-controller";
const router = Router();

router.route("/").post(createCart);

export default router;
