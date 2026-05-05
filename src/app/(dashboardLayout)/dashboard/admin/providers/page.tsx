"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { providerService } from "@/services/provider.service";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface Provider {
  id: string;
  restaurantName: string;
  email: string;
  address: string;
  phone: string;
  status: string;
}

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await providerService.getAllProviders();
        if (response.data) {
          setProviders(response.data.map((p: any) => ({
            id: p.id,
            restaurantName: p.restaurantName,
            email: p.user?.email || "N/A",
            address: p.address,
            phone: p.phone,
            status: p.status || "ACTIVE",
          })));
        }
      } catch {
        toast.error("Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Providers</h1>
        <p className="text-muted-foreground">
          Manage all restaurant providers on the platform.
        </p>
      </div>

      <DataTable
        data={providers}
        title="All Providers"
        description="Registered restaurants and food providers"
        columns={[
          { key: "restaurantName", header: "Restaurant", sortable: true, cell: (p) => p.restaurantName },
          { key: "email", header: "Email", sortable: true, cell: (p) => p.email },
          { key: "address", header: "Address", sortable: true, cell: (p) => (
            <span className="truncate max-w-xs block">{p.address}</span>
          )},
          { key: "phone", header: "Phone", cell: (p) => p.phone },
          { key: "status", header: "Status", sortable: true, cell: (p) => (
            <Badge variant={p.status === "ACTIVE" ? "default" : "secondary"} className="dark:text-white dark:bg-orange-600">
              {p.status}
            </Badge>
          )},
        ]}
        searchKeys={["restaurantName", "email", "address", "phone"]}
        pageSize={10}
      />
    </div>
  );
}
