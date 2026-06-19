import React, { useEffect } from "react";
import { Button } from "../Button";

export interface NavbarProps {
  links: { label: string; href: string }[];
  cartCount?: number;
  onCartClick?: () => void;
  onSignIn?: () => void;
}

export function Navbar({
  links,
  cartCount,
  onCartClick,
  onSignIn,
}: NavbarProps) {
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.querySelector('link[href*="fontshare"]')
    ) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@500,700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <header className="wd-navbar">
      <div className="wd-container wd-nav">
        <div className="wd-logo">Wanas Digital</div>
        <nav className="wd-nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          {onSignIn && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSignIn();
              }}
            >
              Sign In
            </a>
          )}
          <Button variant="secondary" onClick={onCartClick}>
            🛒 Cart
            {cartCount != null && cartCount > 0 && (
              <span className="wd-cart-count">{cartCount}</span>
            )}
          </Button>
          <Button href="#shop">Shop Now</Button>
        </nav>
      </div>
    </header>
  );
}
