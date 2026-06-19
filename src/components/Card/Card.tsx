import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={["wd-card", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
