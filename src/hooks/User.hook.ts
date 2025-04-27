/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDashBoardData, getVerificationCode } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

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