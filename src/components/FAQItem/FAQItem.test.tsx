import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FAQItem } from "./FAQItem";

describe("FAQItem", () => {
  it("renders question as heading", () => {
    render(
      <FAQItem question="Is it instant?" answer="Yes, download right away." />,
    );
    expect(screen.getByText("Is it instant?")).toBeInTheDocument();
  });

  it("renders answer text", () => {
    render(<FAQItem question="Q" answer="Yes, download right away." />);
    expect(screen.getByText("Yes, download right away.")).toBeInTheDocument();
  });

  it("has wd-faq-item class", () => {
    const { container } = render(<FAQItem question="Q" answer="A" />);
    expect(container.firstChild).toHaveClass("wd-faq-item");
  });
});
