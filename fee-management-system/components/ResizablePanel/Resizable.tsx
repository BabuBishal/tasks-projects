"use client";
import { createContext, useContext } from "react";

type ResizableContextType = {
  direction: "horizontal" | "vertical";
};

const ResizableContext = createContext<ResizableContextType | null>(null);

export const useResizable = () => {
  const ctx = useContext(ResizableContext);
  if (!ctx) throw new Error("Resizable must be used inside <Resizable>");
  return ctx;
};

export function Resizable({
  direction = "horizontal",
  children,
}: {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
}) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <div
        className={
          direction === "horizontal"
            ? "flex w-full h-full"
            : "flex flex-col w-full h-full"
        }
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
}
