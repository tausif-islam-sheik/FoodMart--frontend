"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { OrderData, orderService } from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mealService } from "@/services/meal.service";
import { cartService, UpdateCartItemPayload } from "@/services/cart.service";
import { 
  ShoppingCart, 
  Trash2, 
  Edit2, 
  Package, 
  MapPin, 
  CheckCircle2,
  UtensilsCrossed,
  Minus,
  Plus,
  AlertCircle
} from "lucide-react";
import CustomSpinner from "@/components/ui/CustomSpinner";

interface CartItem {
  id: string;
  userId: string;
  mealId: string;
  quantity: number;
  mealName: string;
  mealPrice: number;
  mealImage?: string;
}

interface Props {
  userId: string;
}

const CartClient = ({ userId }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [orderAddress, setOrderAddress] = useState<string>("");

  const [loadingUpdateId, setLoadingUpdateId] = useState<string | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await cartService.getCartItems();
      const userCart = res.data.filter((item: any) => item.userId === userId);
      setCartItems(userCart);
    } catch (err: any) {
      toast.error(err.message || "Failed to load cart items");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async () => {
    if (!selectedItem) return;
    setLoadingUpdateId(selectedItem.id);
    try {
      const payload: UpdateCartItemPayload = { quantity: newQuantity };
      const res = await cartService.updateCartItem(selectedItem.id, payload);
      if (res?.success) {
        toast.success("Quantity updated!");
        fetchCart();
        setIsUpdateOpen(false);
      } else toast.error(res?.error || "Failed to update");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
    setLoadingUpdateId(null);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setLoadingDeleteId(selectedItem.id);
    try {
      const res = await cartService.deleteCartItem(selectedItem.id);
      if (res?.success) {
        toast.success("Item deleted!");
        fetchCart();
        setIsDeleteOpen(false);
      } else toast.error(res?.error || "Failed to delete item");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
    setLoadingDeleteId(null);
  };

  const handleOrder = async () => {
    if (!selectedItem || !orderAddress) {
      toast.error("Please enter a delivery address!");
      return;
    }
    setLoadingOrderId(selectedItem.id);

    try {
      const mealRes = await mealService.getMealById(selectedItem.mealId);
      const mealData = mealRes.data;
      const providerId = mealData.providerId;

      const orderPayload: OrderData = {
        customerId: selectedItem.userId,
        providerId,
        address: orderAddress,
        totalAmount: selectedItem.mealPrice * selectedItem.quantity,
        items: [
          { mealId: selectedItem.mealId, quantity: selectedItem.quantity },
        ],
      };

      const res = await orderService.createOrder(orderPayload);

      if (res.error) toast.error(res.error);
      else {
        toast.success("Order placed successfully!");
        await cartService.deleteCartItem(selectedItem.id);
        fetchCart();
        setIsOrderOpen(false);
        setOrderAddress("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    }

    setLoadingOrderId(null);
  };

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-xl font-bold text-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Browse meals and add items to your cart to get started
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-7 h-7 text-orange-500" />
            My Cart
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
          ৳{cartItems.reduce((sum, item) => sum + item.mealPrice * item.quantity, 0).toFixed(2)}
        </Badge>
      </div>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image Section */}
                  <div className="p-4 sm:w-32 shrink-0">
                    {item.mealImage ? (
                      <Image
                        src={item.mealImage}
                        alt={item.mealName}
                        width={100}
                        height={100}
                        className="w-full h-38 sm:h-24 object-cover rounded-lg"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-24 rounded-lg bg-linear-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                        <UtensilsCrossed className="w-8 h-8 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 p-4 sm:py-4 sm:px-0">
                    <h3 className="font-bold text-lg text-foreground">{item.mealName}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-muted-foreground">
                        Price: <span className="text-foreground font-medium">৳{item.mealPrice}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Qty: <span className="text-foreground font-medium">{item.quantity}</span>
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="text-lg font-bold text-orange-600">
                        ৳{(item.mealPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="p-4 sm:w-auto sm:border-l border-border bg-muted/30 flex sm:flex-col gap-2 justify-center">
                    {/* Update Dialog */}
                    <Dialog
                      open={isUpdateOpen && selectedItem?.id === item.id}
                      onOpenChange={setIsUpdateOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(item);
                            setNewQuantity(item.quantity);
                            setIsUpdateOpen(true);
                          }}
                          disabled={loadingUpdateId === item.id}
                          className="flex-1 sm:flex-none"
                        >
                          {loadingUpdateId === item.id ? (
                            <span className="inline-block w-3 h-3 mr-1 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                          ) : (
                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                          )}
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Edit2 className="w-5 h-5 text-orange-500" />
                            Update Quantity
                          </DialogTitle>
                          <DialogDescription>
                            Adjust quantity for {item.mealName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
                              className="h-10 w-10 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <div className="w-20">
                              <Input
                                type="number"
                                min={1}
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(Number(e.target.value))}
                                className="text-center font-bold"
                              />
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setNewQuantity(newQuantity + 1)}
                              className="h-10 w-10 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground text-center">
                            New total: <span className="font-bold text-orange-600">৳{(item.mealPrice * newQuantity).toFixed(2)}</span>
                          </p>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleUpdate} 
                            className="bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white w-full"
                            disabled={loadingUpdateId === item.id}
                          >
                            {loadingUpdateId === item.id ? (
                              <>
                                <span className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Dialog */}
                    <Dialog
                      open={isDeleteOpen && selectedItem?.id === item.id}
                      onOpenChange={setIsDeleteOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteOpen(true);
                          }}
                          disabled={loadingDeleteId === item.id}
                          className="flex-1 sm:flex-none"
                        >
                          {loadingDeleteId === item.id ? (
                            <span className="inline-block w-3 h-3 mr-1 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                          )}
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertCircle className="w-5 h-5" />
                            Remove Item
                          </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove <strong>{item.mealName}</strong> from your cart?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDelete}
                            variant="destructive"
                            className="flex-1"
                            disabled={loadingDeleteId === item.id}
                          >
                            {loadingDeleteId === item.id ? (
                              <>
                                <span className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Removing...
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Order Dialog */}
                    <Dialog
                      open={isOrderOpen && selectedItem?.id === item.id}
                      onOpenChange={(open) => {
                        setIsOrderOpen(open);
                        if (!open) setOrderAddress("");
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsOrderOpen(true);
                          }}
                          disabled={loadingOrderId === item.id}
                          className="flex-1 sm:flex-none bg-linear-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white"
                        >
                          {loadingOrderId === item.id ? (
                            <span className="inline-block w-3 h-3 mr-1 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Package className="w-3.5 h-3.5 mr-1" />
                          )}
                          Order
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            Place Order
                          </DialogTitle>
                          <DialogDescription>
                            Complete your order for <strong>{item.mealName}</strong>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-sm text-muted-foreground">Order Total</p>
                            <p className="text-2xl font-bold text-orange-600">
                              ৳{(item.mealPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Delivery Address</label>
                            <Input
                              type="text"
                              placeholder="Enter your full address"
                              value={orderAddress}
                              onChange={(e) => setOrderAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleOrder}
                            className="bg-linear-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white w-full"
                            disabled={!orderAddress || loadingOrderId === item.id}
                          >
                            {loadingOrderId === item.id ? (
                              <>
                                <span className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Placing Order...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Confirm Order
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CartClient;