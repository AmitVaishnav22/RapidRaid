import { CaptainModel } from "../models/captain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { BlackListToken } from "../models/blackListToken.model.js";

const registerCaptain=asyncHandler(async(req,res)=>{
    const { fullname, email,password,vehicle}=req.body;
    if (!fullname || !email || !password || !vehicle){
        throw new apiError(401,"Invalid captain credentials")
    }
    const isCaptainExits=await CaptainModel.findOne({email})
    if(isCaptainExits){
        throw new apiError(401,"Captain already exists")
    }
    const captain=await CaptainModel.create({
        fullname,
        email,
        password,
        vehicle:{
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    })
    if(!captain){
        throw new apiError(500,"Failed to register captain")
    }
    const token=captain.generateJwt()
    return res.status(200).json(
        new apiResponse(200,{captain,token},"Captain successfully registered")
    )
})

const loginCaptain=asyncHandler(async (req, res) => {
    const {email,password} = req.body
    if (!email ||!password) {
        throw new apiError(401, "Invalid captain credentials")
    }
    const captain = await CaptainModel.findOne({ email }).select("+password")
    if (!captain) {
        throw new apiError(401, "Captain does not exist")
    }
    const isMatch = await captain.isPasswordCorrect(password)
    if (!isMatch) {
        throw new apiError(401, "Invalid password")
    }
    const token = captain.generateJwt()
    res.cookie('token', token)
    return res.status(200).json(
        new apiResponse(200, { captain, token }, "Captain successfully logged in")
    )
})

const logOutCaptain=asyncHandler(async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization.split(" ")[1]
    await BlackListToken.create({token})
    res.clearCookie('token')
    return res.status(200).json(
        new apiResponse(200,null,"Captain successfully logged out")
    )
})

const getCurrentCaptain=asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new apiResponse(200,req.captain,"Current captain")
    )
})




export {
    registerCaptain,
    loginCaptain,
    getCurrentCaptain,
    logOutCaptain,
}