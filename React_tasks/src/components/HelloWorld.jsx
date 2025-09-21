const HelloWorld = ({ title, subtitle, description = "Hello World!" }) => {
  return (
    <>
      {title && <h3>{title}</h3>}
      {subtitle && <h4>{subtitle}</h4>}
      <h5>{description}</h5>
    </>
  );
};

export default HelloWorld;
