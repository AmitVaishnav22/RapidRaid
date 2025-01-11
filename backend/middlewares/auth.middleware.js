import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { BlackListToken } from "../models/blackListToken.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { CaptainModel } from "../models/captain.model.js";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
        const token=req.cookies?.token || req.header("Authorization")?.split(" ")[1]
        if(!token){
            throw new apiError(401,"unauthorized access")
        }
        const isBlacklisted = await BlackListToken.findOne({token: token})
        if(isBlacklisted){
            throw new apiError(401,"Token is blacklisted")
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    try {
        const user=await User.findById(decoded._id)
        if(!user){
            throw new apiError(401,"User not found")
        }
        req.user=user
        next()
    } catch (error) {
        throw new apiError(401,error?.message || "Invalid token")
    }
})


export const verifyJWTCAP=asyncHandler(async(req, res, next)=>{
    const token=req.cookies?.token || req.header("Authorization")?.split(" ")[1]
    //console.log(token)
    if(!token){
        throw new apiError(401,"unauthorized access")
    }
    const isBlacklisted = await BlackListToken.findOne({token: token})
    if(isBlacklisted){
        throw new apiError(401,"Token is blacklisted")
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    //console.log(decoded)
    try {
        const captain= await CaptainModel.findById(decoded.id)
        if(!captain){
            throw new apiError(401,"Captain not found")
        }
        req.captain=captain
        next()
    } catch (error) {
        throw new apiError(401,error?.message || "invalid token")
    }
}) 