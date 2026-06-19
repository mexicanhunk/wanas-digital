import React from "react";
import { Price } from "wanas-ui";

export function Default() {
  return <Price value="$29" />;
}

export function OnSale() {
  return <Price value="$19" oldValue="$29" />;
}
