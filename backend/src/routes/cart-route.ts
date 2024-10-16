import { Router } from "express";
import {
  changeProductQuantity,
  createAndAddCart,
  deleteProductfromCart,
  getAllCard,
  getUserCard,
} from "../controllers/cart-controller";
import { auth } from "../middlewares/auth";
const router = Router();

router.route("/add").post(createAndAddCart);
router.route("/usercart").get(auth, getUserCard);
router.route("/").get(getAllCard);
router.route("/change-quantity").put(changeProductQuantity);
router.route("/delete-product").delete(deleteProductfromCart);

export default router;
