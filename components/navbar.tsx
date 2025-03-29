"use client"
import Image from "next/image";
import { ModeToggle } from "./toggleBtn";
import { LogoutButton } from "./logoutButton";
export default function Navbar(){
    return (
        <div className="flex items-center justify-between p-2 bg-gray-100 shadow-xl text-black dark:bg-gray-800 text-white transition:200">
            <div className="flex gap-x-2 text-2xl text-black dark:text-white">
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
            <div className="flex items-center justify-between p-2 gap-x-10 text-black dark:text-white">
                <div>
                    <ModeToggle/>
                </div>
                <div>
                    profile pic
                </div>
                <div>
                    <LogoutButton/>
                </div>
            </div>
        </div>
    );
}