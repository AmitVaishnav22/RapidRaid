import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema =new Schema({
    
    fullname:{
        type:String,
        required:[true,"fullname is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    socketId:{
        type:String
    },

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateJwt=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.JWT_SECRET,
        { 
         expiresIn:'24h'  
        }
    )
}

export const User=mongoose.model("User",userSchema)

  