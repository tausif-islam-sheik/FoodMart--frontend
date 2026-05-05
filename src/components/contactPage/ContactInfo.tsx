import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["123 Food Street, Suite 456", "New York, NY 10001"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["hello@foodmart.com", "support@foodmart.com"],
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-4">
      {contactDetails.map((item) => (
        <Card
          key={item.title}
          className="group border border-border hover:border-brand-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="flex">
              {/* Icon Section */}
              <div className={`shrink-0 w-16 flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              {/* Content Section */}
              <div className="flex-1 p-4 bg-card">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactInfo;
