"use client";
import React, { useEffect, useState } from "react";
import { FaPhoneSlash } from "react-icons/fa";

import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { mediaStreamState } from "@/store/videoStream";

type LeaveCallProps = {};

export const LeaveCall = ({}: LeaveCallProps) => {
  const mediaStream = useRecoilValue(mediaStreamState);

  const onLeaveCall = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    window.location.href = "/";
  };
  return (
    <>
      <Button variant={"secondary"} onClick={() => onLeaveCall()}>
        <FaPhoneSlash className="h-6 w-4 text-destructive" />
      </Button>
    </>
  );
};
