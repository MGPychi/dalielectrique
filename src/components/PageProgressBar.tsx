"use client";
import { ReactNode } from "react";
import { AppProgressBar as NextProgressBar } from "next-nprogress-bar";

export const PageProgressBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextProgressBar options={{ showSpinner: false }} color="blue" />
      {children}
    </>
  );
};
