/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDashBoardData } from "@/services/userServices";
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