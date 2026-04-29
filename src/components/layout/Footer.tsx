"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Facebook, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Browse Meals", href: "/meals" },
    { name: "Restaurants", href: "/providers" },
    { name: "Categories", href: "/categories" },
    { name: "Offers", href: "/offers" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  Support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Track Order", href: "/track" },
    { name: "Feedback", href: "/feedback" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:bg-sky-500 hover:text-white" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:bg-pink-500 hover:text-white" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:bg-blue-600 hover:text-white" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:bg-blue-500 hover:text-white" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:bg-red-500 hover:text-white" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0  bg-gradient-to-r from-brand-500 via-orange-500 to-brand-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-[1.30rem] lg:text-[1.75rem] italic font-sans">
                  <span className="text-foreground">Food</span>
                  <span className="font-bold text-brand-600">Mart</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
                Your favorite food delivery partner. Fresh, fast, and delicious meals delivered to your doorstep.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="mailto:hello@foodmart.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-600 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                    <Mail className="w-4 h-4 text-brand-600" />
                  </div>
                  hello@foodmart.com
                </a>
                <a href="tel:+8801234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-600 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                    <Phone className="w-4 h-4 text-brand-600" />
                  </div>
                  +880 1234-567890
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-600" />
                  </div>
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-brand-600 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-0 h-px bg-brand-500 group-hover:w-3 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* App Download Placeholder */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Get the app:</span>
              <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                App Store
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.4,2.38 3.97,2.21L13.97,12L3.97,21.79C3.4,21.62 3,21.09 3,20.5M16.5,12L6.5,2.47C6.67,2.4 6.85,2.35 7.04,2.33H7.06C7.53,2.33 7.96,2.54 8.26,2.88L20.23,12L8.26,21.12C7.96,21.46 7.53,21.67 7.06,21.67C6.88,21.67 6.71,21.64 6.55,21.58L16.5,12M17.5,2.88C17.95,2.6 18.48,2.54 19,2.71V2.71C20.12,3.1 20.87,4.18 20.87,5.38V18.62C20.87,19.82 20.12,20.9 19,21.29V21.29C18.48,21.46 17.95,21.4 17.5,21.12L17.5,2.88Z" />
                </svg>
                Play Store
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © 2026 FoodMart. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Bangladesh
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
