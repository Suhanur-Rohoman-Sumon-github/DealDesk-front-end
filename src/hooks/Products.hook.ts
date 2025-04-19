/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { FieldValues } from "react-hook-form";
import { createCategory, createProduct, getAllProducts, getCateGory, getSIngleProducts } from "@/services/products";

export const useGetAllProductsQuery = () => {

  
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-products"],
    queryFn: async () => {
      const data = await getAllProducts();
    
      return data;

    },
  });

  return { data, refetch, isLoading, isError };
};


export const useGetSingleProductQuery = (productId: string) => {
  console.log("productId", productId);
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-single-products", productId],
    queryFn: async () => {
      const data = await getSIngleProducts(productId);

      return data;
    },
    enabled: Boolean(productId),
  });

  return { data, refetch, isLoading, isError };
};
// export const useGetRelatedProductsQuery = (categoryID: string) => {
    
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { data, refetch, isLoading, isError } = useQuery<any, Error>({
//        queryKey: ["get-related-products", categoryID],
//     queryFn: async () => {
//       const data = await getRelatedProducts(categoryID);

//       return data;
//     },
//     enabled: Boolean(categoryID),
//   });

//   return { data, refetch, isLoading, isError };
// };
export const useGetCategoryQuery = () => {
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-related-products"],
    queryFn: async () => {
      const data = await getCateGory();

      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
// export const useGetRecentProductsQuery = (userId:string) => {
    
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { data, refetch, isLoading, isError } = useQuery<any, Error>({
//        queryKey: ["get-recent-products"],
//     queryFn: async () => {
//       const data = await getRecentPRoduct(userId);

//       return data;
//     },
//   });

//   return { data, refetch, isLoading, isError };
// };
// export const useGetMyFollowingShopQuery = (userId:string) => {

    
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { data, refetch, isLoading, isError } = useQuery<any, Error>({
//        queryKey: ["get-my-following-shop"],
//     queryFn: async () => {
//       const data = await getMyFollowingShopProducts(userId);

//       return data;
//     },
//   });

//   return { data, refetch, isLoading, isError };
// };
export const useCreateProductMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create-product"],
    mutationFn: async (productData) => {
      await createProduct(productData); 
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product.");
    },
  });
};
export const useCreateCategoryMutations = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create-category"],
    mutationFn: async (categoryData) => {
      await createCategory(categoryData); 
    },
    onSuccess: () => {
      toast.success("Category  created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category.");
    },
  });
};
// export const useDeleteCategoryMutations = () => {
//   return useMutation<any, Error, string>({
//     mutationKey: ["delete-category"],
//     mutationFn: async (categoryId) => {
//       await deleteCategory(categoryId); 
//     },
//     onSuccess: () => {
//       toast.success("Category  deleted successfully!");
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to create category.");
//     },
//   });
// };
// export const useAddRecentProductMutations = (productId:string,userId:string) => {
//   return useMutation<any, Error>({
//     mutationKey: ["add-recent-products"],
//     mutationFn: async () => {
//       await addRecentProduct(productId,userId); 
//     },
//     onSuccess: () => {
    
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to create category.");
//     },
//   });
// };