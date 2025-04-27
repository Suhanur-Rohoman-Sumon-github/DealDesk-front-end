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


export const getVerificationCode = async (userEmail:string) => {

  console.log(userEmail);
    
  try {
    const  {data}  = await axiosInstance.get(`users/verification-code/${userEmail}`,);
  

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
}};