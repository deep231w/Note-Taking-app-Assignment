import { NextResponse ,NextRequest} from "next/server";

export async function POST( req:NextRequest) {
   try{ 
        const body=await req.json();
        const {email, password}= body;
        
        console.log("data from frontend signin : ", body);

        return NextResponse.json({message:"logged in successfully"});
    }catch(e){
        console.log("error during signin:  ",e);
        return NextResponse.json({error:e});
    }
}