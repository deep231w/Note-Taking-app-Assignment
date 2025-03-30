"use client"
import Image from "next/image";
import { ModeToggle } from "./toggleBtn";
import { LogoutButton } from "./logoutButton";
import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import useSyncNotes from "@/hook/useSyncNotes";
import useFetchNotes from "@/hook/fetchNotesHook";

export default function Navbar(){
    const { user } = useAuth();
    const { syncNotes, loading: syncLoading } = useSyncNotes();
  
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
                <button 
                    onClick={() => syncNotes(user?.id)} 
                    disabled={syncLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                    {syncLoading ? "Syncing..." : "Sync Notes"}
                </button>
            </div>
                
                <div>
                    <LogoutButton/>
                </div>
            </div>
            </div>
    );
}