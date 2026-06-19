import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Panel } from "./Panel";

describe("Panel", () => {
  it("renders children", () => {
    render(
      <Panel>
        <p>Featured</p>
      </Panel>,
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("has wd-panel class", () => {
    const { container } = render(<Panel>X</Panel>);
    expect(container.firstChild).toHaveClass("wd-panel");
  });
});
