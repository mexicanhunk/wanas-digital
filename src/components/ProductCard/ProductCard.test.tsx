import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "./ProductCard";

const baseProps = {
  title: "30-Day AI Playbook",
  price: { value: "$49", oldValue: "$99" },
  description: "Master AI in 30 days.",
  cta: { label: "Buy Now" },
};

describe("ProductCard", () => {
  it("renders title", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("30-Day AI Playbook")).toBeInTheDocument();
  });

  it("renders price", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("$99")).toHaveClass("wd-price__old");
  });

  it("renders description", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("Master AI in 30 days.")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<ProductCard {...baseProps} badge={{ label: "BESTSELLER" }} />);
    expect(screen.getByText("BESTSELLER")).toHaveClass("wd-badge");
  });

  it("renders CTA button", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole("button", { name: "Buy Now" })).toBeInTheDocument();
  });

  it("renders CTA as link when href provided", () => {
    render(
      <ProductCard {...baseProps} cta={{ label: "Buy", href: "/shop" }} />,
    );
    expect(screen.getByRole("link", { name: "Buy" })).toHaveAttribute(
      "href",
      "/shop",
    );
  });
});
