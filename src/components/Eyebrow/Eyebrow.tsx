import React from "react";

export interface EyebrowProps {
  children: React.ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return <div className="wd-eyebrow">{children}</div>;
}
