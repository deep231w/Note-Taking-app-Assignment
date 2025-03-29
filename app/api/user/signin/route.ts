import { NextResponse ,NextRequest} from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/db/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
export async function POST( req:NextRequest) {
   try{ 
        await connectDB();
        const body=await req.json();
        if (!body) {
            return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
        }

        const {email, password}= body;
        if(!email || !password){
            return NextResponse.json({message :"invalid credentials"},{status:400});
        }

        const user= await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {
                    message:"user doesnot exist / invalid credentials",
                },{
                    status:404
                }
            )
        }
        const isMatch= await bcrypt.compare(password , user.password);
        if(!isMatch){
            return NextResponse.json({
                message:"wrong password"
            },
        {
            status:401
        })
        }
        
        const token= jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET as string,
            {expiresIn:"7d"}
        );
        const userData= user.toObject();
        delete userData.password;
        const cookie= serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        })
        const res=NextResponse.json({
            message:"logged in successfully",
            user:userData,
            token,
        });

        res.headers.set("set-cookie", cookie);
        return res;

    }catch(e){
        console.log("error during signin:  ",e);
        return NextResponse.json({error:e});
    }
}