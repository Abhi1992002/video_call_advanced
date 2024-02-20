"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <RecoilRoot>
        <ClerkProvider>{children}</ClerkProvider>
      </RecoilRoot>
    </>
  );
};
