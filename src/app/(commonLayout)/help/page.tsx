import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Help Center | FoodMart - Support & FAQs",
  description: "Find answers to your questions about FoodMart. Browse our FAQ or contact our support team.",
};

const faqs = [
  {
    question: "How do I place an order?",
    answer: "To place an order, browse restaurants or meals, add items to your cart, and proceed to checkout. You can pay online or choose cash on delivery.",
  },
  {
    question: "What are the delivery charges?",
    answer: "Delivery charges vary based on distance and restaurant. Most restaurants offer free delivery above a certain order value. The exact delivery fee is shown at checkout.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is confirmed, you can track it in real-time from the 'Track Order' page or your order history in the dashboard.",
  },
  {
    question: "What if my order is delayed?",
    answer: "If your order is delayed, you can contact the restaurant directly through the app or reach out to our support team. We monitor all orders to ensure timely delivery.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 5 minutes of placement or before the restaurant accepts the order. Once preparation begins, cancellations may not be possible.",
  },
  {
    question: "How do refunds work?",
    answer: "If an order is cancelled or there's an issue with your delivery, refunds are processed automatically to your original payment method within 5-7 business days.",
  },
  {
    question: "Do you offer corporate catering?",
    answer: "Yes! We offer corporate catering services for businesses. Contact our sales team at corporate@foodmart.com for bulk orders and special arrangements.",
  },
  {
    question: "How do I become a restaurant partner?",
    answer: "Restaurant owners can sign up on our platform by creating a provider account. Our team will verify your business and help you get started.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How Can We Help?
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Find answers to your questions or contact our support team.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-12 h-14 bg-white border-0 rounded-xl text-base shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg mb-2">Live Chat</CardTitle>
              <CardDescription>Chat with our support team 24/7</CardDescription>
              <Button className="mt-4 w-full" variant="outline">Start Chat</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg mb-2">Call Us</CardTitle>
              <CardDescription>+880 1234-567890</CardDescription>
              <Button className="mt-4 w-full" variant="outline">Call Now</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg mb-2">Email Support</CardTitle>
              <CardDescription>support@foodmart.com</CardDescription>
              <Button className="mt-4 w-full" variant="outline">Send Email</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
