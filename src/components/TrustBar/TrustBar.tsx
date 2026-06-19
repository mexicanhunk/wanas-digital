import React from "react";

export interface TrustBarProps {
  items: string[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <div className="wd-trust-bar">
      {items.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}
