import type { Metadata } from "next";
import ContactForm from "@/components/contactPage/ContactForm";
import ContactInfo from "@/components/contactPage/ContactInfo";
import { MessageSquare, MapPin, Clock, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | FoodMart - Get in Touch",
  description: "Have questions or feedback? Contact FoodMart's support team. We're here to help with your orders, partnerships, and inquiries.",
};

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-orange-50/50 dark:from-background dark:via-muted/30 dark:to-background" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container relative text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-6">
              <Headphones className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-600">Get in Touch</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                Us
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>

            {/* Quick Info Cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-muted/50 rounded-full shadow-sm border border-border">
                <Clock className="w-4 h-4 text-brand-500" />
                <span className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-muted/50 rounded-full shadow-sm border border-border">
                <MessageSquare className="w-4 h-4 text-brand-500" />
                <span className="text-sm text-muted-foreground">Avg. response: 2h</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-20 px-4 md:px-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Send us a Message
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Fill out the form below and we&apos;ll get back to you shortly.
                      </p>
                    </div>
                  </div>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Contact Information
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Reach out to us through any of these channels.
                    </p>
                  </div>
                </div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="container relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-4">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">Visit Us</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Find Us on the Map
              </h2>
              <p className="text-muted-foreground">
                Visit our office or use the map for directions.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-foreground text-lg">FoodMart Headquarters</p>
                <p className="text-muted-foreground">123 Food Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
