import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const captainSchema = new Schema({
    fullname:{
        type:String,
        required:[true,"fullname is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    vehicle:{
        color:{
            type:String,
            required:[true,"color is required"]
        },
        plate:{
            type:String,
            required:[true,"plate is required"]
        },
        capacity:{
            type:Number,
            default:1,
            required:[true,"capacity is required"]
        },
        vehicleType:{
            type:String,
            enum:['car','auto','bike'],
            required:[true,"vehicle type is required"]
        }
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
},{timestamps:true})

captainSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

captainSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.methods.generateJwt=function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'24h'
        }
    )
}

export const CaptainModel=mongoose.model("CaptainModel",captainSchema)


