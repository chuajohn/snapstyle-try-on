
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What makes SNAPSTYLE different from other fashion platforms?",
      answer: "SNAPSTYLE combines cutting-edge AI technology with curated fashion collections. Our intelligent fitting technology helps you find the perfect fit, while our virtual try-on feature lets you see how clothes look before you buy."
    },
    {
      question: "How does the virtual try-on feature work?",
      answer: "Our virtual try-on uses advanced AI to overlay clothing items onto your uploaded photo. Simply upload a clear photo of yourself and select any item from our collection to see how it looks on you instantly."
    },
    {
      question: "What is the Fit Archive?",
      answer: "The Fit Archive is your personal collection of saved outfits, favorite items, and styling preferences. It learns from your choices to provide better recommendations over time."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within the United States. We're working on expanding our shipping options to serve customers internationally. Stay tuned for updates!"
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition with tags attached. Since we use AI to help with sizing, we're confident you'll love your purchase, but we're here to help if anything doesn't fit perfectly."
    },
    {
      question: "How accurate is the AI sizing recommendation?",
      answer: "Our AI sizing technology has a 95% accuracy rate based on the measurements and preferences you provide. The more you use the platform, the better it gets at understanding your fit preferences."
    },
    {
      question: "Can I save my favorite outfits?",
      answer: "Absolutely! You can save outfits to your Wardrobe Vault (cart) or create outfit collections in your dashboard. This helps you plan your wardrobe and makes future shopping easier."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we take data security seriously. All personal information and photos are encrypted and stored securely. We never share your data with third parties without your explicit consent."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#4ED3E0]">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SNAPSTYLE, our AI-powered fashion platform, and how to make the most of your shopping experience.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
              <h3 className="text-2xl font-semibold mb-4 text-[#4ED3E0]">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#4ED3E0] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#4ED3E0]/90 transition-colors">
                  Contact Support
                </button>
                <button className="border border-[#4ED3E0] text-[#4ED3E0] px-6 py-3 rounded-xl font-medium hover:bg-[#4ED3E0]/10 transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
