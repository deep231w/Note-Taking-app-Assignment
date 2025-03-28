import { NextResponse ,NextRequest} from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/db/models/user";
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
                }
            )
        }
        
        console.log("data from frontend signin : ", body);

        return NextResponse.json({
            message:"logged in successfully",
            user:user
        });
    }catch(e){
        console.log("error during signin:  ",e);
        return NextResponse.json({error:e});
    }
}