"use client";
import ThemeToggle from "@/components/ui/card/ThemeToggle";
import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className=" flex  px-5 py-4  justify-between items-center h-16 border-b border-border dark:border-border ">
      <div className="align-start">
        <Menu className="w-5 h-5 sm:hidden" />
      </div>
      <div className="flex justify-center items-center gap-3">
        <ThemeToggle />
        <Bell className="w-5 h-5 cursor-pointer" />
        <span className="w-8 h-8 cursor-pointer rounded-full border border-border overflow-hidden">
          <img
            src="/hacker.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
