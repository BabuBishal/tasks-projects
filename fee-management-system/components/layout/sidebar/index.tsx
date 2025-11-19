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

const index = () => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const locale = useLocale();

  const sidebarLinks = [
    { name: t("dashboard"), icon: LayoutDashboard, path: "/dashboard" },
    { name: t("students"), icon: Users, path: "/students" },
    { name: t("payments"), icon: Wallet, path: "/payments" },
  ];
  return (
    <aside className=" absolute max-sm:-left-58 left-0 top-0 h-full min-h-screen min-w-40 max-w-58 w-full flex  flex-col border-r border-border  flex-1 transition-transform ease duration-200">
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
  );
};

export default index;
