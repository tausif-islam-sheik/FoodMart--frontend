"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { orderService } from "@/services/order.service";
import { 
  Package, 
  MapPin, 
  Phone, 
  Clock,
  CheckCircle2,
  ChefHat,
  UtensilsCrossed,
  ShoppingBag,
  XCircle,
  Truck,
  ClipboardList,
  User
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

interface SessionUser {
  id: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

interface Order {
  id: string;
  address: string;
  totalAmount: number;
  status: OrderStatus;
  items: {
    id: string;
    quantity: number;
    meal: {
      name: string;
      price: number;
      image?: string;
    };
  }[];
  provider: {
    restaurantName: string;
    logo?: string;
    phone?: string;
  };
}

const allowedStatusMap: Record<OrderStatus, OrderStatus[]> = {
  PLACED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const OrdersPageClient = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");

  useEffect(() => {
    if (!user) return;
    orderService.getAllOrders().then(({ data, error }) => {
      if (error) toast.error(error);
      else setOrders(data || []);
    });
  }, [user]);

  if (!user) return <p className="text-center py-20">Please login first.</p>;

  if (user.role !== "PROVIDER")
    return (
      <p className="text-center py-20 text-red-600">
        You are not allowed to access this page.
      </p>
    );

  const getStatusConfig = (status: OrderStatus) => {
    const configs = {
      PLACED: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800",
        icon: ShoppingBag,
        label: "Order Placed"
      },
      PREPARING: {
        bg: "bg-amber-50 dark:bg-amber-900/20",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
        icon: ChefHat,
        label: "Preparing"
      },
      READY: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        icon: UtensilsCrossed,
        label: "Ready for Pickup"
      },
      DELIVERED: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        icon: CheckCircle2,
        label: "Delivered"
      },
      CANCELLED: {
        bg: "bg-red-50 dark:bg-red-900/20",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800",
        icon: XCircle,
        label: "Cancelled"
      },
    };
    return configs[status];
  };

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setSelectedStatus("");
    setOpen(true);
  };

  const confirmUpdate = async () => {
    if (!selectedOrder || !selectedStatus) return;

    setLoadingId(selectedOrder.id);

    const { error } = await orderService.updateOrderStatus(
      selectedOrder.id,
      selectedStatus,
    );

    if (error) toast.error(error);
    else {
      toast.success("Order updated");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: selectedStatus } : o,
        ),
      );
    }

    setLoadingId(null);
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2 mt-10">
            <ClipboardList className="w-7 h-7 text-orange-500" />
            Incoming Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and update order statuses for your restaurant
          </p>
        </div>
      </div>

      {orders.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-foreground">No incoming orders</p>
            <p className="text-sm text-muted-foreground mt-1">
              Orders will appear here when customers place them
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {orders.map((order, index) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Customer Info Section */}
                    <div className="p-5 lg:w-64 lg:border-r border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                          <User className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">Customer</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            Contact via app
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 p-5">
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono text-muted-foreground">
                            #{order.id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-medium px-3 py-1`}
                        >
                          <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                          {order.status}
                        </Badge>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2 mb-4 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{order.address}</span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                          >
                            {item.meal.image ? (
                              <Image
                                src={item.meal.image}
                                alt={item.meal.name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-md bg-linear-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                                <UtensilsCrossed className="w-4 h-4 text-orange-500" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.meal.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} × ৳{item.meal.price}
                              </p>
                            </div>
                            <p className="font-semibold text-sm">
                              ৳{(item.meal.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Total:</span>
                          <span className="text-lg font-bold text-orange-600">
                            ৳{order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    {allowedStatusMap[order.status].length > 0 && (
                      <div className="p-5 lg:w-48 lg:border-l border-border bg-muted/30 flex items-center">
                        <Button 
                          className="w-full bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md"
                          onClick={() => openDialog(order)}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Update Status
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-500" />
              Update Order Status
            </DialogTitle>
            <DialogDescription>
              Change the status for order #{selectedOrder?.id.slice(-8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">Select New Status</label>
            <Select onValueChange={(v) => setSelectedStatus(v as OrderStatus)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Choose a status..." />
              </SelectTrigger>
              <SelectContent>
                {selectedOrder &&
                  allowedStatusMap[selectedOrder.status].map((s) => {
                    const config = getStatusConfig(s);
                    const Icon = config.icon;
                    return (
                      <SelectItem key={s} value={s}>
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${config.text}`} />
                          {s}
                        </div>
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="h-10">
              Cancel
            </Button>
            <Button
              onClick={confirmUpdate}
              disabled={!selectedStatus || loadingId !== null}
              className="h-10 bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
            >
              {loadingId ? (
                <>
                  <span className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Update
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default OrdersPageClient;