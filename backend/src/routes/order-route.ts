import { Router } from "express";

import { auth } from "../middlewares/auth";
import { createOrder, getOrder } from "../controllers/order-controller";
const router = Router();

router.route("/create-order").post(auth, createOrder);
router.route("/get-order").get(auth, getOrder);

export default router;
