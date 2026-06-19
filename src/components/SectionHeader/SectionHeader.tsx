import React from "react";
import { Eyebrow } from "../Eyebrow";

export interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
}

export function SectionHeader({ eyebrow, heading, lead }: SectionHeaderProps) {
  return (
    <div className="wd-section-header">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{heading}</h2>
      {lead && <p className="wd-lead">{lead}</p>}
    </div>
  );
}
