export type InputProps = {
  type: string;
  label: string;
  placeholder: string;
};

export type TextAreaProps = Omit<InputProps, "type"> & {
  rows?: number;
};
