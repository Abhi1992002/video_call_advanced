"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import { mediaStreamState } from "@/store/videoStream";
import { cameraToggleState } from "@/store/toggle/camera-toggle";
import { screentoggleState } from "@/store/toggle/screen-toggle";

type CameraToggleProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
};

export const CameraToggle = ({ videoRef }: CameraToggleProps) => {
  const [cameraOn, setCameraOn] = useRecoilState(cameraToggleState);
  const [screenShareOn, setScreenShareOn] = useRecoilState(screentoggleState);
  const [mediaStream, setMediaStream] = useRecoilState(mediaStreamState);

  const onCameraClick = async () => {
    if (!cameraOn) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      setMediaStream(stream);
    }
    setCameraOn((camera) => !camera);

    setScreenShareOn(false);

    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = !cameraOn;
    });
  };
  return (
    <>
      <Button
        variant={cameraOn ? "default" : "secondary"}
        onClick={() => onCameraClick()}
      >
        {cameraOn ? (
          <FiCamera className="w-6 h-6 stroke-1" />
        ) : (
          <FiCameraOff className="w-6 h-6 stroke-1" />
        )}
      </Button>
    </>
  );
};
