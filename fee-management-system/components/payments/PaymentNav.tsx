"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";
import { LayoutDashboard, History, AlertCircle } from "lucide-react";

export default function PaymentNav() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/payments",
      icon: LayoutDashboard,
      active: pathname === "/payments",
    },
    {
      name: "History",
      href: "/payments/history",
      icon: History,
      active: pathname === "/payments/history",
    },
    {
      name: "Overdue",
      href: "/payments/overdue",
      icon: AlertCircle,
      active: pathname === "/payments/overdue",
    },
  ];

  return (
    <div className="flex space-x-2 border-b mb-6">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[2px]",
              link.active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            )}
          >
            <Icon className="w-4 h-4" />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
