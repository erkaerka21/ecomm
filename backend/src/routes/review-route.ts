import { Router } from "express";

import { auth } from "../middlewares/auth";
import { createReview } from "../controllers/review-controller";
const router = Router();

router.route("/create-review/:productId").post(auth, createReview);

export default router;
