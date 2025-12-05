import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import "./textarea.css";
import { TextareaContextType, TextareaProps } from "./textarea.types";

const TextareaContext = createContext<TextareaContextType | undefined>(
  undefined
);

export const Textarea = ({
  children,
  initialValue = "",
  className,
  disabled = false,
}: TextareaProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <TextareaContext.Provider value={{ value, setValue, disabled }}>
      <div className={cn("textarea-wrapper", className)}>
        {children ?? <Textarea.Field />}
      </div>
    </TextareaContext.Provider>
  );
};

// Default Field component
Textarea.Field = ({
  placeholder,
  rows = 4,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const context = useContext(TextareaContext);
  if (!context)
    throw new Error("Textarea.Field must be used inside a Textarea component.");

  const { value, setValue, disabled } = context;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      className="textarea-field"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      {...props}
    />
  );
};

// Optional Label component
Textarea.Label = ({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) => {
  return (
    <label htmlFor={htmlFor} className={cn("textarea-label", className)}>
      {children}
    </label>
  );
};
