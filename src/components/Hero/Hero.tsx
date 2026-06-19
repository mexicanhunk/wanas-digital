import React from "react";
import { Eyebrow } from "../Eyebrow";
import { Button } from "../Button";
import { TrustBar } from "../TrustBar";

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
  primaryCta: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  trustItems?: string[];
}

export function Hero({
  eyebrow,
  heading,
  lead,
  primaryCta,
  secondaryCta,
  trustItems,
}: HeroProps) {
  return (
    <section className="wd-hero">
      <div className="wd-container">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{heading}</h1>
        {lead && <p className="wd-lead">{lead}</p>}
        <div className="wd-actions">
          <Button href={primaryCta.href} onClick={primaryCta.onClick}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              variant="secondary"
              href={secondaryCta.href}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
        {trustItems && <TrustBar items={trustItems} />}
      </div>
    </section>
  );
}
