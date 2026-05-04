"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I track my order?",
    answer: "Once your order is placed, you can track it in real-time through our app or website. Go to 'My Orders' section where you'll see live updates from the kitchen preparation to delivery partner assignment and final delivery route. You'll also receive SMS notifications at each stage.",
  },
  {
    id: 2,
    question: "Can I cancel an order after placing it?",
    answer: "Yes, you can cancel your order within 5 minutes of placing it without any charges. After 5 minutes, cancellation depends on the restaurant's preparation status. If the restaurant hasn't started cooking, we can cancel with a full refund. Once preparation begins, cancellation may not be possible.",
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    answer: "We accept multiple payment options including Cash on Delivery (COD), Credit/Debit Cards (Visa, Mastercard), Mobile Banking (bKash, Nagad, Rocket), and Internet Banking. All online payments are secured with SSL encryption for your safety.",
  },
  {
    id: 4,
    question: "Is there a minimum order amount?",
    answer: "The minimum order amount varies by restaurant and typically ranges from ৳100 to ৳300. This information is clearly displayed on each restaurant's page. Some restaurants may offer free delivery above a certain order value.",
  },
  {
    id: 5,
    question: "How do I become a restaurant partner?",
    answer: "Joining FoodMart as a restaurant partner is easy! Visit our 'Partner With Us' page and fill out the registration form with your restaurant details. Our team will review your application within 2-3 business days. Once approved, we'll help you set up your digital menu and start receiving orders.",
  },
  {
    id: 6,
    question: "Are there any hidden delivery charges?",
    answer: "Absolutely not! We believe in complete transparency. All charges including delivery fees, taxes, and any applicable service charges are clearly shown before you checkout. What you see is what you pay - no surprises.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-transparent via-violet-50/30 dark:via-violet-950/10 to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-4">
            <HelpCircle className="w-3 h-3" />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about ordering, delivery, and payments
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className={`rounded-2xl border-2 transition-all duration-300 shadow-sm ${
                openId === faq.id
                  ? "border-brand-300 bg-brand-50/80 dark:bg-brand-500/10 shadow-lg dark:shadow-brand-500/5"
                  : "border-border/60 bg-card hover:border-brand-300/50 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openId === faq.id
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                      : "bg-muted text-muted-foreground group-hover:bg-brand-100 group-hover:text-brand-600"
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openId === faq.id ? "auto" : 0,
                  opacity: openId === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-brand-200/30 dark:border-brand-500/20">
                    <p className="text-muted-foreground leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-3">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Contact our support team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
