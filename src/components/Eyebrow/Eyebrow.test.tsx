import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders children", () => {
    render(<Eyebrow>Start Here</Eyebrow>);
    expect(screen.getByText("Start Here")).toBeInTheDocument();
  });

  it("has wd-eyebrow class", () => {
    render(<Eyebrow>Label</Eyebrow>);
    expect(screen.getByText("Label")).toHaveClass("wd-eyebrow");
  });
});
