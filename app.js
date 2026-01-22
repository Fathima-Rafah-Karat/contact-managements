import express from "express";
import {port} from "./config/env.js"
import authRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import imagelimit from "./middleware/imagelimit.middleware.js";
import cors from "cors";

const app=express();
app.use(errorMiddleware);
// image limit
app.use(imagelimit);
app.use("/uploads", express.static("uploads"));
app.use(cors());
    

app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/contact",contactRouter)
app.listen(port,async()=> {
    console.log(`contact-management api is running on http://localhost${port}`);
    await connectToDatabase();
});