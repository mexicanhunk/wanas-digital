import React from "react";
import { Button } from "../Button";

export interface CTABandProps {
  heading: string;
  body?: string;
  cta: { label: string; href?: string; onClick?: () => void };
}

export function CTABand({ heading, body, cta }: CTABandProps) {
  return (
    <div className="wd-cta-band">
      <h2>{heading}</h2>
      {body && <p>{body}</p>}
      <Button href={cta.href} onClick={cta.onClick}>
        {cta.label}
      </Button>
    </div>
  );
}
