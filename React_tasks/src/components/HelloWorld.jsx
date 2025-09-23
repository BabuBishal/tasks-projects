import PropTypes from "prop-types";

const HelloWorld = ({ title, subtitle, description = "Hello World!" }) => {
  return (
    <>
      {title && <h3>{title}</h3>}
      {subtitle && <h4>{subtitle}</h4>}
      <h5>{description}</h5>
    </>
  );
};

HelloWorld.prototypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};


export default HelloWorld;
