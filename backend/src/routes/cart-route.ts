import { Router } from "express";
import {
  createAndAddCart,
  getAllCard,
  getUserCard,
} from "../controllers/cart-controller";
import { auth } from "../middlewares/auth";
const router = Router();

router.route("/add").post(createAndAddCart);
router.route("/usercart").get(auth, getUserCard);
router.route("/").get(getAllCard);

export default router;
