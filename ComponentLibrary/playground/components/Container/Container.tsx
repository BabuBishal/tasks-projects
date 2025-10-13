import type { ReactNode } from "react";
import "./Container.css";
type ContainerProps = {
  title: string;
  desc: string;
  content: ReactNode;
};
const Container = ({ title, desc, content }: ContainerProps) => {
  return (
    <div className="container">
      <h3 className="container-title">{title}</h3>
      <h5 className="container-desc">{desc}</h5>
      <div className="container-content">{content}</div>
    </div>
  );
};

export default Container;
