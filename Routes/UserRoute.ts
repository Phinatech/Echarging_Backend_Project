/** @format */

import { Router } from "express";
import { SignIn, SignUpUser } from "../controller/UserContoller";

const userRoute = Router();
userRoute.route("/signup").post(SignUpUser);
userRoute.route("/signin").post(SignIn);

export default userRoute;
