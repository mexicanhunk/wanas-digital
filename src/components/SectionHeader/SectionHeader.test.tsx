import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders heading", () => {
    render(<SectionHeader heading="Choose your path" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Choose your path",
    );
  });

  it("renders eyebrow when provided", () => {
    render(<SectionHeader eyebrow="Start Here" heading="Title" />);
    expect(screen.getByText("Start Here")).toHaveClass("wd-eyebrow");
  });

  it("does not render eyebrow when omitted", () => {
    const { container } = render(<SectionHeader heading="Title" />);
    expect(container.querySelector(".wd-eyebrow")).not.toBeInTheDocument();
  });

  it("renders lead text when provided", () => {
    render(<SectionHeader heading="Title" lead="Learn more here." />);
    expect(screen.getByText("Learn more here.")).toBeInTheDocument();
  });
});
