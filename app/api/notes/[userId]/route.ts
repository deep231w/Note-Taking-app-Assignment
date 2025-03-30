import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/db/models/notes";

connectDB();

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        console.log("Extracted userId:", userId); 

        if (!userId) {
            return NextResponse.json({ message: "Invalid user" }, { status: 400 });
        }

        const notes = await Note.find({ userId });

        if (!notes.length) {
            return NextResponse.json({ message: "No notes available" }, { status: 404 });
        }

        return NextResponse.json({ notes }, { status: 200 });

    } catch (e) {
        console.error("Error fetching notes:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
