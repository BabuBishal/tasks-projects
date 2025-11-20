"use client";
import {
  // GraduationCap,
  LayoutDashboard,
  School,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const locale = useLocale();

  const sidebarLinks = [
    { name: t("dashboard"), icon: LayoutDashboard, path: "/dashboard" },
    { name: t("students"), icon: Users, path: "/students" },
    { name: t("payments"), icon: Wallet, path: "/payments" },
  ];
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 h-screen min-w-40 max-w-58 w-full flex flex-col border-r border-border flex-1 transition-transform duration-300 ease-in-out z-50 bg-background overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex gap-2 justify-center items-center p-4 h-16 border-b border-border">
          <School />
          <span className="font-semibold">{t("appTitle")}</span>
        </div>
        <div className=" flex flex-col gap-3 text-sm flex-1 p-5 h-full">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.includes(link.path);

            return (
              <Link
                href={`/${locale}${link.path}`}
                key={link.name}
                className={`p-2 flex gap-2 justify-start items-center rounded-sm cursor-pointer ${
                  isActive
                    ? "bg-secondary text-background"
                    : "hover:bg-accent transition duration-200 ease"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          {/* <div className={`p-2 flex gap-2 justify-start items-center  rounded-sm ${}`}>
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </div>
        <div className="p-2 flex gap-2 justify-start items-center  rounded-sm">
          <Users className="w-4 h-4" />
          <span>Student Details</span>
        </div>
        <div className="p-2 flex gap-2 justify-start items-center  rounded-sm">
          <Wallet className="w-4 h-4" />
          <span>Payments</span>
        </div> */}
        </div>
        <div className="h-16 flex gap-2 justify-start items-center p-4 border-t border-border">
          <Settings className="w-5 h-5" />
          <span className="font-medium">{t("settings")}</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
