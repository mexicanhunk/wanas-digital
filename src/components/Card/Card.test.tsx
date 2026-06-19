import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <p>Content</p>
      </Card>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("has wd-card class", () => {
    const { container } = render(<Card>X</Card>);
    expect(container.firstChild).toHaveClass("wd-card");
  });

  it("accepts extra className", () => {
    const { container } = render(<Card className="custom">X</Card>);
    expect(container.firstChild).toHaveClass("wd-card", "custom");
  });
});
