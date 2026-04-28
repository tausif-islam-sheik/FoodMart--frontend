import ContactForm from "@/components/contactPage/ContactForm";
import ContactInfo from "@/components/contactPage/ContactInfo";
import { MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-background">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-500 text-sm font-medium mb-6 animate-fade-in">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Contact <span className="text-orange-500">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-20 px-4 md:px-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-card">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels.
                </p>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Find Us on the Map
              </h2>
              <p className="text-muted-foreground">
                Visit our office or use the map for directions.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card h-[400px] bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <p className="font-medium">Map Integration</p>
                <p className="text-sm">123 Food Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default Contact;
