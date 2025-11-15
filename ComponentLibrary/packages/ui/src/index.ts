// ===== HOOKS =====
export { useCopyToClipboard } from "./hooks/useCopyToClipboard";
export { useLocalStorage } from "./hooks/useLocalStorage";
export { useToggle } from "./hooks/useToggle";
export { useLocalStorageSyncExternal } from "./hooks/useLocalStorageUsingSyncExternalStorage";
export { useFetch } from "./hooks/useFetch";
export { useIntersectionObserverSingle } from "./hooks/useIntersectionObserver";
export { useIntersectionObserverNoRef } from "./hooks/useIntersectionObserverNoRef";
export { default as useOutsideClick } from "./hooks/useOutsideClick";
export { default as useWindowSize } from "./hooks/useWindowSize";
export { useTimeout } from "./hooks/useTimeout";

// ===== COMPONENTS =====
// Button (named export)
export { Button } from "./components/button/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/button/button.types";

// Modal (default export)
export { default as Modal } from "./components/modal/Modal";
export type { ModalProps } from "./components/modal/modal.types";

// Slider (default export)
export { default as Slider } from "./components/slider/Slider";

// Tabs (default export)
export { default as Tabs } from "./components/tab/Tabs";
export type { TabsProps, TabsContextType } from "./components/tab/tabs.types";

// Accordion (named export)
export { Accordion } from "./components/accordion/Accordion";
export type {
  AccordionProps,
  AccordionItemProps,
} from "./components/accordion/Accordion.types";

// Spinner (default export)
export { default as Spinner } from "./components/loading/Spinner/Spinner";

// LoadingDots (default export)
export { default as LoadingDots } from "./components/loading/LoadingDots/LoadingDots";

// Card (default export)
export { default as Card } from "./components/card/Card";
export type { CardProps } from "./components/card/card.types";

// Badge (default export)
export { default as Badge } from "./components/badges/Badges";
export type { BadgeProps } from "./components/badges/badges.types";

// Table (named export)
export { Table } from "./components/table/Table";
export type {
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
} from "./components/table/table.types";

// Toast (default export for provider, named for hook)
export { default as ToastProvider, useToast } from "./components/toast/Toast";
export type {
  ToastOptions,
  ToastItem,
  ToastType,
} from "./components/toast/Toast.types";

// Toggle (default export)
export { default as Toggle } from "./components/toggle/Toggle";
export type { ToggleProps } from "./components/toggle/toggle.types";

// ===== FORM COMPONENTS =====
// All form components use default exports
export { default as Checkbox } from "./components/form/Checkbox/Checkbox";
export { default as Input } from "./components/form/TextInput/Input";
export { default as Select } from "./components/form/Select/Select";
export { default as Textarea } from "./components/form/Textarea/Textarea";

// Form types
export type {
  InputProps,
  TextAreaProps,
  SelectProps,
  CheckboxProps,
} from "./components/form/Form.types";

// ===== UTILS =====
export { cn } from "./utils/cn";
