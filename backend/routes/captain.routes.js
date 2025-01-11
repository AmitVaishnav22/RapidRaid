import { Router } from "express";
import { registerCaptain ,loginCaptain, getCurrentCaptain,logOutCaptain} from "../controllers/captain.controller.js";
import { verifyJWTCAP } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerCaptain)
router.route("/login").post(loginCaptain)

//secured routes

router.use(verifyJWTCAP)

router.route("/").get(getCurrentCaptain)
router.route("/logout").get(logOutCaptain)

export default router;