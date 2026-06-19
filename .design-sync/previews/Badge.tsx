import React from "react";
import { Badge } from "wanas-ui";

export function Variants() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="sale">Sale</Badge>
      <Badge variant="amazon">Amazon</Badge>
      <Badge variant="course">Course</Badge>
      <Badge variant="ebook">Ebook</Badge>
      <Badge variant="new">New</Badge>
    </div>
  );
}
