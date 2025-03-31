"use client"; 

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/auth/signin", "/auth/signup"];
  if (hideNavbarRoutes.includes(pathname)) return null;

  return <Navbar />;
}
