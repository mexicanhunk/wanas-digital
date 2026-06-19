import React from "react";
import { FAQItem } from "wanas-ui";

export function Default() {
  return (
    <FAQItem
      question="Do I need any prior AI experience?"
      answer="No. Every course and ebook starts from the basics and builds up to practical, real-world workflows."
    />
  );
}

export function List() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <FAQItem
        question="Do I need any prior AI experience?"
        answer="No. Every course and ebook starts from the basics and builds up to practical, real-world workflows."
      />
      <FAQItem
        question="How long do I have access to the content?"
        answer="Lifetime access to everything you purchase, including future updates."
      />
    </div>
  );
}
