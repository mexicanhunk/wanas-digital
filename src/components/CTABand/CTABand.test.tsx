import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CTABand } from "./CTABand";

describe("CTABand", () => {
  it("renders heading", () => {
    render(<CTABand heading="Ready to start?" cta={{ label: "Get Access" }} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Ready to start?",
    );
  });

  it("renders CTA button", () => {
    render(<CTABand heading="Go" cta={{ label: "Get Access" }} />);
    expect(
      screen.getByRole("button", { name: "Get Access" }),
    ).toBeInTheDocument();
  });

  it("renders body when provided", () => {
    render(
      <CTABand
        heading="Go"
        body="No coding required."
        cta={{ label: "Start" }}
      />,
    );
    expect(screen.getByText("No coding required.")).toBeInTheDocument();
  });

  it("has wd-cta-band class", () => {
    const { container } = render(
      <CTABand heading="Go" cta={{ label: "Go" }} />,
    );
    expect(container.firstChild).toHaveClass("wd-cta-band");
  });
});
