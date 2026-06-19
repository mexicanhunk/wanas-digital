import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TrustBar } from "./TrustBar";

describe("TrustBar", () => {
  it("renders all items", () => {
    render(
      <TrustBar items={["Instant Download", "Secure Payment", "Auto Email"]} />,
    );
    expect(screen.getByText("Instant Download")).toBeInTheDocument();
    expect(screen.getByText("Secure Payment")).toBeInTheDocument();
    expect(screen.getByText("Auto Email")).toBeInTheDocument();
  });

  it("has wd-trust-bar class", () => {
    const { container } = render(<TrustBar items={["A"]} />);
    expect(container.firstChild).toHaveClass("wd-trust-bar");
  });
});
