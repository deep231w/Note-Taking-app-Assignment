import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/db/models/notes";

connectDB();

export async function POST(req:NextRequest){
    try{
        const body=await req.json();

        const {userId, title, description}= body;
        if(!userId || !title || !description){
            return NextResponse.json({message:"invalid credentials"});
        }
        const newNote= new Note({
            userId,
            title,
            description
        })
        await newNote.save();
    return NextResponse.json({
        message:"Notes added successfully",
        note: newNote
    },{status:200})


    }catch(e){
        console.log("errro during note adding: ", e);
        return NextResponse.json({error:e});
    }
}