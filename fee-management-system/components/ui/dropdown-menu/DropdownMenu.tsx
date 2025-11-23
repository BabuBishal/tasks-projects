"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

interface DropdownMenuItemProps {
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-56 rounded-md border border-border bg-background shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1" onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  onClick,
  children,
  icon,
}: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}

DropdownMenu.Item = DropdownMenuItem;
