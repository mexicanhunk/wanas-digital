import React from "react";
import { Navbar } from "wanas-ui";

export function Default() {
  return (
    <Navbar
      links={[
        { label: "Shop", href: "#shop" },
        { label: "Courses", href: "#courses" },
        { label: "FAQ", href: "#faq" },
      ]}
      cartCount={2}
      onCartClick={() => {}}
      onSignIn={() => {}}
    />
  );
}
