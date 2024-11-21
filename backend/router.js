import { Router } from "express";
import * as ig from "./requesthandler.js";
const router=Router();

router.route("/verifyemail").post(ig.verifyEmail);
router.route("/signup").post(ig.signUp)
router.route("/sigin").post(ig.signIn)

export default router