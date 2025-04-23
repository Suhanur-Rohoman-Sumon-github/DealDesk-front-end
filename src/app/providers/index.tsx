"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/userProvider";
import GoogleAnaliticsProvider from "@/context/GoogleAnaliticsProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster richColors />
        <GoogleAnaliticsProvider>{children}</GoogleAnaliticsProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
