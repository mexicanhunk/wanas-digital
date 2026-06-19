import React from "react";
import { Button } from "wanas-ui";

export function Primary() {
  return <Button variant="primary">Shop Now</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Learn More</Button>;
}

export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function AsLink() {
  return <Button href="#shop">Shop Now</Button>;
}
