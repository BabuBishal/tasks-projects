"use client";

import LanguageSwitcher from "@/components/shared/language-switcher/LanguageSwitcher";
import ThemeToggle from "@/components/shared/theme-toggle/ThemeToggle";
import { Bell, Menu, UserCircle } from "lucide-react";

import Profile from "../profile/Profile";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  // const session = await getServerSession(authOptions);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-30 w-full flex px-5 py-4 justify-between items-center h-16 border-b border-border dark:border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="align-start">
        <Menu
          className="w-5 h-5 md:hidden cursor-pointer"
          onClick={onMenuClick}
        />
      </div>
      <div className="flex justify-center items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Bell className="w-5 h-5 cursor-pointer" />
        <span
          ref={dropdownRef}
          className=" relative flex gap-3 cursor-pointer "
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <UserCircle className="w-6 h-6" />
          {/* <span>{session && session.user ? session.user.name : "User"}</span> */}
          {openDropdown && <Profile />}{" "}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
