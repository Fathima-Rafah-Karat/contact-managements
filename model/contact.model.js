import mongoose from "mongoose";
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        minlength:3,
        maxlength:50
    },
    phone_number:{
        type:String,
        // maxlength:10,
        required:[true,"phone_number is required"],
        unique:true,
        match:[/^\+?[1-9]\d{1,14}$/,"please fill the valid phone_number"]
    },
    email:{
        type:String,
        trim:true,
        match:[/^\S+@\S+\.\S+$/,"please fill the valid email"],
        unique:true,
        required:[true,"email is required"],
        lowercase:true
    },
    


    gender:{
        type:String,
        enum:["Female","Male","Other"],
        required:[true,"gender is required"]
    },
    image:{
        type:String,
        required: [true, "image is required"]
        // .+ one or more of any character 
        // for ex:http://example.com/photo.jpg
        // match:[/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/,"please fill the valid image url"]
    },
    Active:{
        type:Boolean,
        default:true
    }
},{timestamps:true});
const contact=mongoose.model("contact",contactSchema);
export default contact;