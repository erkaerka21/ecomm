import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getOneProduct,
} from "../controllers/product-controller";

const router = Router();

router.route("/add").post(createProduct);
router.route("/all").get(getAllProduct);
router.route("/:pid").get(getOneProduct);
export default router;
