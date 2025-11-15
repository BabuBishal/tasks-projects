import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import "./input.css";
import { InputContextType, InputProps } from "./input.types";

const InputContext = createContext<InputContextType | undefined>(undefined);

export const Input = ({
  children,
  id,
  initialValue = "",
  className,
  disabled = false,
  placeholder,
}: InputProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <InputContext.Provider
      value={{ id, value, setValue, disabled, placeholder }}
    >
      <div className={cn("ui-input", className)}>{children}</div>
    </InputContext.Provider>
  );
};

Input.Label = ({ children }: { children: ReactNode }) => {
  const context = useContext(InputContext);
  if (!context)
    throw new Error("Input.Label must be used inside a Input component.");

  return (
    <label htmlFor={context.id} className="ui-input-label">
      {children}
    </label>
  );
};

Input.Field = ({
  type = "text",
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const context = useContext(InputContext);
  if (!context)
    throw new Error("Input.Field must be used inside a Input component.");

  const { id, value, setValue, disabled, placeholder } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      className="ui-input-field"
      {...props}
    />
  );
};

Input.Error = ({ children }: { children: ReactNode }) => {
  return <span className="ui-input-error">{children}</span>;
};
