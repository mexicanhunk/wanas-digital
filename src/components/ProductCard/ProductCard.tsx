import React from "react";
import { Badge } from "../Badge";
import type { BadgeProps } from "../Badge";
import { Price } from "../Price";
import type { PriceProps } from "../Price";
import { Button } from "../Button";

export interface ProductCardProps {
  badge?: { variant?: BadgeProps["variant"]; label: string };
  title: string;
  price: PriceProps;
  description: string;
  cta: { label: string; href?: string; onClick?: () => void };
  rating?: { value: number; count?: number };
}

export function ProductCard({
  badge,
  title,
  price,
  description,
  cta,
  rating,
}: ProductCardProps) {
  return (
    <div className="wd-product-card">
      <div className="wd-product-card__body">
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        <h3>{title}</h3>
        <Price value={price.value} oldValue={price.oldValue} />
        {rating && (
          <div className="wd-product-card__rating">
            {"⭐".repeat(Math.round(rating.value))}
            {rating.count != null && (
              <span>
                {" "}
                ({rating.value}/5 · {rating.count} reviews)
              </span>
            )}
          </div>
        )}
        <p className="wd-muted">{description}</p>
        <Button href={cta.href} onClick={cta.onClick}>
          {cta.label}
        </Button>
      </div>
    </div>
  );
}
