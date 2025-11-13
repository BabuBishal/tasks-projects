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
import InstallationPage from "./componentsPage/InstallationPage";
import UseLocalStoragePage from "./hooksPage/UseLocalStoragePage";
import UseIntersectionObserverPage from "./hooksPage/UseIntersectionObserverPage";
import ToastPage from "./componentsPage/ToastPage";
import UseWindowSizePage from "./hooksPage/WindowSizePage";
import ModalPage from "./componentsPage/ModalPage";
import TimeoutPage from "./hooksPage/TimeoutPage";

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
      <InstallationPage />

      <ButtonPage />
      <BadgePage />
      <FormElementsPage />

      <CardsPage />

      <TablePage column={column} row={row} />
      <ToastPage />
      <ModalPage />
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
      <UseLocalStoragePage />
      <UseIntersectionObserverPage />
      <UseWindowSizePage />
      <TimeoutPage />
    </div>
  );
};

export default Homepage;
