import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | FoodMart",
  description: "Learn how FoodMart collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 1, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information to provide better services to our users. This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Personal information (name, email, phone number, address)</li>
                <li>Order history and preferences</li>
                <li>Payment information (processed securely by our partners)</li>
                <li>Device and usage information</li>
                <li>Location data (with your permission)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Process and deliver your orders</li>
                <li>Communicate with you about orders and promotions</li>
                <li>Improve our services and user experience</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We share your information only with restaurants and delivery partners necessary to 
                fulfill your orders. We do not sell your personal information to third parties for 
                marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your information. 
                This includes encryption, secure servers, and regular security audits. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience, remember your 
                preferences, and analyze usage patterns. You can control cookie settings through 
                your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                FoodMart is not intended for users under 13 years of age. We do not knowingly 
                collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@foodmart.com" className="text-orange-600 hover:underline">
                  privacy@foodmart.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
