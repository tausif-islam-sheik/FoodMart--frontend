import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | FoodMart",
  description: "Learn about how FoodMart uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: January 1, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember your preferences, understand how you interact with the site, 
                and improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FoodMart uses cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly (login, cart, etc.)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Session Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporary cookies that expire when you close your browser. Used for maintaining 
                    your session state.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Persistent Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remain on your device for a set period. Used for remembering preferences 
                    and login status.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Third-Party Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Set by our partners (payment processors, analytics providers) to enable 
                    their services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Chrome: Settings → Privacy and security → Cookies</li>
                <li>Firefox: Preferences → Privacy & Security → Cookies</li>
                <li>Safari: Preferences → Privacy → Cookies</li>
                <li>Edge: Settings → Cookies and site permissions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please note that disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted 
                on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our Cookie Policy, contact us at{" "}
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
