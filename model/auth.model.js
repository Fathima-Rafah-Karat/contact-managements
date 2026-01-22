import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
  
 
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "please fill a valid email address"],

  },
  password: {
    type: String,
    required: [true, "user password is required"],
    trim: true,
    minLength: 6,
  }
  //   timestamps  -a record of date and time when something happens.it automatically adds two field like createdAt,updateAt
}, { timestamps: true });
const Auth = mongoose.model("auth", authSchema);
export default Auth;