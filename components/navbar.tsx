"use client"
import Image from "next/image";
import { ModeToggle } from "./toggleBtn";
export default function Navbar(){
    return (
        <div className="flex items-center justify-between p-2 bg-gray-100 shadow-xl">
            <div className="flex gap-x-2 text-2xl">
            <Image 
                src="/notes.png" 
                alt="Profile Picture"
                width={50} 
                height={50}
                className="rounded-full"
            />
                <h1 className="flex items-center">
                    Note App
                </h1>
            </div>
            <div className="flex items-center justify-between p-2 gap-x-10">
                <div>
                    <ModeToggle/>
                </div>
                <div>
                    profile pic
                </div>
            </div>
        </div>
    );
}