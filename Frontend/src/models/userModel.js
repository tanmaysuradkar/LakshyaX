import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required : [true,"Please provide a username"],
        unique:true
    },
    Email :{
        type: String,
        required : [true,"Please provide a email"],
        unique:true
    },
    password :{
        type: String,
        required : [true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifiedToken:String,
    verifiedTokenExpiry:Date
}, { timestamps: true })
const User = mongoose.models.user || mongoose.model("user",userSchema);

export default User