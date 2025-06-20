"use client";

import Link from "next/link";
import { sideBarItems } from "../lib/sidebarItems";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const filteredItems = sideBarItems.filter((item) => {
    if (
      !user &&
      (item.name === "Rooms" ||
        item.name === "Add room" ||
        item.name === "Settings" ||
        item.name === "Profile")
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {filteredItems.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="flex flex-col items-center justify-center mt-12 ml-4 group relative"
        >
          {item.icon}
          <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10">
            {item.name}
          </div>
        </Link>
      ))}

      {user ? (
        <div className="ml-4 mt-12">
          <LogOut onClick={logout} className="cursor-pointer" />
        </div>
      ) : (
        <div className="ml-4 mt-12">
          <Link href="/login">
            <LogIn />
          </Link>
        </div>
      )}
    </div>
  );
}
