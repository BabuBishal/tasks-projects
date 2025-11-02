"use client";
import { useTranslations } from "next-intl";

const Students = () => {
  const t = useTranslations("HomePage");
  return <div>{t("title")}</div>;
};

export default Students;
