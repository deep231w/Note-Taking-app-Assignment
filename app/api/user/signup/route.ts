import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models/user";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import {serialize} from "cookie";
import Jwt  from "jsonwebtoken";
export async function POST(req:NextRequest) {
    try{
        await connectDB();
        const body= await req.json();
        const {name,email, password}=body;

        if(!name ||!email || !password){
            return NextResponse.json({
                message: "invalid credentials"
            })
        }

        const existingUser= await User.findOne({email}) 
        if(existingUser){
            return NextResponse.json({
                message:"user alredy exists , please try again with another email"
            })
        }
        const hashedPassword= await bcrypt.hash(password, 10);

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token= Jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET as string,
            {expiresIn:"7d"}
        )

        const userData= user.toObject();
        delete userData.password;

        const cookie= serialize("token",token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        })

        const res= NextResponse.json({
            message:"signup successfully",
            user:userData
        })
        res.headers.set("set-cookies",cookie);

        return res;

    }catch(e){
        console.log("error during signup: ", e)
        return NextResponse.json({
            error:e,
            status:500
        })
    }
}