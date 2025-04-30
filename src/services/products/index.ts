"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/AxiosInostance";
import axios from "axios";


export const getALlProducts = async (queryParams: {
  
  category?: string;
 categoryId?:string
sort?: string | "";
  searchTerm?: string | "";
}) => {
  try {
    const { category, sort,searchTerm,categoryId } =
      queryParams;

    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (categoryId) query.append("categoryId", categoryId);
    if (sort) query.append("sort", sort);
    if (searchTerm) query.append("searchTerm", searchTerm);

    const { data } = await axiosInstance.get(`/products?${query?.toString()}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getSIngleProducts = async (productId:string) => {
  
  const { data } = await axiosInstance.get(`/products/${productId}`);
  return data.data; 
};
export const getRelatedProducts = async (categoryName:string) => {
  const { data } = await axiosInstance.get(`/products/related-products/${categoryName}`);
  return data.data; 
};
export const getCateGory = async () => {
 try {
   const { data } = await axiosInstance.get(`/category`);
  return data.data; 
 } catch (error) {
   if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message)}
 }
};
export const createCategory = async (categoryData:any) => {
  const { data } = await axiosInstance.post(`/category`,categoryData);
  return data.data; 
};
export const addReview = async (reviewData:any ,productId:string ) => {
  const { data } = await axiosInstance.post(`/products/add-review/${productId}`,reviewData);
  return data.data; 
};
export const deleteCategory = async (categoryId:any  ) => {
 try {
  const { data } = await axiosInstance.delete(`/products/categories/category/${categoryId}`);
  return data.data; 
 } catch (error) {
  if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message)}
 }
};
export const addRecentProduct = async (productId:string ,userId : string  ) => {
  
 try {
  const { data } = await axiosInstance.post(`/products/add-products/add-recent-product/${productId}/${userId}`);
  return data.data; 
 } catch (error) {
  if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message)}
 }
};
export const getRecentPRoduct = async (userId : string  ) => {
  
 try {
  const { data } = await axiosInstance.get(`/products/get-product/get-recent-product/${userId}`);
  return data.data; 
 } catch (error) {
  if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message)}
 }
};
export const getMyFollowingShopProducts = async (userId : string  ) => {
  
 try {
  const { data } = await axiosInstance.get(`/products/get-product/get-followed-shop-product/my-products/${userId}`);
  return data.data; 
 } catch (error) {
  if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message)}
 }
};


export const createProduct = async (productData: any) => {
  try {
    const { data } = await axiosInstance.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      const message = error.response?.data?.message || "Failed to create product (server error)";
      throw new Error(message);
    }

    // Catch any other unexpected error
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};

export const addFavoriteProducts = async (
  postId: string,
  userId: string | undefined,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/products/add-favorite/${postId}/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getFavoriteProducts = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/products/my-favorite/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


