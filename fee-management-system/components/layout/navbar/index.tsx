import LanguageSwitcher from "@/components/ui/language-switcher/LanguageSwitcher";
import ThemeToggle from "@/components/ui/theme-toggle/ThemeToggle";
import { Bell, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" flex  px-5 py-4  justify-between items-center h-16 border-b border-border dark:border-border ">
      <div className="align-start">
        <Menu className="w-5 h-5 sm:hidden" />
      </div>
      <div className="flex justify-center items-center gap-3">
        <LanguageSwitcher />
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
