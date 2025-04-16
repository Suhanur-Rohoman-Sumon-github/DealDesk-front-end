"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/AxiosInostance";
import axios from "axios";

// Fetch all orders with query parameters (pagination, filters)
export const getAllOrders = async (
) => {
  try {
    // const { page, limit, status, sort, searchTerm } = queryParams;

    // const query = new URLSearchParams();

    // if (page) query.append("page", page.toString());
    // if (limit) query.append("limit", limit.toString());
    // if (status) query.append("status", status);
    // if (sort) query.append("sort", sort);
    // if (searchTerm) query.append("searchTerm", searchTerm);

    const { data } = await axiosInstance.get(`/orders`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fetch a single order by its ID
export const getMyOrder = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/orders/${userId}`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Create a new order
export const createOrder = async (orderData: {
  userId: string;
  products:  string ;
  totalAmount: number;
  paymentType: string; 
  transactionId: string; 
}) => {
  try {
    const { data } = await axiosInstance.post("/orders", orderData);
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

// Update an existing order (e.g., update status or shipping info)
export const updateOrder = async (
  orderId: string,
  updateData: {
    status?: string; // PENDING, COMPLETED, CANCELLED
    shippingAddress?: string;
    contactNumber?: string;
  }
) => {
  try {
    const { data } = await axiosInstance.patch(`/orders/${orderId}`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

// Delete an order by its ID
export const deleteOrder = async (orderId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/orders/${orderId}`);
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};