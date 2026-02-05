import jsonwebtoken from 'jsonwebtoken';
import {Secret} from "../index.js";

export function UserVerify(req, res, next) {
    const authHeader = req.headers.authorization;

    //Chekc authHeader with bearer
    if(!authHeader ||  !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: "No Token Provided",
        })
    }

    //Get Token
    const token = authHeader.split(' ')[1];

    try{
        const decode = jsonwebtoken.verify(token, Secret);
        req.user = decode;
        next();
        res.status(200).json({
            user: req.user,
        })
    }catch(e){
        return res.status(403).json({
            error: "Invalid Token",
        })
    }
}