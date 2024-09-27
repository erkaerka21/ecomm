import { Router } from "express";
import {
  CurrentUser,
  forgetPassword,
  signUp,
} from "../controllers/auth-controller";
import { signIn } from "../controllers/auth-controller";
import { auth } from "../middlewares/auth";
// import { auth } from "../middlewares/auth";
const router = Router();
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/forgetpassword").post(forgetPassword);
router.route("/currntuser").get(auth, CurrentUser);
export default router;
