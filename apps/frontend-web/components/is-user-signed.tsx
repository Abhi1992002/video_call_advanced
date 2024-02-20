"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

type IsUserSignedInProps = {};

export const IsUserSignedIn = ({}: IsUserSignedInProps) => {
  const { isSignedIn } = useUser();
  return (
    <div className="flex items-center">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      )}
    </div>
  );
};
