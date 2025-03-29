import { NextResponse ,NextRequest} from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/db/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export async function POST( req:NextRequest) {
   try{ 
        await connectDB();
        const body=await req.json();
        const {email, password}= body;
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

        return NextResponse.json({
            message:"logged in successfully",
            user:userData,
            token,

        });
    }catch(e){
        console.log("error during signin:  ",e);
        return NextResponse.json({error:e});
    }
}