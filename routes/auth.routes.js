import { Router } from "express";
import {signup,signin,signout} from "../controller/auth.controller.js";
import upload from "../middleware/image.middleware.js";
const authRouter =Router();
authRouter.post("/signup",upload.single("image"),signup);
// if multiple files with field name "images"for eg:
// authrouter.post("/",upload.array("images",5),signup)
authRouter.post("/signin",upload.single("image"),signin);
authRouter.post("/signout",signout);
export default authRouter;