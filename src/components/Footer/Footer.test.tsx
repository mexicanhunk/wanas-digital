import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders default copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/Wanas Digital/)).toBeInTheDocument();
  });

  it("renders custom copyright", () => {
    render(<Footer copyright="© 2026 My Brand" />);
    expect(screen.getByText("© 2026 My Brand")).toBeInTheDocument();
  });

  it("renders links when provided", () => {
    render(<Footer links={[{ label: "Privacy", href: "/privacy" }]} />);
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });

  it("has wd-footer class", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass("wd-footer");
  });
});
