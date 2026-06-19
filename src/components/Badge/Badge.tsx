import React from "react";

export interface BadgeProps {
  variant?: "default" | "sale" | "amazon" | "course" | "ebook" | "new";
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  return <span className={`wd-badge wd-badge--${variant}`}>{children}</span>;
}
