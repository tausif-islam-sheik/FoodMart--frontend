import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | FoodMart",
  description: "Read our Terms of Service to understand the rules and regulations for using FoodMart.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ScrollText className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 1, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using FoodMart, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                To use certain features of FoodMart, you must create an account. You are responsible 
                for maintaining the confidentiality of your account information and for all activities 
                that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. Ordering and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you place an order through FoodMart, you agree to pay the full amount including 
                any applicable taxes and delivery fees. All payments are processed securely through 
                our payment partners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivery times are estimates and may vary based on factors including traffic, weather, 
                and restaurant preparation time. FoodMart is not responsible for delays caused by 
                circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Cancellations and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders can be cancelled within 5 minutes of placement or before the restaurant accepts 
                the order. Refunds are processed according to our refund policy and may take 5-7 
                business days to appear in your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to misuse our services, harass delivery partners or restaurant staff, 
                or engage in fraudulent activities. Violation of these terms may result in account 
                suspension or termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                FoodMart acts as an intermediary between you and restaurants. We are not liable for 
                the quality of food, preparation errors, or issues caused by third-party restaurants.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of FoodMart 
                after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@foodmart.com" className="text-orange-600 hover:underline">
                  legal@foodmart.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
