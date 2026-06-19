import React from "react";
import { Hero } from "wanas-ui";

export function Default() {
  return (
    <Hero
      eyebrow="AI Skills, Faster"
      heading="Master AI faster and save hours every week."
      lead="Curated courses, ebooks, and prompt packs that turn AI into a real productivity edge."
      primaryCta={{ label: "Shop Now", href: "#shop" }}
      secondaryCta={{ label: "Learn More", href: "#about" }}
      trustItems={[
        "10,000+ learners",
        "4.8/5 average rating",
        "Lifetime access",
      ]}
    />
  );
}
