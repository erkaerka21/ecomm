import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getOneProduct,
  searchProduct,
} from "../controllers/product-controller";

const router = Router();

router.route("/add").post(createProduct);
router.route("/all").get(getAllProduct);
router.route("/:id").get(getOneProduct);
router.route("/search").get(searchProduct);
export default router;
