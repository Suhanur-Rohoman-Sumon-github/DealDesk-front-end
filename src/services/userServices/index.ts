/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import axiosInstance from "@/lib/AxiosInostance";

export const getDashBoardData = async (userId:string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
