"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Addresses</h1>
          <p className="text-muted-foreground">
            Manage your delivery addresses.
          </p>
        </div>
        <Button className="bg-brand-500 hover:bg-brand-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-500" />
            Saved Addresses
          </CardTitle>
          <CardDescription>
            Your saved delivery locations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No addresses saved yet. Add your first delivery address!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
