import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  const base = {
    heading: "Master AI faster.",
    primaryCta: { label: "Shop Now", href: "#shop" },
  };

  it("renders heading as h1", () => {
    render(<Hero {...base} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Master AI faster.",
    );
  });

  it("renders primary CTA", () => {
    render(<Hero {...base} />);
    expect(screen.getByRole("link", { name: "Shop Now" })).toHaveAttribute(
      "href",
      "#shop",
    );
  });

  it("renders secondary CTA when provided", () => {
    render(
      <Hero
        {...base}
        secondaryCta={{ label: "Book a Call", href: "#coaching" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "Book a Call" }),
    ).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<Hero {...base} eyebrow="Premium Store" />);
    expect(screen.getByText("Premium Store")).toHaveClass("wd-eyebrow");
  });

  it("renders trust items when provided", () => {
    render(<Hero {...base} trustItems={["Instant Download", "Secure"]} />);
    expect(screen.getByText("Instant Download")).toBeInTheDocument();
  });
});
