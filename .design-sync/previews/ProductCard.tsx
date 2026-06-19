import React from "react";
import { ProductCard } from "wanas-ui";

export function Default() {
  return (
    <ProductCard
      badge={{ variant: "sale", label: "Sale" }}
      title="The AI Prompt Playbook"
      price={{ value: "$19", oldValue: "$29" }}
      description="120 ready-to-use prompts for writing, research, and productivity."
      cta={{ label: "Buy Now", href: "#" }}
      rating={{ value: 4.8, count: 312 }}
    />
  );
}

export function NoBadge() {
  return (
    <ProductCard
      title="AI Foundations Course"
      price={{ value: "$49" }}
      description="A self-paced course covering practical AI workflows from zero to confident."
      cta={{ label: "Enroll Now", href: "#" }}
    />
  );
}
