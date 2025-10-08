export interface ToggleProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}
