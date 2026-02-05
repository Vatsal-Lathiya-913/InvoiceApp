import express from "express";
import UserSchema from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {Secret,Username,Email,Password} from "../index.js";
const router = express.Router();


router.post("/auth", async (req, res)  => {
    const {username,email,password} = req.body;
    let User = await UserSchema.findOne({email});

    //If User Exist then raise this
    if(username !== Username || email !== Email || password !== Password) {
        return res.status(400).json({error:"Invalid Credentials!!" });
    }

    //Register new User
    User = new UserSchema({username,email,password});

    //Secure Password Method//
    const salt = await bcrypt.genSalt(10);
    User.password = await bcrypt.hash(password, salt);

    //Get Unique Id for User
    const payload = {
        user:{
            id: User.id,
        }
    }

    // ⚙️ Common Expiry Times JWT Token
    // Expiry	Meaning
    // "10m"	10 minutes (short session)
    // "1h"	1 hour
    // "7d"	7 days
    // "30d"	30 days (long session, often used for "Remember Me")

    jwt.sign(payload,Secret, { expiresIn: "7d" },
        (err,jwtToken)=>{
            try{
                if(err){
                    return res.status(500).json({success:false,message:`Error while attempting to Sign Up!`});
                }
                return res.status(200).json({success:true,token: jwtToken});
            }catch(e){
                res.status(500).json({
                    success:false,
                    message:`Internal Server Error!`
                })
            }
        })

})

export default router;