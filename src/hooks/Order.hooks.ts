/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { FieldValues } from "react-hook-form";
import { OrderData, ReviewData } from "@/types";
import { createOrder, getAllOrders, getMyOrder, updateOrder } from "@/services/orderServices";
import { addReview } from "@/services/products";


// Fetch all orders
export const useGetAllOrdersQuery = () => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    queryKey: ["get-orders"],
    queryFn: async () => {
      const data = await getAllOrders();
      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};

// Fetch a single order
export const useGetMyOrderQuery = (userId: string) => {
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    queryKey: ["get-my-order", userId],
    queryFn: async () => {
      const data = await getMyOrder(userId);
      return data;
    },
    enabled: Boolean(userId),
  });

  return { data, refetch, isLoading, isError };
};

// Create an order
export const useCreateOrderMutation = () => {
  return useMutation<any, Error, OrderData>({
    mutationKey: ["create-order"],
    mutationFn: async (orderData) => {
      await createOrder(orderData);
    },
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create order.");
    },
  });
};

// Update an order
export const useUpdateOrderMutation = () => {
  return useMutation<any, Error, { orderId: string; updateData: FieldValues }>({
    mutationKey: ["update-order"],
    mutationFn: async ({ orderId, updateData }) => {
      await updateOrder(orderId, updateData);
    },
    onSuccess: () => {
      toast.success("Order updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order.");
    },
  });
};
export const useAddReviewMutations = (productId: string) => {
  return useMutation<any, Error ,ReviewData >({
    mutationKey: ["add-review"],
    mutationFn: async (updateData) => {
      await addReview(updateData,productId,);
    },
    onSuccess: () => {
      toast.success("Order updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order.");
    },
  });
};