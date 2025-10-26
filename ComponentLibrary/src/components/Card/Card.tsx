import type { CardProps } from "./Card.types";
import styles from "./Card.module.css";
const Card = ({ title, content }: CardProps) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>{title}</h4>
      <div className={styles.cardContent}>{content}</div>
    </div>
  );
};

export default Card;
