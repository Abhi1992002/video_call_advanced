"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdScreenShare } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mediaStreamState } from "@/store/videoStream";
import { screentoggleState } from "@/store/toggle/screen-toggle";
import { cameraToggleState } from "@/store/toggle/camera-toggle";

type ScreenShareProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
};

export const ScreenShare = ({ videoRef }: ScreenShareProps) => {
  const [screenShareOn, setScreenShareOn] = useRecoilState(screentoggleState);
  const [cameraStateOn, setCameraStateOn] = useRecoilState(cameraToggleState);

  const [mediaStream, setMediaStream] = useRecoilState(mediaStreamState);
  const onScreenSharing = async () => {
    // sharing screen
    if (!screenShareOn) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setScreenShareOn(!screenShareOn);
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          setScreenShareOn(false);
        };
      });
      videoRef.current.srcObject = stream;

      setCameraStateOn(false);
      setMediaStream(stream);
    }
    if (screenShareOn) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      setScreenShareOn(false);

      setMediaStream(stream);
    }
  };
  return (
    <>
      <Button
        onClick={() => onScreenSharing()}
        variant={screenShareOn ? "default" : "secondary"}
      >
        <MdScreenShare className="h-6 w-4" />
      </Button>
    </>
  );
};
