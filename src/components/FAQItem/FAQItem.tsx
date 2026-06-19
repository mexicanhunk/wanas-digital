import React from "react";

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="wd-faq-item">
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}
