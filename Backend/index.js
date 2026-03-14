import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnection from "./Database/db.js";
import Auth from "./Routes/Auth.js";
import Invoices from "./Routes/Invoices.js";
import {UserVerify} from "./Middleware/verify.js";
import UserSchema from "./Models/UserSchema.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
//Exported Data
export const Username = process.env.ADMIN_USERNAME;
export const Password = process.env.ADMIN_PASSWORD;
export const Email = process.env.ADMIN_EMAIL;
export const Secret = process.env.jwtSecret;

app.use(cors());
app.use(express.json());

await DBConnection(process.env.mongoURI);
app.use("/api",Auth);
app.use("/api",Invoices);


app.get("/",(req,res)=>{
    res.json({
        data:"Server Running on port " + port
    })
})

app.get("/user/dashboard",UserVerify,async (req,res)=>{
    try{
        const UserID = await UserSchema.findById(req.user.id);
        if(!UserID){
            return res.status(404).json({
                data:"User not found",
            })
        }
        res.json({
            message:"Welcome to Dashboard",
        })
    }catch(e){
        res.status(500).json({
            message:"Server Error"
        })
    }
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})