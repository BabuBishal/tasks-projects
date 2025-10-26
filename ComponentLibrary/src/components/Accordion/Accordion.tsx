import  { createContext, useContext, useState, type ReactNode } from "react";

type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);


export const Accordion = ({ children, defaultOpen, className }: AccordionProps) => {
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

// ------------------ Item ------------------
type ItemProps = { value: string; children: ReactNode };

const ItemContext = createContext<{ value: string } | undefined>(undefined);

const Item = ({ value, children }: ItemProps) => (
  <ItemContext.Provider value={{ value }}>
    <div className="border-b border-gray-300">{children}</div>
  </ItemContext.Provider>
);

// ------------------ Header ------------------
const Header = ({ children }: { children: ReactNode }) => {
  const accordion = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!accordion || !item) throw new Error("Header must be used within Accordion.Item");

  const isOpen = accordion.openItem === item.value;

  return (
    <button
      onClick={() => accordion.toggleItem(item.value)}
      className="w-full flex justify-between items-center py-3 text-left font-medium"
    >
      <span>{children}</span>
      <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
        ▼
      </span>
    </button>
  );
};

// ------------------ Content ------------------
const Content = ({ children }: { children: ReactNode }) => {
  const accordion = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!accordion || !item) throw new Error("Content must be used within Accordion.Item");

  const isOpen = accordion.openItem === item.value;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="pb-3 text-gray-600">{children}</div>
    </div>
  );
};

// attach subcomponents
Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
