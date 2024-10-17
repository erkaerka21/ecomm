import { Router } from "express";

import { auth } from "../middlewares/auth";
import { createReview, getReview } from "../controllers/review-controller";
const router = Router();

router.route("/create-review/:productId").post(auth, createReview);
router.route("/read-review/:productId").get(getReview);

export default router;
