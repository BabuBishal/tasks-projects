import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  AccordionContextType,
  AccordionItemProps,
  AccordionProps,
} from "./Accordion.types";
import styles from "./Accordion.module.css";
import { cn } from "../../utils/cn";

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const Accordion = ({
  children,
  defaultOpen,
  className,
}: AccordionProps) => {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen ?? null);

  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext<{ value: string } | undefined>(
  undefined
);

const Item = ({ value, children }: AccordionItemProps) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div className={styles.accordionItem}>{children}</div>
  </AccordionItemContext.Provider>
);

const Header = ({ children }: { children: ReactNode }) => {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!accordion || !item)
    throw new Error("Header must be used within Accordion.Item");

  const isOpen = accordion.openItem === item.value;

  return (
    <button
      onClick={() => accordion.toggleItem(item.value)}
      className={styles.accordionHeader}
    >
      <span>{children}</span>
      <span className={cn(styles.accordionIcon, isOpen && styles.open)}>▼</span>
    </button>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!accordion || !item)
    throw new Error("Content must be used within Accordion.Item");

  const isOpen = accordion.openItem === item.value;

  return (
    <div className={cn(styles.accordionContent, isOpen && styles.open)}>
      <div className={styles.accordionBody}>{children}</div>
    </div>
  );
};

// attach subcomponents
Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
