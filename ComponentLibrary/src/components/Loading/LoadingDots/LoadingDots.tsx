import { cn } from "../../../utils/cn";
import styles from "./LoadingDots.module.css";

const LoadingDots = ({ className = "" }: { className?: string }) => {
  return (
    <span className={cn(styles.loadingDots, className)}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
};

export default LoadingDots;
