"use client";

import LanguageSwitcher from "@/components/shared/language-switcher/LanguageSwitcher";
import ThemeToggle from "@/components/shared/theme-toggle/ThemeToggle";
import { Bell, Menu, User } from "lucide-react";
import Profile from "../profile/Profile";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
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

  // Fetch profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfilePicture(data.profile?.profilePicture || null);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

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
          className="relative flex gap-3 cursor-pointer"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {/* Profile Picture or Fallback */}
          <div className="w-8 h-8 p-1 rounded-full overflow-hidden  flex items-center justify-center border-2 border-border hover:border-primary transition-colors">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
          {openDropdown && <Profile profilePicture={profilePicture} />}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
