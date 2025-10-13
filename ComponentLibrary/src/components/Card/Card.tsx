import type { CardProps } from "./Card.types";
import styles from "./Card.module.css";
const Card = ({ title, content }: CardProps) => {
  return (
    <div className={styles.card}>
      <h4>{content}</h4>
      <p>{title}</p>
    </div>
  );
};

export default Card;
