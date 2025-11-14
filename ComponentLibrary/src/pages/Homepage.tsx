import { lazy, Suspense, useMemo } from "react";
import { column, row } from "../../utils/constants";
import ButtonPage from "./componentsPage/ButtonPage";
import InstallationPage from "./componentsPage/InstallationPage";

// Lazy load page components
// const InstallationPage = lazy(
//   () => import("./componentsPage/InstallationPage")
// );
// const ButtonPage = lazy(() => import("./componentsPage/ButtonPage"));
const BadgePage = lazy(() => import("./componentsPage/BadgePage"));
const FormElementsPage = lazy(
  () => import("./componentsPage/FormElementsPage")
);
const CardsPage = lazy(() => import("./componentsPage/CardsPage"));
const TablePage = lazy(() => import("./componentsPage/TablePage"));
const LoadersPage = lazy(() => import("./componentsPage/LoadersPage"));
const TabsPage = lazy(() => import("./componentsPage/TabsPage"));
const AccordionPage = lazy(() => import("./componentsPage/AccordionPage"));
const ToastPage = lazy(() => import("./componentsPage/ToastPage"));
const ModalPage = lazy(() => import("./componentsPage/ModalPage"));

// Hooks pages
const UseTogglePage = lazy(() => import("./hooksPage/UseTogglePage"));
const CopyToClipboardPage = lazy(
  () => import("./hooksPage/CopyToClipboardPage")
);
const UseFetchPage = lazy(() => import("./hooksPage/UseFetchPage"));
const UseLocalStoragePage = lazy(
  () => import("./hooksPage/UseLocalStoragePage")
);
const UseIntersectionObserverPage = lazy(
  () => import("./hooksPage/UseIntersectionObserverPage")
);
const UseWindowSizePage = lazy(() => import("./hooksPage/WindowSizePage"));
const TimeoutPage = lazy(() => import("./hooksPage/TimeoutPage"));

const Homepage = () => {
  const tableData = useMemo(() => ({ column, row }), []);
  return (
    <div className="homepage">
      <section id="introduction" className="section intro-section">
        <h2 className="main-title">UI Component Library</h2>
        <h4 className="main-desc">
          A comprehensive collection of beautiful, accessible, and customizable
          UI components built with React
        </h4>
      </section>

      <InstallationPage />
      <ButtonPage />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <BadgePage />
        <FormElementsPage />
        <CardsPage />
        <TablePage column={tableData.column} row={tableData.row} />
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
      </Suspense>
    </div>
  );
};

export default Homepage;
