import { Router } from "express";
import {
  createAndAddCart,
  getAllCard,
  getUserCard,
} from "../controllers/cart-controller";
const router = Router();

router.route("/add").post(createAndAddCart);
router.route("/:id").get(getUserCard);
router.route("/").get(getAllCard);

export default router;
