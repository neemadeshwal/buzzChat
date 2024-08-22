
import Express from "express";
import { signUp, login, verifyUser } from "../controllers/authController"
import { validateData } from "../middleware/validationMiddleware";
import { userSignupSchema } from "../schemas/userSchema";

const router = Express.Router()


router.post("/signup", validateData(userSignupSchema), signUp);
router.post("/login", login);
router.get("/verifyuser", verifyUser)


export default router