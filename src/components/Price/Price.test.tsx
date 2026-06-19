import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Price } from "./Price";

describe("Price", () => {
  it("renders value", () => {
    render(<Price value="$49" />);
    expect(screen.getByText("$49")).toBeInTheDocument();
  });

  it("renders oldValue with strikethrough class", () => {
    render(<Price value="$49" oldValue="$99" />);
    expect(screen.getByText("$99")).toHaveClass("wd-price__old");
  });

  it("does not render oldValue when not provided", () => {
    render(<Price value="$29" />);
    expect(screen.queryByText("wd-price__old")).not.toBeInTheDocument();
  });
});
