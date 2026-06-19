import React from "react";

export interface PriceProps {
  value: string;
  oldValue?: string;
}

export function Price({ value, oldValue }: PriceProps) {
  return (
    <div className="wd-price">
      {value}
      {oldValue && <span className="wd-price__old">{oldValue}</span>}
    </div>
  );
}
