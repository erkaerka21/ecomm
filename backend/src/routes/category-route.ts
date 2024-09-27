import { Router } from "express";
import { addCategory } from "../controllers/category-controller";

const router = Router();
router.route("/add").post(addCategory);

export default router;
