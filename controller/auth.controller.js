import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../model/auth.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";


export const signup = async (req, res, next) => {
  console.log("signup");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;

    //  user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await Auth.create([{ email, password: hashedPassword }], { session });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }

}

export const signin = async (req, res, next) => {
try{
    const{email,password}=req.body;
    const user=await Auth.findOne({email});
    // if the user is not existing
    if(!user){
        res.status(404).json({
            success: false,
            message: "User not found",
            data: null
        })
    }
// it is existing and  validate password
// it is compare to signup password and signin password
const isPasswordValid=await bcrypt.compare(password,user.password);
// if the password is not validate
if(!isPasswordValid){
    const error=new Error("invalid password");
    error.statusCode=401;
    throw error;
}
// if the password is validate generate new token
const token =jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
res.status(200).json({
    success:true,
    message:"user singned in successfully",
    data:{
        token,
        user,
    }
})
}catch(error){
    next(error);
}
}
export const signout = async (req, res, next) => {
  res.status(200).json({
    success:true,
    message:"user signed out successfully"
  })

}

