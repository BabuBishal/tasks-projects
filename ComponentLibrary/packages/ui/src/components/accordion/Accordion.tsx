import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useId,
} from "react";
import { cn } from "@/utils/cn";
import "./accordion.css";
import { AccordionContextType } from "./accordion.types";

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const Accordion = ({
  children,
  defaultOpenItems = [],
  className,
}: {
  children: ReactNode;
  defaultOpenItems?: string[];
  className?: string;
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

  const toggleItem = useCallback((value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("accordion", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

// ───────────────────────────────────────────────
// Item
// ───────────────────────────────────────────────
const ItemContext = createContext<{ value: string; id: string } | undefined>(
  undefined
);

const Item = ({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) => {
  const id = useId();
  return (
    <ItemContext.Provider value={{ value, id }}>
      <div className={cn("accordion-item", className)}>{children}</div>
    </ItemContext.Provider>
  );
};

// ───────────────────────────────────────────────
// Trigger
// ───────────────────────────────────────────────
const Trigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const item = useContext(ItemContext);
  const accordion = useContext(AccordionContext);

  if (!item || !accordion)
    throw new Error("Accordion.Trigger must be inside Accordion.Item");

  const isOpen = accordion.openItems.includes(item.value);

  const triggerId = `${item.id}-trigger`;
  const contentId = `${item.id}-content`;

  return (
    <button
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => accordion.toggleItem(item.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          accordion.toggleItem(item.value);
        }
      }}
      className={cn(
        "accordion-trigger",
        isOpen && "accordion-trigger-open",
        className
      )}
    >
      <span>{children}</span>

      <span className={cn("accordion-icon", isOpen && "accordion-icon-open")}>
        ▼
      </span>
    </button>
  );
};

// ───────────────────────────────────────────────
// Content
// ───────────────────────────────────────────────
const Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const item = useContext(ItemContext);
  const accordion = useContext(AccordionContext);

  if (!item || !accordion)
    throw new Error("Accordion.Content must be inside Accordion.Item");

  const isOpen = accordion.openItems.includes(item.value);

  const contentId = `${item.id}-content`;
  const triggerId = `${item.id}-trigger`;

  return (
    <div
      id={contentId}
      aria-labelledby={triggerId}
      role="region"
      className={cn(
        "accordion-content",
        isOpen ? "accordion-content-open" : "accordion-content-closed",
        className
      )}
    >
      <div className="accordion-content-inner">{children}</div>
    </div>
  );
};

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;
