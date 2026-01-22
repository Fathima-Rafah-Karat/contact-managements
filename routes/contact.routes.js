import { Router } from "express";
import { getcontacts ,getcontact,createcontact, updatecontact, deletecontact,counts} from "../controller/contact.controller.js";
import upload from "../middleware/image.middleware.js";
const contactRouter=Router();
contactRouter.get("/counts",counts)
contactRouter.get("/",getcontacts);
contactRouter.get("/:id",getcontact);
contactRouter.post("/",upload.single("image"),createcontact);
contactRouter.put("/:id",upload.single("image"),updatecontact);
contactRouter.delete("/:id",deletecontact);
export default contactRouter;
