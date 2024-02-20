"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { useRecoilState, useRecoilValue } from "recoil";
import { mediaStreamState } from "@/store/videoStream";
import { audioToggleState } from "@/store/toggle/audio-toggle";

type MicToggleProps = {};

export const MicToggle = ({}: MicToggleProps) => {
  const [micOn, setMicOn] = useRecoilState(audioToggleState);
  const mediaStream = useRecoilValue(mediaStreamState);
  const onClickMic = () => {
    setMicOn(!micOn);
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = !micOn;
    });
  };
  return (
    <>
      <Button
        variant={micOn ? "default" : "secondary"}
        onClick={() => onClickMic()}
      >
        {micOn ? (
          <CiMicrophoneOn className="w-6 h-6" />
        ) : (
          <CiMicrophoneOff className="w-6 h-6" />
        )}
      </Button>
    </>
  );
};
