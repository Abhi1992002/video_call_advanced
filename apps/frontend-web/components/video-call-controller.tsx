import React, { useEffect, useState } from "react";
import { MicToggle } from "./mic-toggle";
import { CameraToggle } from "./camera-toggle";
import { LeaveCall } from "./leave-call";
import { ScreenShare } from "./screen-share";
import { ChooseMic } from "./choose-mic";
import { ChooseCamera } from "./choose-camera";
import { ChooseSpeaker } from "./choose-speaker";

type VideoCallControllerProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
};

export const VideoCallController = ({ videoRef }: VideoCallControllerProps) => {
  return (
    <div className="w-[100%] rounded-lg h-[100%] border bg-background/50 backdrop-blur-md">
      <div className="p-4 flex items-center justify-center gap-4">
        {/* <ChooseSpeaker />
        <ChooseMic /> */}
        <MicToggle />

        <CameraToggle videoRef={videoRef} />
        <ScreenShare videoRef={videoRef} />
        {/* <ChooseCamera /> */}
        <LeaveCall />
      </div>
    </div>
  );
};
