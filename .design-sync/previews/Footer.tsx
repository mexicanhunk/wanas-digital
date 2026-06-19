import React from "react";
import { Footer } from "wanas-ui";

export function Default() {
  return (
    <Footer
      links={[
        { label: "Shop", href: "#shop" },
        { label: "Contact", href: "#contact" },
        { label: "Terms", href: "#terms" },
      ]}
    />
  );
}
