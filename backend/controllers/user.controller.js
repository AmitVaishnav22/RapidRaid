import { User } from "../models/user.model.js";
import { BlackListToken } from "../models/blackListToken.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";


const registerUser= asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const {fullname, email, password}=req.body;

    if (!fullname|| !email || !password){
        throw new apiError(400,"Invalid user credentials")
    }

    const existingUser=await User.findOne({email});
    if (existingUser){
        throw new apiError(400,"Email already registered")
    }

    const user=await User.create({
        fullname,
        email,
        password
    })

    if(!user){
        throw new apiError(500,"Failed to register user")
    }
    const token =user.generateJwt()
    // console.log(token)
    // console.log(user)
    return res.status(200).json(
        new apiResponse(200,{user:user,token},"user successfully registered")
    )
})


const loginUser= asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    if (!email ||!password){
        throw new apiError(400,"Invalid user credentials")
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        throw new apiError(401,"User does not exist")
    }
    const isMatch=await user.isPasswordCorrect(password)
    if(!isMatch){
        throw new apiError(401,"Invalid password")
    }
    const token=user.generateJwt()
    res.cookie('token', token)
    return res.status(200).json(
        new apiResponse(200,{user:user,token},"User successfully logged in")
    )
})


const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200)
              .json(new apiResponse(200,req.user,"currentUser fetched"))
})

const logOutUser= asyncHandler(async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization.split(" ")[1]
    await BlackListToken.create({token})
    res.clearCookie('token')
    return res.status(200).json(new apiResponse(200,null,"User successfully logged out"))
})

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logOutUser
}