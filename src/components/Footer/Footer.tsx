import React from 'react';

export interface FooterProps {
  links?: { label: string; href: string }[];
  copyright?: string;
}

export function Footer({ links, copyright }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="wd-footer">
      <div className="wd-container">
        <div className="wd-footer-row">
          <span>{copyright ?? `© ${year} Wanas Digital`}</span>
          {links && links.length > 0 && (
            <div className="wd-footer-links">
              {links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
