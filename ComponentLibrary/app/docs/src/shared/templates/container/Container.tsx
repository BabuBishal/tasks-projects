import type { ReactNode } from "react";
import "./Container.css";
type ContainerProps = {
  title: string;
  desc: string;

  children: ReactNode;
};
const Container = ({
  title,
  desc,

  children,
}: ContainerProps) => {
  return (
    <div className="container">
      <h3 className="container-title">{title}</h3>
      <h5 className="container-desc">{desc}</h5>
      <div className="container-content">
        {children}
        {/* <div className="container-items">{content}</div>
        <div className="codeContent">{codeContent}</div> */}
      </div>
    </div>
  );
};

Container.content = ({ children }: { children: ReactNode }) => {
  return <div className="container-items">{children}</div>;
};

Container.code = ({ children }: { children: ReactNode }) => {
  return <div className="codeContent">{children}</div>;
};

export default Container;
