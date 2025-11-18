"use client";

import { useState } from "react";

export function ResizablePanel({
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  children,
}: {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
}) {
  const [size, setSize] = useState(defaultSize);

  return (
    <div
      style={{ flexBasis: `${size}%` }}
      className="relative overflow-hidden flex-1"
      data-panel
      data-size={size}
    >
      {children}
    </div>
  );
}
