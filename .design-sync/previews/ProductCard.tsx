import React from "react";
import { ProductCard } from "wanas-ui";

export function Default() {
  return (
    <ProductCard
      image={{ src: "/products/ai-prompt-playbook.png", alt: "The AI Prompt Playbook cover" }}
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
      image={{ src: "/products/ai-foundations-course.png", alt: "AI Foundations Course cover" }}
      title="AI Foundations Course"
      price={{ value: "$49" }}
      description="A self-paced course covering practical AI workflows from zero to confident."
      cta={{ label: "Enroll Now", href: "#" }}
    />
  );
}

export function AmazonPick() {
  return (
    <ProductCard
      image={{ src: "/products/amazon-desk-setup.png", alt: "Ergonomic Desk Setup product shot" }}
      badge={{ variant: "amazon", label: "Amazon Pick" }}
      title="Ergonomic Desk Setup"
      price={{ value: "$89" }}
      description="Our curated pick for a comfortable, minimalist home workspace."
      cta={{ label: "View on Amazon", href: "#" }}
      rating={{ value: 4.6, count: 1204 }}
    />
  );
}

export function TemplatePack() {
  return (
    <ProductCard
      image={{ src: "/products/notion-template-pack.png", alt: "Notion Productivity Template Pack cover" }}
      badge={{ variant: "new", label: "New" }}
      title="Notion Productivity Template Pack"
      price={{ value: "$29" }}
      description="A full Notion system for tasks, projects, and goals — ready to duplicate."
      cta={{ label: "Get the Pack", href: "#" }}
    />
  );
}

export function NoImage() {
  return (
    <ProductCard
      title="AI Foundations Course"
      price={{ value: "$49" }}
      description="Image slot is optional — falls back gracefully when a product has no cover art yet."
      cta={{ label: "Enroll Now", href: "#" }}
    />
  );
}
