/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminDashBoardData, getDashBoardData, getMyChanel, getPendingUser, getVerificationCode, updateMyChanel } from "@/services/userServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useGetUserDashBoardDataQuery = (userId:string) => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-products", userId],
    queryFn: async () => {
      const data = await getDashBoardData(userId);
      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useGetAdminDashBoardDataQuery = () => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-dash-board-data"],
    queryFn: async () => {
      const data = await getAdminDashBoardData();
      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useGetUserVerificationCodeQuery = (userEmail:string) => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-verification-code", userEmail],
    queryFn: async () => {
      const data = await getVerificationCode(userEmail);
      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useGetPendingUserDataQuery = () => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["getPendingUser"],
    queryFn: async () => {
      const data = await getPendingUser();
      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useGetMychanelQuery = (email:string) => {
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-my-chanel", email],
    queryFn: async () => {
      const data = await getMyChanel(email);
      return data.data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useUpdateMyTeligramChanelMutations = () => {
  return useMutation<any, Error, { email: string; chanel: string }>({
    mutationKey: ["update-my-chanel"],
    mutationFn: async ({ email, chanel }) => {
      await updateMyChanel(email, chanel);
    },
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create order.");
    },
  });
};