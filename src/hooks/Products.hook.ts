/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { FieldValues } from "react-hook-form";
import { addFavoriteProducts, createCategory, createProduct, getALlProducts, getCateGory, getFavoriteProducts, getRelatedProducts, getSIngleProducts, updateProductPrice } from "@/services/products";

export const useGetAllProductsQuery = (queryParams: {
  category?: string;
  categoryId?: string;
  rating?: number | "";
  sort?: string | "";
  searchTerm?: string | "";
}, ) => {
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-products", queryParams],
    queryFn: async () => {
      const data = await getALlProducts(queryParams);
     
      return data;

    },
  });

  return { data, refetch, isLoading, isError };
};

export const useGetSingleProductQuery = (productId: string) => {
 
    
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
export const useGetRelatedProductsQuery = (categoryName: string) => {
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-related-products", categoryName],
    queryFn: async () => {
      const data = await getRelatedProducts(categoryName);

      return data;
    },
    enabled: Boolean(categoryName),
  });

  return { data, refetch, isLoading, isError };
};
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

export const useAddFavoritePostsMutations = (
  postId: string,
  userId: string | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, string>({
    mutationKey: ["create favorite posts"],
    mutationFn: async () => {
      await addFavoriteProducts(postId, userId);
    },
    onSuccess: () => {
      toast.success("Favorite added successfully");
      queryClient.refetchQueries({
        queryKey: ["get my favorite posts", userId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllFavoriteProductQuery = (userId: string) => {
  const { data, refetch, isLoading } = useQuery<any, Error>({
    queryKey: ["get my favorite products", userId],
    queryFn: async () => {
      const data = await getFavoriteProducts(userId);

      return data?.data;
    },
    enabled: Boolean(userId),
  });

  return { data, refetch, isLoading };
};

export const useUpdateProductMutation = () => {
  return useMutation<any, Error, { productId: string; updateData: FieldValues }>({
    mutationKey: ["update-product"],
    mutationFn: async ({ productId, updateData }) => {
      await updateProductPrice(productId, updateData);
    },
    onSuccess: () => {
      toast.success("product updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "product update failed.");
    },
  });
};