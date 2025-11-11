import Accordion from "../../src/components/Accordion/Accordion";
import Badge from "../../src/components/Badges/Badges";
import { Button } from "../../src/components/Button/Button";
import Card from "../../src/components/Card/Card";
import Checkbox from "../../src/components/Form/Checkbox/Checkbox";
import Select from "../../src/components/Form/Select/Select";
import Textarea from "../../src/components/Form/Textarea/Textarea";
import Input from "../../src/components/Form/TextInput/Input";
import LoadingDots from "../../src/components/Loading/LoadingDots/LoadingDots";
import Spinner from "../../src/components/Loading/Spinner/Spinner";
import Tabs from "../../src/components/Tab/Tabs";
import Table from "../../src/components/Table/Table";
import Toggle from "../../src/components/Toggle/Toggle";
import Container from "../components/Container/Container";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import UseToggleDemo from "../../src/modules/useToggle/useToggleDemo";
import UseFetchDemo from "../../src/modules/useFetch/useFetchDemo";
import UseCopyToClipboardDemo from "../../src/modules/useCopyToClipBoard/useCopyToClipboardDemo";
import { column, row } from "../../src/utils/constants";
import ButtonPage from "./componentsPage/ButtonPage";
import BadgePage from "./componentsPage/BadgePage";
import FormElementsPage from "./componentsPage/FormElementsPage";
import CardsPage from "./componentsPage/CardsPage";
import TablePage from "./componentsPage/TablePage";
import LoadersPage from "./componentsPage/LoadersPage";
import TabsPage from "./componentsPage/TabsPage";
import AccordionPage from "./componentsPage/AccordionPage";
import UseTogglePage from "./hooksPage/UseTogglePage";
import CopyToClipboardPage from "./hooksPage/CopyToClipboardPage";
import UseFetchPage from "./hooksPage/UseFetchPage";

const Homepage = () => {
  return (
    <div className="homepage">
      <section id="introduction" className="section intro-section">
        <h2 className="main-title">UI Component Library</h2>
        <h4 className="main-desc">
          A comprehensive collection of beautiful, accessible, and customizable
          UI components built with React{" "}
        </h4>
      </section>
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

      <ButtonPage />
      <BadgePage />
      <FormElementsPage />

      <CardsPage />

      <TablePage column={column} row={row} />

      <LoadersPage />

      <TabsPage />

      <AccordionPage />

      <section className="section hooks-section">
        <h1 className="section-heading">Custom Hooks</h1>
        <h4 className="section-desc">Common Reusable custom hooks</h4>
      </section>
      <UseTogglePage />

      <CopyToClipboardPage />
      <UseFetchPage />
    </div>
  );
};

export default Homepage;
