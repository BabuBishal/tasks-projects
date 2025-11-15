import { createContext, useContext, useState, type ReactNode } from "react";
import "./slider.css";
import { SliderContextType, SliderProps } from "./slider.types";
import { cn } from "@/utils/cn";

const SliderContext = createContext<SliderContextType | undefined>(undefined);

const Slider = ({
  children,
  id,
  initialValue = 50,
  className,
  min = 0,
  max = 100,
  disabled = false,
}: SliderProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SliderContext.Provider value={{ id, value, setValue, min, max, disabled }}>
      <div className={cn("ui-slider", className)}>{children}</div>
    </SliderContext.Provider>
  );
};

export default Slider;

// ------------------------
// Compound Components
// ------------------------

Slider.Label = ({
  children,
  htmlFor,
  showValue = true,
}: {
  children: ReactNode;
  htmlFor?: string;
  showValue?: boolean;
}) => {
  const context = useContext(SliderContext);
  if (!context)
    throw new Error("Slider.Label must be used inside a Slider component.");

  const { value } = context;

  return (
    <label htmlFor={htmlFor} className="ui-slider-label">
      {children}
      {showValue && <span className="ui-slider-value">{value}</span>}
    </label>
  );
};

Slider.Field = ({
  type = "range",
  placeholder,
  step = 1,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  step?: number;
  onChange?: (value: number) => void;
}) => {
  const context = useContext(SliderContext);
  if (!context)
    throw new Error("Slider.Field must be used inside a Slider component.");

  const { id, value, setValue, min, max, disabled } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    onChange?.(newValue);
  };

  // Calculate percentage for the filled track
  const percent = ((value - min) / (max - min)) * 100;
  const backgroundStyle = {
    background: `linear-gradient(
      to right,
      var(--ui-slider-thumb-bg, #2563eb) 0%,
      var(--ui-slider-thumb-bg, #2563eb) ${percent}%,
      var(--ui-slider-track-bg, #e6e6e6) ${percent}%,
      var(--ui-slider-track-bg, #e6e6e6) 100%
    )`,
  };

  return (
    <input
      type={type}
      id={id as string}
      className="ui-slider-field"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      style={backgroundStyle}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
    />
  );
};
