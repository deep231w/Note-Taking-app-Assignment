import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models/user";
import { connectDB } from "@/lib/db";
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
        const user= await User.create({
            name,
            email,
            password
        })
        return NextResponse.json({
            message:"signup successfully",
            user:user
        })
    }catch(e){
        console.log("error during signup: ", e)
        return NextResponse.json({
            error:e,
            status:500
        })
    }
}