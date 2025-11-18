"use client";

import { useResizable } from "./Resizable";
import { useEffect } from "react";

export function ResizableHandle() {
  const { direction } = useResizable();

  useEffect(() => {
    const panels = document.querySelectorAll("[data-panel]");
    const handle = document.querySelector("[data-handle]");

    if (!handle || panels.length < 2) return;

    let isDragging = false;
    let startPos = 0;

    const panel1 = panels[0] as HTMLElement;
    const panel2 = panels[1] as HTMLElement;

    const startDrag = (e: Event) => {
      const mouse = e as MouseEvent;
      isDragging = true;
      startPos = direction === "horizontal" ? mouse.clientX : mouse.clientY;
    };

    const onDrag = (e: Event) => {
      if (!isDragging) return;
      const mouse = e as MouseEvent;

      const delta =
        direction === "horizontal"
          ? mouse.clientX - startPos
          : mouse.clientY - startPos;

      const containerSize =
        direction === "horizontal"
          ? panel1.parentElement!.offsetWidth
          : panel1.parentElement!.offsetHeight;

      const deltaPercent = (delta / containerSize) * 100;

      const newSize = Number(panel1.dataset.size) + deltaPercent;
      const newSize2 = Number(panel2.dataset.size) - deltaPercent;

      if (newSize > 10 && newSize < 90) {
        panel1.style.flexBasis = `${newSize}%`;
        panel1.dataset.size = String(newSize);

        panel2.style.flexBasis = `${newSize2}%`;
        panel2.dataset.size = String(newSize2);
      }

      startPos = direction === "horizontal" ? mouse.clientX : mouse.clientY;
    };

    const endDrag = () => {
      isDragging = false;
    };

    handle.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);

    return () => {
      handle.removeEventListener("mousedown", startDrag);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [direction]);

  return (
    <div
      data-handle
      className={
        direction === "horizontal"
          ? "w-1 cursor-col-resize bg-border hover:bg-muted transition"
          : "h-1 cursor-row-resize bg-border hover:bg-muted transition"
      }
    />
  );
}
