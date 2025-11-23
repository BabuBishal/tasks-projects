"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items?: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // If items are not provided, auto-generate from pathname
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split("/").filter((path) => path);
  // Remove locale if present (assuming locale is first)
  // This is a naive check, might need adjustment based on actual routing
  if (["en", "ne"].includes(paths[0])) {
    paths.shift();
  }

  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const label =
      path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    return { label, href };
  });
}
