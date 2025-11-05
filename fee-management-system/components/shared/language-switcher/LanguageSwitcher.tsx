"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const locales = routing.locales;

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none cursor-pointer hover:shadow transition-shadow duration-200"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === "en" ? "English" : loc === "np" ? "नेपाली" : loc}
          </option>
        ))}
      </select>
    </div>
  );
}
