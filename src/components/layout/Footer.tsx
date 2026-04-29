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

            {/* App Download Buttons */}
            <div className="flex items-center gap-3">
              {/* App Store Badge */}
              <button className="h-10 px-3 bg-black rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-white/80">Download on the</div>
                  <div className="text-sm font-semibold text-white -mt-0.5">App Store</div>
                </div>
              </button>
              {/* Google Play Badge */}
              <button className="h-10 px-3 bg-black rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.185-.195-.31-.45-.31-.75V2.564c0-.3.125-.555.31-.75z" fill="#4285F4"/>
                  <path d="M16.633 15.275L13.792 12l-4.374-4.375 11.52 6.656-4.305 1.02z" fill="#34A853"/>
                  <path d="M16.633 8.725l-4.375 4.375L3.609 1.814l4.305-1.02 8.719 7.93z" fill="#EA4335"/>
                  <path d="M20.875 13.25l-4.242 2.025-4.375-4.375 4.375-4.375 4.242 2.025c1.167.56 1.167 2.73 0 3.3z" fill="#FBBC04"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-white/80">GET IT ON</div>
                  <div className="text-sm font-semibold text-white -mt-0.5">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="text-sm text-muted-foreground">© 2026 FoodMart</span>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800 text-xs font-medium text-green-700 dark:text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Made by <Link href="https://www.linkedin.com/in/tausif-islam-sheik">Tausif Islam Sheik</Link>
              </span>
            </div>
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
