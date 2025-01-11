import { Router } from "express";
import { registerUser ,loginUser, getCurrentUser, logOutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


// secured routes


router.use(verifyJWT).route("/").get(getCurrentUser)
router.use(verifyJWT).route("/logout").get(logOutUser)

export default router;


