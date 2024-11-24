import { Router } from "express";
import * as ig from "./requesthandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/home").get(Auth,ig.home)
router.route("/verifyemail").post(ig.verifyEmail);
router.route("/signup").post(ig.signUp);
router.route("/signin").post(ig.signIn);
router.route("/profile").get(Auth,ig.profile);

export default router