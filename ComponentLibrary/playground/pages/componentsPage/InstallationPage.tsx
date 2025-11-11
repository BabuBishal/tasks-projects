import Container from "../../components/container/Container";

const InstallationPage = () => {
  return (
    <section id="installation" className="section installation-section">
      <h2 className="section-heading">Installation</h2>
      <h4 className="section-desc">
        A guide to install and use the components from this UI library
      </h4>
      <Container
        title="Installation guide"
        desc="Step by step guide to use the different components of the UI library"
        content={
          "This feature is not complete yet. Please wait for future updates..."
        }
      />
    </section>
  );
};

export default InstallationPage;
