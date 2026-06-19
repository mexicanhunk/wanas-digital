import React from "react";

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <div className={["wd-panel", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
