
import express from "express";
import { getAllUsers } from "../controllers/userController";

const userRoute = express.Router();


userRoute.post("/all", getAllUsers)







export default userRoute;