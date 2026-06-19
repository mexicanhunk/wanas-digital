import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("defaults to primary variant and md size", () => {
    render(<Button>Go</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("wd-btn--primary");
    expect(el).toHaveClass("wd-btn--md");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button")).toHaveClass("wd-btn--secondary");
  });

  it("renders as anchor when href provided", () => {
    render(<Button href="/shop">Shop</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/shop");
    expect(link).toHaveClass("wd-btn");
  });

  it("calls onClick", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Buy</Button>);
    screen.getByRole("button").click();
    expect(handler).toHaveBeenCalledOnce();
  });

  it("applies sm size class", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("wd-btn--sm");
  });
});
