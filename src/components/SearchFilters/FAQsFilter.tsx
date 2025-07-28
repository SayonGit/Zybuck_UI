// components/SearchFilters/FAQsFilter.tsx
import { useState } from "react";
import { Icon } from "@iconify/react";

export const FAQsFilter = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: "refund",
      question: "Terms and conditions of tickets refund",
      answer: [
        "The airline's refund terms and conditions can be found:",
        "• in the fare rules on the search page;",
        "• in the fare rules on the booking page;",
        "• in the order info in the Orders tab.",
        "To refund the issued ticket, go to the Air tickets section in the Orders. Then open the order info and select Refund the ticket, and click on Send the request button. Customer Service will confirm the refund details and will contact you.",
      ],
    },
    {
      id: "exchange",
      question: "Terms and conditions of ticket exchange",
      answer: [
        "Ticket exchange policies vary by airline and fare type.",
        "• Check the fare conditions before booking",
        "• Exchange fees may apply",
        "• Some tickets are non-exchangeable",
      ],
    },
    {
      id: "timing",
      question:
        "How much time is there for issuing and payment after booking a flight",
      answer: [
        "Payment timing depends on the fare type:",
        "• Most tickets require immediate payment",
        "• Some fares allow 24-hour hold",
        "• Corporate bookings may have extended payment terms",
      ],
    },
  ];

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq) => (
        <div key={faq.id} className="border border-gray-200 rounded-md">
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {faq.question}
            </span>
            <Icon
              icon={
                expandedFAQ === faq.id
                  ? "heroicons:chevron-up"
                  : "heroicons:chevron-down"
              }
              className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2"
            />
          </button>

          {expandedFAQ === faq.id && (
            <div className="px-3 pb-3 border-t border-gray-100">
              <div className="text-xs text-gray-600 space-y-1 mt-2">
                {faq.answer.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
