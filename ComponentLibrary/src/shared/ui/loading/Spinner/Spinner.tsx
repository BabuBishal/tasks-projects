import { cn } from "../../../../../utils/cn";
import styles from "./Spinner.module.css";

const Spinner = ({ className = "" }: { className?: string }) => {
  return <span className={cn(styles.spinner, className)} />;
};

export default Spinner;
