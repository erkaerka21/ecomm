import { Router } from "express";
import { createAndAddCart } from "../controllers/cart-controller";
const router = Router();

router.route("/").post(createAndAddCart);

export default router;
