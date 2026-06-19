import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>NEW</Badge>);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("defaults to default variant", () => {
    render(<Badge>TEST</Badge>);
    expect(screen.getByText("TEST")).toHaveClass("wd-badge--default");
  });

  it("applies sale variant", () => {
    render(<Badge variant="sale">SALE</Badge>);
    expect(screen.getByText("SALE")).toHaveClass("wd-badge--sale");
  });

  it("applies amazon variant", () => {
    render(<Badge variant="amazon">AMAZON PICK</Badge>);
    expect(screen.getByText("AMAZON PICK")).toHaveClass("wd-badge--amazon");
  });
});
