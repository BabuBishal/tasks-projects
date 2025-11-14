import { createContext, useContext, useState, type ReactNode } from "react";
import styles from "./Slider.module.css";

type SliderContextType = {
  id: string | number | undefined;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const SliderContext = createContext<SliderContextType | undefined>(undefined);

const Slider = ({
  children,
  id,
  initialValue = 50,
}: {
  children: ReactNode;
  id: string;
  initialValue?: number;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SliderContext.Provider value={{ id, value, setValue }}>
      <div className={styles.slider}>{children}</div>
    </SliderContext.Provider>
  );
};

export default Slider;

Slider.Label = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) => {
  const context = useContext(SliderContext);

  if (!context)
    throw new Error("Slider.Label must be used inside an Slider component.");

  const { value } = context;

  return (
    <label htmlFor={htmlFor} className="input-label">
      {children} {value}
    </label>
  );
};

Slider.Field = ({
  type = "range",
  placeholder,
  min = 0,
  max = 100,
  step = 1,
}: any) => {
  const context = useContext(SliderContext);

  if (!context)
    throw new Error("Slider.Field must be used inside an Slider component.");

  const { id, value, setValue } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  return (
    <input
      type={type}
      id={id as string}
      className={styles.inputField}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
    />
  );
};
