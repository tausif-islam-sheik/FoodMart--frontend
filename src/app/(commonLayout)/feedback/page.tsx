import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Star, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Feedback | FoodMart - Share Your Experience",
  description: "We value your feedback. Share your thoughts, suggestions, or report issues with FoodMart.",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Help us improve FoodMart by sharing your experience, suggestions, or reporting any issues.
          </p>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              Send Feedback
            </CardTitle>
            <CardDescription>
              Your feedback helps us make FoodMart better for everyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Feedback Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Overall Experience</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className="hover:text-yellow-400"
                  >
                    <Star className="w-8 h-8" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Feedback</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience with FoodMart..."
                rows={6}
              />
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Other Ways */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold mb-1">Email Us</h3>
            <p className="text-sm text-muted-foreground">feedback@foodmart.com</p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-semibold mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">+880 1234-567890</p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
